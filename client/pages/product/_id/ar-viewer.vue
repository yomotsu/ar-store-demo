<template>
	<div>
		{{product}}
		<ar-renderer
			:src="product.object3d"
		>
		</ar-renderer>
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
		ArRenderer,
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
</style>
