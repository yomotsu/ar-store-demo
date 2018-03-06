<template>
	<div class="LoadingSpinner"></div>
</template>

<script>
export default {
	name: 'LoadingSpinner'
};
</script>

<style scoped lang="scss">
@keyframes spinner {
	to {transform: rotate(360deg);}
}
$size: 24px;
.LoadingSpinner {
	position: absolute;
	top: 50%;
	left: 50%;
	width: $size;
	height: $size;
}
.LoadingSpinner:before {
	content: '';
	box-sizing: border-box;
	width: $size;
	height: $size;
	margin-top: $size * -0.5;
	margin-left: $size * -0.5;
	border-radius: 100px;
	border: 1px solid #f6f;
	border-top-color: #0e0;
	border-right-color: #0dd;
	border-bottom-color: #f90;
	animation: spinner .6s linear infinite;
}
</style>
