<template>
	<canvas class="ArRenderer"></canvas>
</template>

<script>
import THREE from './three-with-plugins.js';
import deepDispose from './deep-dispose.js';
import loadImage from '~/utils/load-image.js';

export default {
	name: 'ArRenderer',
	data () {
		return {
			width: 1,
			height: 1,
		}
	},
	props: {
		src: String,
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

					this.scene.add( gltf.scene.children[ 0 ] );
					resolve();

				} );

			} );

		},

		tick() {

			if ( ! this.running ) return;

			requestAnimationFrame( () => this.tick() );

			const elapsed = this.clock.getElapsedTime();
			this.mesh.rotation.y = elapsed * 50 * THREE.Math.DEG2RAD;
			this.renderer.render( this.scene, this.camera );

		}
	},

	mounted() {

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		const width  = this.width;
		const height = this.height;

		this.running = true;

		this.clock  = new THREE.Clock();
		this.scene  = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 30, width / height, 0.001, 100 );
		this.camera.position.set( 0, 1, 2.5 );
		this.renderer = new THREE.WebGLRenderer( {
			canvas: this.$el,
			antialias: false,
			stencil: false
		} );
		this.renderer.setClearColor( 0xffffff, 1 );
		this.renderer.setSize( width, height );

		this.envMap = new THREE.Texture();

		this.scene.add(
			new THREE.HemisphereLight( 0xffffff, 0x332222 ),
			new THREE.AmbientLight( 0x999999 )
		);

		Promise.all( [
			this.loadEnvMap(),
			this.loadModel(),
		] ).then( () => {

			this.renderer.render( this.scene, this.camera );

		} );

	},

	beforeDestroy() {

		this.running = false;

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
		this.$el.width = 1;
		this.$el.height = 1;

	},
}
</script>
<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
.ArRenderer{
	display: block;
}
</style>
