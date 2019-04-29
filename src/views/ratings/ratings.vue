<template>
	<div class="ratings">
		<div class="ratings-top">
			<div class="ratings-left">
				<div class='rating'>
					<h3>3.9</h3>
					<h4>综合评分</h4>
					<p>高于周边商家69.2%</p>
				</div>
			</div>
			<div class="ratings-right">
				<div class="ratings-item">
					服务态度
					<star :score='3.9'/>
					<span>3.9</span>
				</div>
				<div class="ratings-item">
					服务态度
					<star :score='4'/>
					<span>4.0</span>
				</div>
				<div class="ratings-item">
					送达时间
					<span>44分钟</span>
				</div>
			</div>
		</div>
		<div class="rating-line"></div>
		<satis @send='send' :selectData='ratings'></satis>
		<div class="ratingAll">
			<i class="icon-check_circle" :class='{on:active}'  @click='addClass()'></i>
			<span>只看有内容的评价</span>
		</div>
		<div class="rating-list">
			<ul>
				<li v-for="item,index of ratings" :key="index" class="rating-item" v-show='selectType==item.rateType || selectType == 2'>
					<img :src="item.avatar" class="img"/>
					<div class="description">
						<p class="name">
							<span>{{item.username}}</span>
							<span class="time">{{item.rateTime | formDate}}</span>
						</p>
						<star :score="item.score"/>
						<span class="type" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
						<p class="message" v-show='item.text'>{{item.text}}</p>
						<div class="rec">
							<icon :class='{"icon-thumb_up":item.rateType===0,"icon-thumb_down":item.rateType===1}' :size="{width:12,height:12}" name=''/>
							<ul class="recommend">
								<li v-for="item,index in item.recommend" :key="index" v-show='item'>{{item}}</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Satis from '@/components/satis/satis';
	export default {
		name: 'ratings',
		data(){
			return {
				ratings: [],
				newRatings: [],
				selectType: 2,
				active: false
			}
		},
		components:{
			Satis
		},
		created(){
			this.$http.get('/apis/dataList').then(res => {
				this.ratings = res.data.ratings;
				this.newRatings = res.data.ratings;
			})
		},
		computed:{
			
		},
		methods:{
			send(data){
				this.selectType = data;
			},
			addClass(){
				if(this.active){
					this.ratings = this.newRatings;
					this.active = false;
				}else{
					let arr = [];
					this.ratings.forEach(item => {
						if(item.text !== ''){
							arr.push(item);
						}
					})
					this.ratings = arr;
					this.active = true;
				}
			}
		},
		filters:{//过滤器
			//时间
			formDate(time){
//				let data = new Date(time);
//				let y = data.getFullYear();
//				let m = data.getMonth() + 1;
//				let d = data.getDate();
//				let h = data.getHours();
//				let mm = data.getMinutes();
//				return `${a},${y}-${m}-${d} ${h}:${mm}`;
				//千位分隔符
				return time.toLocaleString()
			}
		}
	}
</script>
<style lang='stylus' scoped>
	@import '../../assets/stylus/variable.styl';
	.ratings
		height: 500px
		overflow: hidden
		.ratings-top
			display: flex
			padding: 18px 0
			.ratings-left
				width: 137px
				height: 75px
				text-align: center
				border-right: 1px solid #ccc
				box-sizing: border-box
				.rating
					h3
						font-size: 24px
						color: rgb(255,153,0)
						line-height: 28px
						padding-bottom: 6px
					h4
						font-size: $font-size-small
						color: $font-color
						line-height: $font-size-small
						padding-bottom: 8px
					p
						font-size: $font-size-smallest
						color: #c3c6c9
						line-height: $font-size-smallest
					
			.ratings-right
				flex: 1
				padding-left: 24px
				.ratings-item
					display: flex
					font-size: $font-size-small
					color: $font-color
					line-height: $font-size-larger
					margin-bottom: 8px
					.star
						.star-item
							margin: 0 3px
							&:first-child
								margin-left: 12px
							&:last-child
								margin-right: 12px
					span
						font-size: $font-size-small
						color: rgb(255,153,0)
						line-height: $font-size-larger
					&:last-of-type
							span
								margin-left: 12px
								color: $font-color-lightest
		.rating-line
			width: 100%
			height: 17px
			border-top: 2px solid #e6e7e8
			border-bottom: 2px solid #e6e7e8
			background: #f3f5f7
		.ratingAll
			position: relative
			left: 18px
			bottom: 50px
			width: 85%
			line-height: 18px
			color: #93999f
			padding-top: 15px
			box-sizing: border-box
			i
				&.on
					color: #0f0
			span
				font-size: (22px/2)	
				
		.rating-list
			padding: 18px
			height: 250px
			margin-top: -30px
			box-sizing: border-box
			overflow: auto
			ul
				.rating-item
					display: flex
					width: 100%
					border-bottom: 1px solid #e6e7e8
					padding: 18px 0
					box-sizing: border-box
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
						.name
							display: flex
							justify-content: space-between
							align-items: center
							font-size: 10px
							color: $font-color
							line-height: 12px
							.time
								font-size: 10px
								color: $font-color-lightest
								font-weight: 200
								margin-right: $font-size-larger
						.star
							width: 115px
							margin: 6px 0 6px -2px
							box-sizing: border-box
						.star-item
							margin: 4px 0 11px 4px
						.type
							position: absolute
							top: 20px
							left: 112px
							width: 85px
							font-size: 10px
							line-height: 12px
							color: $font-color-lightest
							font-weight: 400
						.message
							font-size: 12px
							line-height: 18px
							color: $font-color
							margin-right: $font-size-larger
						.rec
							display: flex
							.icon
								flex: 1
								color: #00a0dc
								line-height: 16px
								padding: 8px 8px 8px 0
								&.icon-thumb_down
									color: $bg-color-light
							.recommend
								display: flex
								flex-wrap: wrap
								width: 300px
								padding-top: 8px
								box-sizing: border-box
								li
									width: 75px
									height: 20px
									border: 1px solid $line-color-light
									font-size: 9px
									line-height: 16px
									color: $font-color-lightest
									text-align: center
									margin-left: 5px
									margin-top: 5px
				
			
								
								
								
								
</style>