<template>
	<div class="ArViewer">
		<ar-renderer
			:src="product.object3d"
		>
		</ar-renderer>
		<div class="ArViewer__Back">
			<router-link :to="`/product/${ $route.params.id }/`">
				Back
			</router-link>
		</div>
	</div>
</template>

<script>
import { find, findIndex } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';
import ArRenderer from '~/components/ArRenderer/index.vue';

export default {
	name: 'ArViewer',
  head () {
		return {
			title: this.product.name || 'all',
		};
	},
	// validate ( { params, query, store } ) {

	// 	return findIndex( store.state.products, { id: params.id } ) !== - 1;

	// },
	computed: Object.assign(
		mapState( [
			'products',
		] ),
		mapGetters( [] ),
		{
			product() {

				let product;

				this.products.some( ( category ) => {

					const found = find( category.data, { id: this.$route.params.id } )

					if ( !! found ) {

						product = found;
						return true;

					}

				} );

				return product;

			},
		},
	),
	components: {
		ArRenderer,
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
.ArViewer{
	position: relative;
}
.ArViewer__Back{
	position: absolute;
	bottom: 20px;
	left: 0;
	right: 0;
	text-align: center;
	margin: auto;
	a{
		@include button();
	}
}

</style>
