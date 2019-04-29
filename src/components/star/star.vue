<template>
	<div class="star" :class='iconClass'>
		<span v-for='(item,index) of starClasses'
       class="star-item"
       :class='item'
       :key='index'>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'star',
		props: {
			// 商家的得分
			score: {
				type: Number,
				required: true
			},
			// 星星的型号
			size: {
				type: [Number,String],
				default: 'medium'
			}
		},
		computed: {
			// 计算星星父级的class
			iconClass() {
				return 'star-' + this.size;
			},
			// 根据得分计算一个starClasses的数组  星星的组合规则
			starClasses() {
				let array = [];
				let integer = parseInt(this.score);//对分数进行取整
				for(let i = 1;i <= integer;i++){
					array.push('on');//给整数部分添加全亮
				}
				let decimal = this.score % 1;//用取完整数部分的小数和0.5比较
				if(decimal === 0.5){
					array.push('half');//小数部分等于.5添加半亮
				}else if(decimal > 0.5){
					array.push('on');//小数部分大于.5添加全亮
				}
				while(array.length < 5){
					array.push('off');//数组的长度小于5，剩下的都是暗的
				}
				return array;
			}	
		}
	}
</script>
<style lang="stylus">
	@import '../../assets/stylus/base.styl'
	.star
		display: flex
		justify-content: center
		align-items: center
		.star-item
			display: inline-block
			margin-right: 5px
			background-size: cover
		/* 小型 */
		&.star-24,&.star-small
			.star-item
			width: 12px
			height: 12px
			&.on
				bgImg('star24_on')
			&.off
				bgImg('star24_off')
			&.half
				bgImg('star24_half')
		/* 中型 */
		&.star-36,&.star-medium
			.star-item
				width: 18px
				height: 18px
				&.on
					bgImg('star36_on')
				&.off
					bgImg('star36_off')
				&.half
					bgImg('star36_half')
		/* 大型 */
		&.star-48,&.star-large
			.star-item
				width: 24px
				height: 24px
				&.on
					bgImg('star48_on')
				&.off
					bgImg('star48_off')
				&.half
					bgImg('star48_half')
</style>