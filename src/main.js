// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios


//全局使用mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);


//清除默认样式
import '@/assets/css/reset.styl'
//引入字体图标样式
import './assets/stylus/icon.css'

// 引入并注册全局组件
import maskMsg from './components/mask/mask.vue';
import Star from './components/star/star.vue';
import Icon from './components/icon/icon.vue';
import Count from './components/count/count.vue';
import Food from './components/foods/foods.vue';
import Loading from './components/loading/loading.vue';

//设置分类的全局组件
Vue.component('maskMsg',maskMsg);
//设置星星的全局组件
Vue.component('star',Star);
//设置图标的全局组件
Vue.component('icon',Icon);
//设置加减的全局组件
Vue.component('count',Count);
//设置商品的全局组件
Vue.component('food',Food);
//设置加载的全局组件
Vue.component('loading',Loading);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})