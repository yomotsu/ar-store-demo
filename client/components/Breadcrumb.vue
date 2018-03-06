<template>
	<div class="Breadcrumb">
		<template v-for="( item, i ) in path">
			<template v-if="i !== 0">
				&gt;
			</template>
			<component
				:is="!! item.to ? 'router-link' : 'span'"
				:to="!! item.to ? item.to : null"
			>
				{{ item.name }}
			</component>
		</template>
	</div>
</template>

<script>

export default {
	name: 'Breadcrumb',
	props: {
		path: Array,
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
.Breadcrumb{
	font-size: 12px;
	padding: 0 5px;
	a, span{
		color: inherit;
		text-decoration: none;
		font-weight: bold;
		display: inline-block;
		padding: 8px 6px;
	}
}
</style>
