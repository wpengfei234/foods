<template>
	<div>
		<div class="shop">
			<div class="big">
				<div class="small" :class="{active:totalCount}">
					<span class='icon-shopping_cart' @click='isvisible()' :class="{active:totalCount}">
						<i>{{totalCount}}</i>
					</span>
				</div>
			</div>
			<div class="price">
				<p>
					<span class='prices'><b>￥</b>{{totalPrice}}</span>
					<span class="line"></span>
					<span class="fee">另需配送费￥<b>4</b>元</span>
				</p>
			</div>
			<div class="delivery" :class="{'active':hasClass}">
				<strong v-show='start'>￥20元起送</strong>
				<strong v-show='!show' @click='total()'>{{txt}}</strong>
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="shopMsg">
				<div class="shoplist">
					<div class="title">
						<h1>购物车</h1>
						<span @click='clear()'>清空</span>
					</div>
					<ul class='carList'>
						<li v-for='items,index of selectFoods'>
							<h2 class='name'>{{items.name}}</h2>
							<div class='carshop'>
								<span class="carPrice">￥<b>{{items.price}}</b></span>
								<count slot='ctrl' :goods='items'></count>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import {Popup,MessageBox} from 'mint-ui';
	export default{
		props: {
			selectFoods:{
				type: Array
			}
		},
		data(){
			return{
				show: false,
				hasClass: false,
				start: true,
				popupVisible: false
			}
		},
		methods:{
			isvisible(){
				if(this.totalPrice > 0){
					this.popupVisible = !this.popupVisible;
				}
			},
			total(){
				if(this.hasClass){
					MessageBox.alert(`总价格:${this.totalPrice}`);
				}else{
					return	
				}
			},
			clear(){
				this.selectFoods.forEach(item => {
					this.$delete(item,'count',0)
				})
				this.hasClass = false;
				this.popupVisible = false;
			}
		},
		computed:{
			txt(){
				if(!this.totalPrice){
					this.start = true;
				}else{
					this.start = false;
					if(this.totalPrice > 0 && this.totalPrice <= 20){
						this.hasClass = false;
						return '还差' + (20 - this.totalPrice) + '元起送';
					}else if(this.totalPrice > 20){
						this.hasClass = true;
						return '去结算'
					}
				}
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach(item => {
					count += item.count;
				})
				return count;
			},
			totalPrice(){
				let price = 0;
				this.selectFoods.forEach(item => {
					price += item.price * item.count;
				})
				return price;
			}
		}
	}
</script>
<style lang='stylus'>
	@import '../../assets/stylus/variable.styl';
	.shop
		position: fixed
		left: 0
		bottom: 0
		width: 100%
		height: 45px
		background: #141d27
		z-index: 5000
		.big
			position: absolute
			left: $font-size-small
			top: -12px
			width: 58px
			height: 58px
			border-radius: 50%
			background: #141d27
			z-index: 4000
			.small
				display: flex
				position: absolute
				left: 50%
				top: 50%
				width: 44px
				height: 44px
				margin-left: -22px
				margin-top: -22px
				border-radius: 50%
				background: rgba(0,0,0,.2)
				z-index: 5000
				&.active
					background: #00a0dc
					z-index: 5000
				span
					font-size: 24px
					color: rgba(255,255,255,.4)
					line-height: 24px
					margin: auto
					&.active
						color: #fff
					i
						position: absolute
						bottom: 30px
						right: -4px
						padding: 0 6px
						width: 24px
						height: 16px
						font-size: 9px
						font-weight: 700
						font-style: normal
						text-align: center
						color: #fff
						line-height: 14px
						border-radius: 20px
						background: #f00
						box-sizing: border-box
		.price
			position: absolute
			top: 12px 
			left: 70px
			.prices
				font-size: $font-size-large
				color: $font-color-darkest
				b
					font-size: 400
			.line
				margin: 0 $font-size-small
				border-right: 1px solid $line-colorer
			.fee
				font-size: $font-size-large
				color: $font-color-darkest
				b
					font-weight: 400
		.delivery
			display: flex
			justify-content: center
			align-items: center
			position: absolute
			right: 0
			bottom: 0
			width: 105px
			height: 45px
			padding: 0 8px
			font-size: $font-size-small
			color: rgba(255,255,255,.4)
			font-weight: 700
			text-align: center
			background: #2b333b
			box-sizing: border-box
			&.active
				color: #fff
				background: #01b43c
	.mint-popup-bottom
		bottom: 45px
		.shopMsg
			.shoplist
				width: 100vw
				height: 50vh
				background: #fff
				.title
					display: flex
					justify-content: space-between
					align-items: center
					width: 100%
					height: 40px
					line-height: 40px
					padding: 0 18px
					background: #f3f5f7
					box-sizing: border-box
					h1
						font-size: $font-size-middle
						font-weight: 200
						color: $font-color
					span
						font-size: $font-size-small
						color: rgb(0,160,220)
				.carList
					width: 100vw
					height: 50vh
					padding: 12px 18px
					box-sizing: border-box
					overflow-y: auto
					li
						position: relative
						display: flex
						align-items: center
						height: 48px
						border-bottom: 1px solid $line-color-light
						.name
							flex: 1
							display: inline-block
							font-size: 14px
							color: rgb(7,17,27)
						.carshop
							display: flex
							align-items: center
							width: 69vw
							height: 28px
							.carPrice
								font-size: $font-size-smallest
								color: $font-color-dark
								line-height: 24px
								font-weight: normal
								margin-left: 160px
								margin-right: 12px
								b
									font-size: $font-size-middle
									color: $font-color-dark
									line-height: 24px	
									font-weight: 700

					
	
	
	
	
	
	
	
</style>