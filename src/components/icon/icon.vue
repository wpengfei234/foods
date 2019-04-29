<template>
	<i class='icon' :class='iconClass' :style='parsedSize'></i>
</template>
<script>
	//图标组件
	export default{
		name: 'icon',
		//接受父组件传递过来的数据
		props: {
			//图标的名字
			name: {
				type: String,
				required:  true
			},
			//图标的尺寸
			size: {
				type: Object,
				required: true
			}
		},
		created(){
			this.parsedSize = {};
			for(let k in this.size){
				this.parsedSize[k] = parseFloat(this.size[k]) + 'px'
			}
		},
		computed:{
			iconClass(){
				return 'icon-' + this.name
			}
		}
	}
</script>
<style lang="stylus">
	@import '../../assets/stylus/base.styl';
	.icon
		display: inline-block
		vertical-align: top
		background-size: cover
		&.icon-brand
			bgImg('brand')
		&.icon-decrease
			bgImg('decrease_1')
		&.icon-bulletin
			bgImg('bulletin')
		&.icon-discount
			bgImg('discount_1')
		&.icon-guarantee
			bgImg('guarantee_1')
		&.icon-invoice
			bgImg('invoice_1')
		&.icon-special
			bgImg('special_1')
</style>