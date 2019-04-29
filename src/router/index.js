import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login/login'
import Register from '@/pages/register/register'
import Goods from '@/views/goods/goods'
import Seller from '@/views/seller/seller'
import Ratings from '@/views/ratings/ratings'
import Details from '@/components/details/details'
import main from '@/views/main'

Vue.use(Router)

export default new Router({
  routes: [
  	{//登陆页
			path: '/login',
			name: 'login',
			component: Login
		},{//注册页
			path: '/register',
			name: 'register',
			component: Register
		},{
			path: '/',
			//重定向
			redirect: '/login'
		},{
			path:'/main',
			name: 'main',
			component: main,
			redirect: '/main/goods',
			children:[
				{//商品
					path: 'goods',
					name: 'goods',
					component: Goods
				},{//评价
					path: 'ratings',
					name: 'ratings',
					component: Ratings
				},{//商家
					path: 'seller',
					name: 'seller',
					component: Seller
				}
			]
		},{
			path:'/details',
			name:'details',
			component: Details
		}
  ]
})
