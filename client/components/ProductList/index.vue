<template>
	<div class="ProductList">
		<div class="ProductList__CategoryName">
			{{ products.categoryName }}
		</div>
		<div class="ProductList__List">
			<template v-for="product in products.data">
				<div class="ProductList__Item">
					<product-tile :product="product"></product-tile>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import ProductTile from './ProductTile.vue';

export default {
	name: 'ProductList',
	props: {
		products: Object,
	},
	components: {
		ProductTile,
	},
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
.ProductList{
}
	.ProductList__CategoryName{
		@include logoFont;
		font-size: 32px;
		font-weight: bold;
		text-transform: uppercase;
		line-height: 1.2;
		margin: 0 10px;
		border-bottom: 1px solid #ccc;
	}
	.ProductList__List{
		display: flex;
		flex-wrap: wrap;
	}
		.ProductList__Item{
			width: calc( 33.333% - 20px );
			margin: 10px;
			@include mediaS{
				width: calc( 49.999% - 20px );
			}
		}
</style>
