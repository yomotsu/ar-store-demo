<template>
	<div id="page">
		<product-list
			:products="products"
		></product-list>
		<hero></hero>
		<h1>Home Page</h1>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Hero from '../components/Hero.vue';
import ProductList from '../components/ProductList/index.vue';

export default {
	name: 'Home',
  head () {
		return {
			// title: this.$route.params.slug || 'all',
			title: 'Home',
			// titleTemplate: 'Nuxt TodoMVC : %s todos'
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
		Hero,
		ProductList,
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
h1{
	font-style: normal;
	@include mediaMS(){
		font-size: 10px;
	}
}
</style>
