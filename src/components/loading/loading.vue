<template>
	<div class="loading">
		<img src="./loading.gif" width='24' height="24" alt="loading">
		<span class=loading-text>加载中……</span>
	</div>
</template>
<script>
	export default{
		name: 'loading'
	}
</script>
<style lang='stylus'>
	.loading
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		.loading-text
			font-size: 12px
</style>