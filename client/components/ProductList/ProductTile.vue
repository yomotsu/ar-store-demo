<template>
	<div
		class="ProductTile"
		:class="{
			'-soldOut': isSoldOut( product )
		}"
	>
		<component
			:is="isSoldOut( product ) ? 'div' : 'router-link'"
			:to="isSoldOut( product ) ? null : '/product/' + product.id"
			class="ProductTile__Inner"
		>
			<div class="ProductTile__Image">
				<img :src="product.imgSrc" alt="">
			</div>
			<div class="ProductTile__Name">
				{{ product.name }}
			</div>
			<div class="ProductTile__Price">
				{{ product.price }} JPY
			</div>
		</component>
	</div>
</template>

<script>
import { PRODUCT_STATE } from '../../constants.js';

export default {
	name: 'ProductList',
	props: {
		product: Object,
	},
	methods: {
		isSoldOut( product ) {

			return PRODUCT_STATE.SOLDOUT === product.state;

		}
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
.ProductTile{
	font-size: 14px;
	line-height: 1.4;
	a{
		color: inherit;
		text-decoration: none;
		display: block;
	}
}
	.ProductTile__Image{
		margin-bottom: 5px;
		img{
			display: block;
			width: 100%;
			height: auto;
		}
	}
	.ProductTile__Name{
		text-align: center;
	}
	.ProductTile__Price{
		font-size: 12px;
		text-align: center;
	}
	.-soldOut .ProductTile__Price{
		color: #c00;
		text-decoration: line-through;
	}
</style>
