<template>
	<header class="PageHeader">
		<div class="PageHeader__Logo">
			<a href="/">
				<img src="./logo.svg" alt="YomoQlo">
			</a>
		</div>
		<nav class="PageHeader__Nav">
			<span class="PageHeader__NavItem">
				WOMEN
			</span>
			<span class="PageHeader__NavItem">
				MEN
			</span>
			<span class="PageHeader__NavItem">
				KIDS
			</span>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'PageHeader'
};
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";

.PageHeader{
	padding: 6px 0;
	display: flex;
}
	.PageHeader__Logo{
		a{
			display: block;
			margin: auto;
		}
		img{
			display: block;
			width: 52px;
			height: auto;
			margin: auto;
		}
	}
	.PageHeader__Nav{
		@include logoFont;
		font-size: 16px;
		font-weight: bold;
		display: flex;
		align-items: center;
	}
		.PageHeader__NavItem{
			border-right: 1px solid #ccc;
			padding: 6px 14px;
		}
</style>
