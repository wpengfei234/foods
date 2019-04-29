<template>
	<!--商品页-->
	<div class="goods">
		<div class="main">
			<div class="menu">
				<ul>
					<li v-for='item,index of goods' :key='item.name' class='goods-item' :class='{active:index === curIndex}' @click='goItem(index)'> 
						<span><icon v-if='item.type === 2' name='special' :size='{width:14,height:14}' class='icon'/>{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="right" ref='right'>
				<div>
					<div class="foodlist" v-for='item of goods' :key='item.name' ref='foodlist'>
						<div>
							<h3>{{item.name}}</h3>
							<ul>
								<li v-for='(foods,index) of item.foods' :key='index'>
									<img :src="foods.icon" @click='details(foods)'>
									<food :foods='foods'>
										<count slot='ctrl' :goods='foods' :selectFoods='selectFoods'/>
									</food>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--购物车-->
		<shop-car :selectFoods='selectFoods'/>
	</div>
</template>
<script>
	import ShopCar from '@/components/shopcar/shopcar.vue'
	import Bscroll from 'better-scroll';
	export default{
		name: 'goods',
		data(){
			return {
				goods: [],
//				curIndex: 0,
				rightScroll: {},
				scrollY: 0,
				heightArr: []
			}
		},
		components:{
			ShopCar
		},
		created(){
			this.$http.get('/apis/dataList').then(res => {
				this.goods= res.data.goods;
			})
		},
		mounted(){
			//防止网速慢获取不到子元素
			setTimeout(() => {
				this.init();
				this.calc();
			},500)
//			this.$nextTick(() => {
//				this.init()
//			})
		},
		computed:{
			curIndex(){
				let h = this.heightArr;
				for(let i = 0;i < h.length;i++){
					let height1 = h[i];
					let height2 = h[i + 1];
					if(this.scrollY >= height1 && this.scrollY < height2){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let arr = [];
				this.goods.forEach(item => {
					item.foods.forEach(items => {
						if(items.count){
							arr.push(items);
						}
					})
				})
				return arr;
			}
		},
		methods:{
			init(){
				this.rightScroll = new Bscroll(this.$refs.right,{
					click: true,//不影响点击事件
					probeType: 3//不仅在屏幕滑动的过程中，而且在 momentum滚动动画运行过程中实时派发 scroll事件
				});
				this.rightScroll.on('scroll',pos1 => {
					this.scrollY = Math.abs(Math.round(pos1.y));//滚动高
				})
			},
			calc(){//获取每个盒子距离父级的高度
				let height = 0;
				let foodList = this.$refs.foodlist;
				this.heightArr.push(height);//把第一个盒子到父级的高度添加到数组中
				for(let i = 0;i < foodList.length;i++){
					height += foodList[i].clientHeight;//计算每一个盒子到父级的总高度
					this.heightArr.push(height);//把每一个盒子到父级的高度添加到数组中
				}
			},
			goItem(index){
				let foodList = this.$refs.foodlist;
//				this.curIndex = index;
				let el = foodList[index];
				this.rightScroll.scrollToElement(el,300);
			},
			details(item){
				this.$router.push({
					path: '/details'
				})
				localStorage.setItem('details',JSON.stringify(item));
			}
		}
	}
</script>
<style lang='stylus'>
	@import '../../assets/stylus/variable.styl';
	.goods 
		.main
			display: flex
			.menu 
				width: 80px
				height: 480px
				.goods-item
					position: relative
					display: flex
					justify-content: center
					align-items: center
					height: 50px
					padding: 0 12px
					line-height: 14px
					box-sizing: border-box
					font-size: $font-size-small
					background: #f3f5f7
					&.active
						background: #fff
						&::after
							display: none
					&::after 
						content: ''
						position: absolute
						bottom: 0
						left: 12px
						width: 56px
						height: 1px
						background: $line-color-light
			.right 
				flex: 1
				height: 450px
				overflow: hidden
				.foodlist
					h3
						height: 26px
						color: $font-colorer
						line-height: 26px
						padding-left: $font-size-middle
						border-left: 2px solid #d9dde1
						background: #f3f5f7
					ul 
						padding: 0 18px
						box-sizing: border-box
						li
							display: flex
							position: relative
							border-bottom: 1px solid $line-color-light
							&:last-of-type
								border: 0
							img
								width: 57px
								height: 57px
								padding: 18px 10px 0 0
							.foods
								flex: 1
								position: relative
								padding: 0 18px
								box-sizing: border-box
							.count
								position: absolute
								right: 0
								bottom: $font-size-larger
								height: 24px
								
</style>						
	