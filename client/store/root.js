import Vue from 'vue';
// import axios from 'axios';
// import { find, cloneDeep } from 'lodash';
// import generateUUID from '../utils/generate-uuid.js';

export const state = {
	products: [
		{
			categoryName: 'women',
			data: [
				{
					id: 'f-product1',
					name: 'Worn Sweater',
					price: 8000.00,
					state: 1,
					color: 'Navy blue',
					imgSrcThumb: '/products/f-product1_thumb.jpg',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
				{
					id: 'f-producty',
					name: 'Business Casual Vest',
					desc: 'PREMIUM QUALITY. More worn-in finish. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					price: 8000.00,
					state: 0,
					color: 'Off-White',
					imgSrcThumb: '/products/f-producty_thumb.jpg',
					imgSrcFull: '/products/f-producty.jpg',
					object3d: '/products/f-producty.glb',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
				{
					id: 'f-product2',
					name: 'Worn Cardigan',
					price: 8000.00,
					state: 1,
					color: 'Black',
					imgSrcThumb: '/products/f-product2_thumb.jpg',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
				{
					id: 'f-product3',
					name: 'Fur Short Coat',
					price: 8000.00,
					state: 1,
					color: 'Navy blue',
					imgSrcThumb: '/products/f-product3_thumb.jpg',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
			]
		},
		{
			categoryName: 'men',
			data: [
				{
					id: 'm-product1',
					name: 'Water-Resistant Jacket',
					price: 8000.00,
					state: 1,
					color: 'Navy blue',
					imgSrcThumb: '/products/m-product1_thumb.jpg',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
				{
					id: 'm-product2',
					name: 'Water-Resistant Jacket',
					price: 8000.00,
					state: 1,
					color: 'Black',
					imgSrcThumb: '/products/m-product2_thumb.jpg',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
				{
					id: 'm-productx',
					name: 'Full-Zip Stitch Sweater',
					desc: 'PREMIUM QUALITY. More worn-in finish. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					price: 8000.00,
					state: 0,
					color: 'Off-White',
					imgSrcThumb: '/products/m-productx_thumb.jpg',
					imgSrcFull: '/products/m-productx.jpg',
					object3d: '/products/m-productx.glb',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
				{
					id: 'm-product3',
					name: 'Cotton Crew',
					price: 8000.00,
					state: 1,
					color: 'Navy blue',
					imgSrcThumb: '/products/m-product3_thumb.jpg',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
				{
					id: 'm-product4',
					name: 'Water-Resistant Jacket',
					price: 8000.00,
					state: 1,
					color: 'Navy blue',
					imgSrcThumb: '/products/m-product4_thumb.jpg',
					sizes: [
						'XS', 'S', 'M', 'L'
					],
				},
			]
		},
	],
};

export const getters = {
};

export const actions = {
};

export const mutations = {
}
