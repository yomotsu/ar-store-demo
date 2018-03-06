<template>
	<footer class="PageFooter">
		<div class="PageFooter__Links">
			<span class="PageFooter__LinkItem">
				About YOMOQLO
			</span>
			<span class="PageFooter__LinkItem">
				Do not contact us
			</span>
		</div>
		<div class="PageFooter__Copyright">
			YOMOQLO Some rights reserved
		</div>
	</footer>
</template>

<script>
export default {
	name: 'PageFooter'
};
</script>

<style scoped lang="scss">
@import "~assets/scss/common/_vars.scss";
@import "~assets/scss/common/_utils.scss";

.PageFooter{
	padding: 30px;
	border-top: 1px solid #b1b1b1;
	margin-top: 20px;
	background: #F4F4F4;
}
	.PageFooter__Links{
		@include logoFont();
		color: #999;
		display: flex;
		flex-wrap: wrap;
		text-transform: uppercase;
	}
		.PageFooter__LinkItem{
			width: 49.999%;
			text-align: center;
		}
	.PageFooter__Copyright{
		@include logoFont();
		color: #B1B1B1;
		font-size: 14px;
		text-align: center;
		margin-top: 30px;
	}
</style>
