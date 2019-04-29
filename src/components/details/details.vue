<template>
	<div class="details" v-if="data">
		<div class="details-list">
			<img :src="data.image"/>
			<div class="info">
				<food :foods='data' class='food'>
					
				</food>
				<p class="price"><span class="cart">加入购物车</span></p>
			</div>
			<div class="empty"  v-show="data.info"></div>
			<div class="text" v-show="data.info">
				<h1>商品介绍</h1>
				<span>{{data.info}}</span>
			</div>
			<div class="empty"></div>
			<div class="satisfy-box">
				<h1>商家评价</h1>
			</div>
			<!--<satis></satis>-->
			<!--<div class="ratingAll">
				<i class="icon-check_circle"></i>
				<span>只看有内容的评价</span>
			</div>
			<div class="rating-list">
				<ul>
					<li v-for="item,index of data.ratings" :key="index" class="rating-item">
						<div class="description">
							<p class="time">{{item.rateTime | formDate}}</p>
							<icon :class='{"icon-thumb_up":item.rateType===0,"icon-thumb_down":item.rateType===1}' :size="{width:12,height:12}" name=""/>
							<span class="message">{{item.text}}</span>
						</div>
						<div class="right">
							<p class="time">{{item.username}}</p>
							<img :src="item.avatar" class="img"/>
						</div>
					</li>
				</ul>
			</div>-->
		</div>
		<!--<shop-car/>-->
	</div>
</template>

<script>
//	import ShopCar from '@/components/shopcar/shopcar';
	import Satis from '@/components/satis/satis';
	export default {
		data(){
			return {
				data: [],
				selectType: 2
			}
		},
		created(){
	        this.data = JSON.parse(localStorage.getItem("details"));
	   	},
	   	components: {
//	   		ShopCar,
	   		Satis
	   	},
	   	methods:{
	   		
	   	},
	   	filters:{//过滤器
			//时间
			formDate(time,a){
				let data = new Date(time);
				let y = data.getFullYear();
				let m = data.getMonth() + 1;
				let d = data.getDate();
				let h = data.getHours();
				let mm = data.getMinutes();
				return `${y}-${m}-${d} ${h}:${mm}`;
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../../assets/stylus/variable.styl';
	.details
		width: 100vw
		height: 100vh
		overflow: auto
		.details-list
			img
				display: block
				width: 100%
				height: 325px
			.info
				display: flex
				padding: 18px
				align-items: flex-end
				.food
					flex: 1
				.price
					display: flex
					flex-direction: column
					justify-content: space-between
					width: 74px
					height: 24px
					.cart
						width: 74px
						height: 24px
						background: rgb(0,160,220)
						border-radius: 24px
						font-size: 10px
						color: #fff
						line-height: 24px
						text-align: center
			.empty
				height: 16px
				background: #f3f5f7
				border-bottom: 1px solid $line-color-light
			.text
				padding: 18px
				h1
					font-size: 14px
					color: $font-color
					line-height: 14px
					margin-bottom: 6px
				span
					margin: 0 8px
					font-size: 12px
					color: rgb(77,85,93)
					line-height: 24px
					font-weight: 200
			.satisfy-box
				display: flex
				flex-direction: column
				border-top: 1px solid #e6e7e8
				padding-top: 18px
				padding-left: 18px
				h1
					font-size: 14px
					color: $font-color
					line-height: 14px
			.ratingAll
				position: relative
				left: 18px
				bottom: 50px
				width: 85%
				line-height: 18px
				color: #93999f
				padding-top: 15px
				box-sizing: border-box
				span
					font-size: (22px/2)		
			.rating-list
				padding: 0 18px 18px
				border-top: 1px solid #e6e7e8
				ul
					.rating-item
						display: flex
						width: 100%
						border-bottom: 1px solid #e6e7e8
						padding: 18px 0
						.img
							width: 28px
							height: 28px
							margin-right: 10px
							background: #f00
							border-radius: 50%
							margin-right: 12px
						.description
							flex: 1
							position: relative
							height: 35px
							.name
								font-size: 10px
								color: $font-color
								line-height: 12px
							.icon
								color: #00a0dc
								line-height: 16px
								padding: 8px 8px 8px 0
								&.icon-thumb_down
									color: $bg-color-light
							.message
								width: 250%
								font-size: 12px
								line-height: 35px
								color: $font-color
						.right
							display: flex
							justify-content: space-between
							width: 100px
							img
								width: 18px
								height: 18px
								display: block
</style>