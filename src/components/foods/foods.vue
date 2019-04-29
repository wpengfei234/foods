<template>
	<div class='foods'>
		<div class="foodsMsg">
			<p class='goodsTitle'>{{foods.name}}</p>
			<p class='name' v-if='foods.description'>{{foods.description}}</p>
			<p class='month'>
				<span class='monthCount'>月销{{foods.sellCount}}份</span><span class="good">好评率{{foods.rating}}%</span>
			</p>
			<p class='price'>
				<span class='newPrice'>￥{{foods.price}}</span><del v-if='foods.oldPrice' class='oldPrice'>￥{{foods.oldPrice}}</del>
			</p>
		</div>
		<slot name='ctrl'></slot>
	</div>
</template>
<script>
	export default{
		name: 'food',
		props: {
			foods: {
				type: Object,
				required: true
			}
		}
	}
</script>
<style lang='stylus' scoped>
	@import '../../assets/stylus/variable.styl';
	.foods
		.foodsMsg
			.goodsTitle
				font-size:	$font-size-middle
				color: $font-color
				line-height: $font-size-middle
				padding: 20px 0 8px
				box-sizing: border-box
			.name
				font-size: $font-size-smallest
				color: $font-colorer
				padding-bottom: 8px
			.month
				font-size: $font-size-smallest
				color: $font-colorer
				line-height: $font-size-smallest
				padding-bottom: 8px
				.monthCount
					padding-right: $font-size-small
			.price
				padding-bottom: 18px
				.newPrice
					font-size: $font-size-middle
					color: $font-color-dark
					font-weight: 700
					line-height: 24px
				.oldPrice
					font-size: $font-size-smallest
					color: $font-colorer
					font-weight: 700
					line-height: 24px
</style>