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
				<img :src="product.imgSrcThumb" alt="">
				<div class="ProductTile__State" v-if="isSoldOut( product )">
					Sold Out
				</div>
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
		position: relative;
		margin-bottom: 5px;
		background: #182c44;
		img{
			display: block;
			width: 100%;
			height: auto;
			.-soldOut &{
				opacity: 0.4;
			}
		}
	}
		.ProductTile__State{
			color: #c00;
			font-size: 14px;
			font-weight: bold;
			// -webkit-text-stroke: 1px #fff;
			line-height: 1.2;
			position: absolute;
			bottom: 3px;
			right: 5px;
			padding: 1px 2px;
			background: rgba( #fff, 0.8 );
		}
	.ProductTile__Name{
		text-align: center;
	}
	.ProductTile__Price{
		font-size: 12px;
		font-family: "Gidole", sans-serif;
		font-weight: bold;
		text-align: center;
	}
	.-soldOut .ProductTile__Price{
		color: #c00;
		text-decoration: line-through;
	}
</style>
