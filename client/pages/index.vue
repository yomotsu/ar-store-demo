<template>
	<div>
		<page-header></page-header>
		<hero></hero>
		<template v-for="category in products">
			<product-list :products="category"></product-list>
		</template>
		<page-footer></page-footer>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PageHeader from '~/components/PageHeader/index.vue';
import PageFooter from '~/components/PageFooter/index.vue';
import Hero from '~/components/Hero/index.vue';
import ProductList from '~/components/ProductList/index.vue';

export default {
	name: 'Home',
  head () {
		return {
			title: 'Home',
		};
	},
	computed: Object.assign(
		mapState( [
			'products',
		] ),
		mapGetters( [] ),
		{},
	),
	components: {
		PageHeader,
		PageFooter,
		Hero,
		ProductList,
	}
}
</script>

<style scoped lang="scss">
// @import "~assets/scss/common/_vars.scss";
// @import "~assets/scss/common/_utils.scss";
// h1{
// 	font-style: normal;
// 	@include mediaMS(){
// 		font-size: 10px;
// 	}
// }
</style>
