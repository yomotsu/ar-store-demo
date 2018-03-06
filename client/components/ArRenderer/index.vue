<template>
	<div
		class="ArRenderer"
		:style="{
			width: `${ width }px`,
			height: `${ height }px`
		}"
	>
		<!-- <div class="DEBUG">{{ debugLog }}</div> -->
		<div class="ArRenderer__Notice">
			<template v-if="isModel3dPlaced">
				Tap Screen to remove the model
			</template>
			<template v-else>
				Tap Screen to place the model
			</template>
		</div>
		<loading-spinner v-if="isLoading"></loading-spinner>
		<canvas class="ArRenderer__Canvas" ref="canvas" v-if="! isDisabled"></canvas>
		<div class="ArRenderer__Disabled" v-if="isDisabled">
			This augmented reality experience requires WebARonARCore or WebARonARKit, experimental browsers from Google for Android and iOS. Learn more at the <a href="https://developers.google.com/ar/develop/web/getting-started">Google Developers site</a>.
		</div>
	</div>
</template>

<script>
import THREE from '~/assets/libs/three-with-plugins.js';
import * as TWEEN from 'es6-tween';
import deepDispose from '~/assets/libs/deep-dispose.js';
import loadImage from '~/utils/load-image.js';
import LoadingSpinner from '~/components/LoadingSpinner/index.vue';

TWEEN.autoPlay( true );

const tempVec2  = new THREE.Vector2();
const tempVec3  = new THREE.Vector3();
const tempMat4  = new THREE.Matrix4();
const tempPos   = new THREE.Vector3();
const tempQuat  = new THREE.Quaternion();
const tempScale = new THREE.Vector3();

export default {
	name: 'ArRenderer',
	data () {
		return {
			debugLog: 0,
			width: 1,
			height: 1,
			isLoading: true,
			isDisabled: false,
			isModel3dPlaced: false,
			hitPosX: 0,
			hitPosY: 0,
			hitPosZ: 0,
			hitQuatX: 0,
			hitQuatY: 0,
			hitQuatZ: 0,
			hitQuatW: 1,
			surfaceNomalX: 0,
			surfaceNomalY: 1,
			surfaceNomalZ: 0,
		}
	},
	props: {
		src: String,
	},

	computed: {

		moveFactor() {

			return [
				this.hitPosX,
				this.hitPosY,
				this.hitPosZ,
				this.hitQuatX,
				this.hitQuatY,
				this.hitQuatZ,
				this.hitQuatW,
			];

		},

		isGround() {

			return this.surfaceNomalY > 0.8;

		},

	},

	watch: {
		moveFactor() {

			// モデルが設置されたら、動かさない（= モデルとの足元に固定される）
			if ( ! this.isModel3dPlaced ) {

				this.circleObject.position.set(
					this.hitPosX,
					this.hitPosY,
					this.hitPosZ,
				);
				this.circleObject.quaternion.set(
					this.hitQuatX,
					this.hitQuatY,
					this.hitQuatZ,
					this.hitQuatW,
				);

			}

			if ( this.isGround ) {

				this.circleObject.material.color.set( 0x00c3dc );

			} else {

				this.circleObject.material.color.set( 0xff1763 );

			}

		},

		isModel3dPlaced() {

			if ( this.isModel3dPlaced ) {

				this.toggleShow( true );
				// this.model3d.visible = true;

			} else {

				this.toggleShow( false );
				// this.model3d.visible = false;

			}

		},

	},

	methods: {

		loadEnvMap() {

			return new Promise( ( resolve ) => {

				loadImage( '/img/hdri.png' ).then( ( loadedImg ) => {

					this.envMap.image = loadedImg;
					this.envMap.format = THREE.RGBFormat;
					this.envMap.mapping = THREE.SphericalReflectionMapping;
					this.envMap.needsUpdate = true;
					resolve();

				} );

			} );

		},

		loadModel() {

			return new Promise( ( resolve ) => {

				const loader = new THREE.GLTFLoader();
				loader.load( this.src, ( gltf ) => {

					gltf.scene.children[ 0 ].traverse( ( child ) => {

						if ( child.isMesh ) child.material.envMap = this.envMap;

					} );

					this.model3d = gltf.scene.children[ 0 ];

					// ARの世界ではZ-up
					this.model3d.geometry.rotateX( THREE.Math.degToRad( 90 ) );
					// 初期では非表示。ユーザーによって配置されたら表示する
					this.model3d.visible = false;
					this.model3d.material.transparent = true;
					this.scene.add( this.model3d );
					resolve();

				} );

			} );

		},

		updateHitTest() {

			if ( ! this.circleObject || ! this.vrDisplay ) return;

			const hits = this.vrDisplay.hitTest( 0.5, 0.5 );

			if ( hits.length === 0 ) return;

			const hit = hits[ 0 ];

			tempMat4.fromArray( hit.modelMatrix );
			tempMat4.decompose( tempPos, tempQuat, tempScale );

			this.hitPosX = tempPos.x;
			this.hitPosY = tempPos.y;
			this.hitPosZ = tempPos.z;

			this.hitQuatX = tempQuat.x;
			this.hitQuatY = tempQuat.y;
			this.hitQuatZ = tempQuat.z;
			this.hitQuatW = tempQuat.w;

			// normal
			tempVec3.set( 0, 1, 0 );
			tempVec3.applyQuaternion( tempQuat );
			tempVec3.normalize();
			this.surfaceNomalX = tempVec3.x;
			this.surfaceNomalY = tempVec3.y;
			this.surfaceNomalZ = tempVec3.z;

		},

		toggleShow( show ) {

			this.circleObjectTween.stop();
			this.model3dTween.stop();

			if ( show ) this.model3d.visible = true;
			if ( ! show ) this.circleObject.visible = true;

			this.circleObjectTween = new TWEEN.Tween( { scale: this.circleObject.scale.x } )
				.to( { scale: show ? 0 : 1 }, 500 )
				.easing( show ? TWEEN.Easing.Back.In : TWEEN.Easing.Back.Out )
				.on( 'update', ( { scale } ) => {

					this.circleObject.scale.set( scale, 1, scale );

				} )
				.once( 'complete', () => {

					if ( show ) this.circleObject.visible = false;

				} )
				.start();

			this.model3dTween = new TWEEN.Tween( { opacity: this.model3d.material.opacity } )
				.to( { opacity: show ? 1 : 0 }, 500 )
				.easing( show ? TWEEN.Easing.Exponential.In : TWEEN.Easing.Exponential.Out )
				.on( 'update', ( { opacity } ) => {

					this.model3d.material.opacity = opacity;

				} )
				.once( 'complete', () => {

					if ( ! show ) {this.model3d.visible = false;alert(1)}

				} )
				.start();

		},

		updateObjects( delta ) {

			this.circleObject.material.map.rotation += delta * 50 * THREE.Math.DEG2RAD;

		},

		// getFromDirection( position ) {

		// 	const x = this.camera.position.x - position.x;
		// 	const z = this.camera.position.z - position.z;
		// 	tempVec2.set( x, z );
		// 	tempVec2.normalize();
		// 	return tempVec2.angle();

		// }

	},

	mounted() {

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.scene = new THREE.Scene();
		this.envMap = new THREE.Texture();
		this.clock = new THREE.Clock();

		this.circleObjectTween = new TWEEN.Tween();
		this.model3dTween      = new TWEEN.Tween();

		Promise.all( [
			THREE.ARUtils.getARDisplay(),
			this.loadEnvMap(),
			this.loadModel(),
		] ).then( ( [ vrDisplay ] ) => {

			this.isLoading = false;

			if ( ! vrDisplay ) {

				// THREE.ARUtils.displayUnsupportedMessage();
				this.isDisabled = true;
				return;

			}

			this.running = true;

			this.camera = new THREE.ARPerspectiveCamera(
				vrDisplay,
				60,
				this.width / this.height,
				vrDisplay.depthNear,
				vrDisplay.depthFar
			);

			this.renderer = new THREE.WebGLRenderer( {
				canvas: this.$refs.canvas,
				alpha: true,
				antialias: false,
				stencil: false,
			} );
			this.renderer.setSize( this.width, this.height );
			this.renderer.setPixelRatio( window.devicePixelRatio );
			this.renderer.setClearColor( 0xffffff, 1 );
			this.renderer.gammaInput  = true;
			this.renderer.gammaOutput = true;
			this.renderer.autoClear = false;

			this.vrDisplay = vrDisplay;
			this.vrControls = new THREE.VRControls( this.camera );
			this.arView = new THREE.ARView( vrDisplay, this.renderer );

			this.scene.add(
				new THREE.HemisphereLight( 0xffffff, 0x332222 ),
				new THREE.AmbientLight( 0x999999 )
			);

			const circleTexture = new THREE.TextureLoader().load( '/img/circle.png' );
			circleTexture.center.set( 0.5, 0.5 );
			this.circleObject = new THREE.Mesh(
				new THREE.PlaneBufferGeometry( 0.5, 0.5 ),
				// new THREE.MeshBasicMaterial( { color: 0xff0000 } )
				new THREE.MeshBasicMaterial( {
					map: circleTexture,
					transparent: true,
					opacity: 0.5,
					alphaTest: 0.3,
				} )
			);
			this.circleObject.geometry.rotateX( THREE.Math.degToRad( - 90 ) );
			this.circleObject.geometry.translate( 0, 0.1, 0 );
			this.scene.add( this.circleObject );

			this.update = update.bind( this );
			this.onWindowResize = onWindowResize.bind( this );
			this.placeTheModel = placeTheModel.bind( this );

			this.update();
			window.addEventListener( 'resize', this.onWindowResize );
			this.$refs.canvas.addEventListener( 'click', this.placeTheModel );

		} );

	},

	beforeDestroy() {

		this.running = false;

		if ( ! this.renderer ) return;

		while ( this.scene.children.length > 0 ) {

			const object = this.scene.children[ this.scene.children.length - 1 ];
			deepDispose( object );
			this.scene.remove( object );

		}

		this.renderer.dispose();
		this.renderer.forceContextLoss(); 
		this.renderer.context = undefined;
		this.renderer.domElement = undefined;
		// until next garbage collection
		this.$refs.canvas.width = 1;
		this.$refs.canvas.height = 1;

		this.$refs.canvas.removeEventListener( 'touchstart', this.placeTheModel );
		window.removeEventListener( 'resize', this.onWindowResize )

	},

	components: {
		LoadingSpinner,
	}
};

function update() {

	if ( ! this.running ) return;

	const delta = this.clock.getDelta();
	// const elapsed = this.clock.getElapsedTime();
	this.updateHitTest();
	this.updateObjects( delta );

	this.renderer.clearColor();
	this.arView.render();
	this.vrControls.update();
	this.renderer.clearDepth();
	this.renderer.render( this.scene, this.camera );

	this.vrDisplay.requestAnimationFrame( this.update );

};

function onWindowResize() {

	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.camera.aspect = this.width / this.height;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize( this.width, this.height );

};

function placeTheModel( event ) {

	event.preventDefault();

	if ( this.isModel3dPlaced ) {

		this.isModel3dPlaced = false;
		return;

	}

	// 水平面以外には設置しない
	if ( ! this.isGround ) return;

	this.isModel3dPlaced = true;

	this.model3d.position.set(
		this.hitPosX,
		this.hitPosY,
		this.hitPosZ,
	);
	this.model3d.quaternion.set(
		this.hitQuatX,
		this.hitQuatY,
		this.hitQuatZ,
		this.hitQuatW,
	);

};

</script>
<style scoped lang="scss">
.DEBUG{
	position: absolute;
	background: #FFF;
	z-index: 100;
}
.ArRenderer{
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}
	.ArRenderer__Notice{
		font-weight: bold;
		text-align: center;
		// -webkit-text-stroke: 2px rgba( #fff, 0.8 );
		text-shadow: 0 0 3px rgba( #fff, 0.8 );
		pointer-events: none;
		position: absolute;
		z-index: 1;
		top: 10px;
		left: 10px;
		right: 10px;
	}
	.ArRenderer__Canvas{
		display: block;
		position: absolute;
		top: 0;
		left: 0;
	}
	.ArRenderer__Disabled{
		font-size: 14px;
		margin: 20px;
		max-width: 500px;
	}
</style>
