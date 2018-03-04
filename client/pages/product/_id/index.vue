<template>
	<div>
		<breadcrumb
			:path="[
				{ to: '/', name: 'Home' },
				{ name: product.name },
			]"
		>
		</breadcrumb>
		<div class="Product__Main">
			<div class="Product__Image">
				{{ product.imgSrc }}
			</div>
			<div class="Product__Text">
				<div class="Product__Name">
					{{ product.name }}
				</div>
				<div class="Product__ViewInAR">
					<router-link to="ar-viewer/">
						View in AR
					</router-link>
				</div>
				<div class="Product__Price">
					{{ product.price }} JPY
				</div>
				<div class="Product__Color">
					COLOR: {{ product.color }}
				</div>
				<div class="Product__Sizes">
					Select Size
					<template v-for="size in product.sizes">
						<button type="button">
							{{ size }}
						</button>
					</template>
				</div>
				<div class="Product__AddCart">
					<button type="button">
						ADD
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { find, findIndex } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';
import Breadcrumb from '~/components/Breadcrumb.vue';

export default {
	name: 'Product',
  head () {
		return {

			title: this.product.name || 'all',
			// title: 'product',
			// titleTemplate: 'Nuxt TodoMVC : %s todos'
		};
	},
	validate ( { params, query, store } ) {

		return findIndex( store.state.products, { id: params.id } ) !== - 1;

	},
	computed: Object.assign(
		mapState( [
			'products',
		] ),
		mapGetters( [] ),
		{
			product() {

				return find( this.products, { id: this.$route.params.id } );

			},
		},
	),
	components: {
		Breadcrumb,
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
</style>
