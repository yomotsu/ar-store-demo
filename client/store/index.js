import Vue from 'vue';
import Vuex from 'vuex';
import {
	state,
	getters,
	actions,
	mutations
} from './root.js';

// import resources from './resources.js';
// import editor from './editor.js';
// import fabricFront from './fabric-front/module.js';
// import fabricBack from './fabric-back/module.js';

Vue.use( Vuex );

const store = () => new Vuex.Store( {
	state,
	getters,
	actions,
	mutations,
	// modules: {
	// 	resources,
	// 	editor,
	// 	fabricFront,
	// 	fabricBack,
	// },
} );

export default store;
