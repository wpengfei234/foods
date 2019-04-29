<template>
	<div class="count">
		<span class='icon-remove_circle_outline' v-show='goods.count' @click='less()'></span>
		<i v-show='goods.count'>{{goods.count}}</i>
		<span class='icon-add_circle' @click='add()'></span>
	</div>
</template>
<script>
	export default{
		name:'count',
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		methods:{
			add(){
				if(!this.goods.count){
					this.$set(this.goods,'count',1)
				}else{
					this.goods.count++;
				}
			},
			less(){
				this.goods.count--;
			}
		}
	}
</script>
<style lang='stylus'>
	@import '../../assets/stylus/variable.styl';
	.count
		display: flex
		align-items: center
		span
			color: #00a0dc
		i
			width: 24px
			font-size: $font-size-smallest
			font-style: normal
			color: $font-color-lightest
			line-height: 24px
			text-align: center
</style>