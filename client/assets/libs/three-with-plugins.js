import * as THREE from 'three';
import {
	ARDebug,
	ARPerspectiveCamera,
	ARReticle,
	ARUtils,
	ARView,
	ARAnchorManager,
} from './three.ar.module.js';

// THREE.ARDebug             = ARDebug;
// THREE.ARPerspectiveCamera = ARPerspectiveCamera;
// THREE.ARReticle           = ARReticle;
// THREE.ARUtils             = ARUtils;
// THREE.ARView              = ARView;
// THREE.ARAnchorManager     = ARAnchorManager;

// THREE.OrbitControls = require( 'imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../node_modules\/three\/examples\/js\/controls\/OrbitControls' );

// const GLTFLoader = require( 'imports-loader?THREE=three!exports-loader?THREE.GLTFLoader!~~/node_modules\/three\/examples\/js\/loaders\/GLTFLoader.js' );

// THREE.CopyShader = require( 'imports-loader?THREE=three!exports-loader?THREE.CopyShader!../node_modules\/three\/examples\/js\/shaders\/CopyShader' );
// THREE.SMAAShader = require( 'imports-loader?THREE=three!exports-loader?THREE.SMAAShader!../node_modules\/three\/examples\/js\/shaders\/SMAAShader' );

// THREE.EffectComposer = require( 'imports-loader?THREE=three!exports-loader?THREE.EffectComposer!../node_modules\/three\/examples\/js\/postprocessing\/EffectComposer' );
// THREE.Pass           = require( 'imports-loader?THREE=three!exports-loader?THREE.Pass!../node_modules\/three\/examples\/js\/postprocessing\/EffectComposer' );
// THREE.ShaderPass     = require( 'imports-loader?THREE=three!exports-loader?THREE.ShaderPass!../node_modules\/three\/examples\/js\/postprocessing\/ShaderPass' );
// // TAAがSSAAに依存している
// THREE.SSAARenderPass = require( 'imports-loader?THREE=three!exports-loader?THREE.SSAARenderPass!../node_modules\/three\/examples\/js\/postprocessing\/SSAARenderPass' );
// THREE.TAARenderPass  = require( 'imports-loader?THREE=three!exports-loader?THREE.TAARenderPass!../node_modules\/three\/examples\/js\/postprocessing\/TAARenderPass' );
// THREE.GrowPass       = require( 'imports-loader?THREE=three!exports-loader?GrowPass!./postprocessing/GrowPass.js' );

export default {
	...THREE,
	VRControls: require( 'imports-loader?THREE=three!exports-loader?THREE.VRControls!~~/node_modules\/three\/examples\/js\/controls\/VRControls.js' ),
	GLTFLoader: require( 'imports-loader?THREE=three!exports-loader?THREE.GLTFLoader!~~/node_modules\/three\/examples\/js\/loaders\/GLTFLoader.js' ),
	ARDebug,
	ARPerspectiveCamera,
	ARReticle,
	ARUtils,
	ARView,
	ARAnchorManager,
};
