import Vue from 'vue';
// import axios from 'axios';
// import { find, cloneDeep } from 'lodash';
// import generateUUID from '../utils/generate-uuid.js';

export const state = {
	products: [
		{
			id: 'product1',
			name: 'Arrow Shacket - Indigo',
			price: 8000.00,
			state: 1,
			color: 'Navy blue',
			imgSrc: '/products/product1.jpg',
			sizes: [
				'xs', 's', 'm', 'l'
			],
		},
		{
			id: 'product2',
			name: 'Arrow Shacket - Indigo',
			price: 8000.00,
			state: 1,
			color: 'Navy blue',
			imgSrc: '/products/product2.jpg',
			sizes: [
				'xs', 's', 'm', 'l'
			],
		},
		{
			id: 'productx',
			name: 'Arrow Shacket - Indigo',
			price: 8000.00,
			state: 0,
			color: 'Navy blue',
			imgSrc: '/products/productx.jpg',
			object3d: '/products/productx.glb',
			sizes: [
				'xs', 's', 'm', 'l'
			],
		},
		{
			id: 'product3',
			name: 'Arrow Shacket - Indigo',
			price: 8000.00,
			state: 1,
			color: 'Navy blue',
			imgSrc: '/products/product3.jpg',
			sizes: [
				'xs', 's', 'm', 'l'
			],
		},
		{
			id: 'product4',
			name: 'Arrow Shacket - Indigo',
			price: 8000.00,
			state: 1,
			color: 'Navy blue',
			imgSrc: '/products/product4.jpg',
			sizes: [
				'xs', 's', 'm', 'l'
			],
		},
	],
};

export const getters = {
};

export const actions = {
};

export const mutations = {
}
