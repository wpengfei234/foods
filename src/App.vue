<template>
  <div id='app'>
		<router-view/><!--渲染到页面-->
	</div>
</template>

<script>
	
	export default{
		name: 'App'
	}
</script>

<style lang='stylus' scoped>
	#app 
		width: 100%
		height: 100%
	
</style>
