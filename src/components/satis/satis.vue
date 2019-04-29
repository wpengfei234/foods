<template>
	<div class="satis">
		<div class="all">
			<div class="satisfaction">
				<ul>
					<li @click='gotRat(2)' :class='{active:getClass == 2}'><span>全部</span><b>{{selectData.length}}</b></li>
					<li @click='gotRat(0)' :class='{active:getClass == 0}'><span>满意</span><b>{{satisfy.length}}</b></li>
					<li @click='gotRat(1)' :class='{active:getClass == 1}'><span>不满意</span><b>{{nosatisfy.length}}</b></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'satis',
		data(){
			return {
				getClass: ''
			}
		},
		props:{
			selectData:{
				type:Array
			}
		},
//		created(){
//			this.$http.get('/apis/dataList').then(res => {
//				this.data = res.data.ratings;
//			})
//		},
		computed:{
			//所有的评价
			//满意的评价
			satisfy(){
				return this.selectData.filter(item => {
					return item.rateType == 0
				})
			},
			//不满意的评价
			nosatisfy(){
				return this.selectData.filter(item => {
					return item.rateType == 1
				})
			}
		},
		methods:{
			gotRat(data){
				this.getClass = data;
				this.$emit('send',data)
			}
		}
	}
</script>
<style lang='stylus' scoped>
	.satis
		position: relative
		.all
			width: 100%
			height: (234px/2)
			padding: 18px 18px 14px
			border-bottom: 2px solid #e6e7e8
			box-sizing: border-box
			.satisfaction
				padding-bottom: 18px
				border-bottom: 1px solid #e6e7e8
				ul
					display: flex
					width: (500px/2)
					height: (64px/2)
					li
						flex: 1
						font-size: $font-size-small
						color: #fff
						text-align: center
						line-height: (64px/2)
						border-radius: 3px
						margin-right: 7px
						&:nth-of-type(1)
							background: #00a0dc
						&:nth-of-type(2)
							color: #4d555d
							background: #ccecf8
						&:nth-of-type(3)
							color: #4d555d
							background: #e9ebec
						&.active
							background: #f00
						span
							padding-right: 3px
							box-sizing: border-box
						b
							font-size: 6px
							font-weight: 400
			
</style>