<template>
	<div class="seller">
		<div class="title">
			<div class="title-top">
				<div class="title-left">
					<h1>{{seller.name}}</h1>
					<p>
						<star :score='4.2'/>
						<span>(661)</span>
						<span class='month'>月售{{seller.sellCount}}单</span>
					</p>
				</div>
				<div class="title-right">
					<span class='icon-favorite'></span>
					<span class='txt'>已收藏</span>
				</div>
			</div>
			<div class="title-bottom">
				<ul>
					<li>
						<p>起送价</p>
						<b>20</b>
						<span>元</span>
					</li>
					<li>
						<p>商家配送</p>
						<b>4</b>
						<span>元</span>
					</li>
					<li>
						<p>平均配送时间</p>
						<b>39</b>
						<span>分钟</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="line"></div>
		<div class="announcement">
			<h1>公告与活动</h1>
			<p>{{seller.bulletin}}</p>
			<ul v-if="seller.description">
				<li v-for='item,index in seller.supports'>
					<icon :name='classMap[index]' :size='{width:16,height:16}'></icon>
					{{item.description}}
				</li>
			</ul>
		</div>
		<div class="line"></div>
		<div class="realScene">
			<h2>商家实景</h2>
			<div class="pic" ref='wrapper'>
				<ul ref='content'>
					<li v-for='item,index in seller.pics' :key='index'>
						<img :src="item"/>
					</li>
				</ul>
			</div>
		</div>
		<div class="line"></div>
		<div class="sellerMsg">
			<h2>商家信息</h2>
			<ul>
				<li v-for='item,index in seller.infos'>{{item}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Bscroll from 'better-scroll'
	export default{
		name: 'seller',
		data(){
			return {
				seller: {}
			}
		},
		created(){
			this.classMap = ['decrease','discount','discount','special','special'];
			this.$http.get('/apis/dataList').then(res => {
				this.seller = res.data.seller;
			})
		},
		mounted(){
			setTimeout(() => {
				this.init();
			},1000)
		},
		methods:{
			init(){
				let con = this.$refs.content;           
	            let items = con.children;
	           	let ncon = 0;
	            for(let i=0; i<items.length; i++){
	               ncon += items[i].offsetWidth;
	            };
	            con.style.width = ncon + 32 + 'px';
	            let bs = new Bscroll(this.$refs.wrapper,{
	                scrollX:true,
	                scrollY: false,
	                probeType: 3
	            })
	        }
		}
	}
</script>
<style lang='stylus' scoped>
	@import '../../assets/stylus/variable.styl';
	.seller
		height: 468px
		overflow: auto
		.title
			width: 100%
			height: 150px
			padding: 18px
			border-bottom: 2px solid $line-color-light
			box-sizing: border-box
			.title-top
				display: flex
				padding-bottom: 18px
				border-bottom: 1px solid $line-color-light
				box-sizing: border-box
				.title-left
					flex: 1
					h1
						font-size: $font-size-middle
						color: $font-color
						line-height: $font-size-middle
					p
						display: flex
						justify-content: flex-start
						align-items: center
						margin-top: 8px
						span
							font-size: $font-size-smallest
							color: $font-colorest
							line-height: $font-size-larger
				.title-right
					display: flex
					flex-direction: column
					align-items: center
					width: 40px
					height: 37px
					.icon-favorite
						font-size: 24px
						color: $font-color-dark
						line-height: 24px
						margin-bottom: 4px
					.txt
						font-size: $font-size-smallest
						color: $font-colorest
						line-height: $font-size-smallest
			.title-bottom
				ul
					display: flex
					width: 340px
					height: 56px
					padding-top: 18px
					box-sizing: border-box
					li
						flex: 1
						text-align: center
						border-right: 1px solid $line-color-light	
						&:nth-of-type(3)
							border: 0
						p
							font-size: $font-size-smallest
							color: $font-color-lightest
							line-height: $font-size-smallest
							margin-bottom: 4px
						b
							font-size: 24px
							font-weight: 400
							color: $font-color
							line-height: 24px	
						span
							font-size: $font-size-smallest
							color: $font-color
		.line
			width: 100%
			height: 16px
			background: #f3f5f7
			border-bottom: 2px solid $line-color-light				
		.announcement
			padding: 18px 18px 0
			box-sizing: border-box
			border-bottom: 2px solid $line-color-light	
			h1
				font-size: $font-size-middle			
			p
				font-size: $font-size-small
				font-weight: 200
				color: $font-color-dark
				line-height: 24px			
				padding: 8px 12px 16px
				box-sizing: border-box		
			ul
				li
					display: flex
					justify-content: flex-start
					align-items: center
					height: 48px
					border-top: 1px solid $line-color-light
					margin-left: $font-size-small	
					.icon
						margin-right: 6px				
		.realScene
			width: 100vw
			height: 170px
			padding: 18px 0 18px 18px
			border-bottom: 2px solid $line-color-light
			box-sizing: border-box
			h2
				font-size: $font-size-middle
				margin-bottom: $font-size-small
			.pic
				overflow: hidden
				ul
					display: flex
					justify-content: space-between
					align-items: center
					li
						flex: 1
						height: 120px
						margin-right: 10px
						box-sizing: border-box
						img
							display: block
							width: 120px
							height: 90px
		.sellerMsg
			padding: 17px 18px 0
			box-sizing: border-box
			h2
				font-size: $font-size-middle
				margin-bottom: $font-size-small
			ul
				li
					padding: 16px 12px
					font-size: $font-size-small
					font-weight: 200
					color: $font-color
					line-height: $font-size-large
					border-top: 1px solid $line-color-light
					box-sizing: border-box				
</style>