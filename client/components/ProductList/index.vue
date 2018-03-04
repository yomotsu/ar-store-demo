<template>
	<div class="ProductList">
		<template v-for="product in products">
			<div class="ProductList__Item">
				<product-tile :product="product"></product-tile>
			</div>
		</template>
	</div>
</template>

<script>
import ProductTile from './ProductTile.vue';

export default {
	name: 'ProductList',
	props: {
		products: Array,
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
