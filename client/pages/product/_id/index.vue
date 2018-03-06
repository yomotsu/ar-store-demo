<template>
	<div>
		<page-header></page-header>
		<breadcrumb
			:path="[
				{ to: '/', name: 'Home' },
				{ name: product.name },
			]"
		>
		</breadcrumb>
		<div class="Product__Main">
			<div class="Product__Name">
				{{ product.name }}
			</div>
			<div class="Product__Image">
				<img :src="product.imgSrcFull" alt="">
			</div>
			<div class="Product__Text">
				<div class="Product__ViewInAR">
					<router-link :to="'/product/' + $route.params.id + '/ar-viewer/'">
						View in AR
					</router-link>
				</div>
				<div class="Product__Desc">
					{{ product.desc }}
				</div>
				<div class="Product__Price">
					{{ product.price }}
					<span class="Product__PriceUnit">JPY</span>
				</div>
				<div class="Product__Option">
					<div class="Product__OptionLabel">
						Color:
					</div>
					{{ product.color }}
				</div>
				<div class="Product__Option">
					<div class="Product__OptionLabel">
						Size:
					</div>
					<div class="Product__SizeList">
						<template v-for="size in product.sizes">
							<button type="button" class="Product__SizeListItem">
								{{ size }}
							</button>
						</template>
					</div>
				</div>
				<div class="Product__Option">
					<div class="Product__OptionLabel">
						Quantity :
					</div>
					<div class="Product__QuantitySelect">
						<select>
							<template v-for="i in 5">
								<option>{{ i }}</option>
							</template>
						</select>
					</div>
				</div>

				<div class="Product__AddCart">
					<button type="button">
						ADD TO BAG
					</button>
				</div>
			</div>
		</div>
		<page-footer></page-footer>
	</div>
</template>

<script>
import { find, findIndex } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';
import PageHeader from '~/components/PageHeader/index.vue';
import PageFooter from '~/components/PageFooter/index.vue';
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
		PageHeader,
		PageFooter,
		Breadcrumb,
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";

.Product__Name{
	font-size: 16px;
	font-weight: bold;
	padding: 12px 10px 10px;
	border-top: 1px solid #ddd;
}
.Product__Image{
	img{
		display: block;
		width: 100%;
		height: auto;
	}
}
.Product__Text{
	padding: 10px;
}
	.Product__ViewInAR{
		margin: 10px 0;
		a{
			@include button();
			@include logoFont;
			font-size: 20px;
		}
	}
	.Product__Desc{
		font-size: 14px;
		margin: 15px 0 20px;
	}
	.Product__Price{
		font-size: 20px;
		font-weight: bold;
		font-family: "Gidole", sans-serif;
		margin-bottom: 5px;
	}
		.Product__PriceUnit{
			font-family: sans-serif;
			font-size: 14px;
		}
	.Product__Option{
		font-size: 14px;
		margin: 14px 0;
	}
		.Product__OptionLabel{
			font-weight: bold;
			display: inline-block;
			padding-right: 5px;
		}
		.Product__SizeList{}
			.Product__SizeListItem{
				box-sizing: border-box;
				line-height: 40px;
				width: 40px;
				height: 40px;
				padding: 0;
				border: 1px solid #ccc;
				margin: 3px 6px 3px 0;
				background: transparent;
			}
		.Product__SizeList{
			text-align: right;
		}
			.Product__SizeListItem{
				box-sizing: border-box;
				line-height: 40px;
				width: 40px;
				height: 40px;
				padding: 0;
				border: 1px solid #ccc;
				margin: 3px 0 3px 6px;
				background: transparent;
			}
		.Product__QuantitySelect{
			text-align: right;
			select {
				color: #000;
				font-size: 16px;
				padding: 12px;
				width: 100px;
				border: none;
				border-bottom: 1px solid #000;
				outline: 0;
				border-radius: 0;
				background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50px' height='50px'><polyline points='46.139,15.518 25.166,36.49 4.193,15.519'/></svg>");
				background-color: transparent;
				background-repeat: no-repeat;
				background-position: right 10px top 15px;
				background-size: 16px 16px;
				-webkit-appearance: none;
				transition:0.3s ease all;
			}
		}
	.Product__AddCart{
		margin-top: 20px;
		button{
			@include logoFont;
			color: #fff;
			font-size: 18px;
			text-align: center;
			box-sizing: border-box;
			display: block;
			width: 100%;
			padding: 14px 10px;
			border: none;
			background: #FC0D1B;
		}
	}

</style>
