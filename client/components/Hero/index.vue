<template>
	<div class="Hero"></div>
</template>

<script>

export default {
	name: 'hero',
}
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";
.Hero{
	width: 100%;
	padding-top: 50%;
	background: url( "./img_01.jpg" ) 50% 50% / cover;
	// background: linear-gradient( 135deg, #c3c3c3, #fff );
}
</style>
