import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store'
import tui from './common/httpRequest'
import h5Copy from '@/components/junyi-h5-copy/junyi-h5-copy.js'


// 全局挂载引入http相关请求拦截插件
import http from './libs/request'

// 路由封装
import route from './libs/function/route.js'
// post类型对象参数转为get类型url参数
import queryParams from './libs/function/queryParams.js'
// 对象深度拷贝
import deepMerge from './libs/function/deepMerge.js'
// toast提示，对uni.showToast的封装
import toast from './libs/function/toast.js'
// 对象和数组的深度克隆
import deepClone from './libs/function/deepClone.js';

// import "./common/mixin";

const $u = {
	route,
	queryParams,
	get: http.get,
	post: http.post,
	put: http.put,
	'delete': http.delete,
	http,
	deepMerge,
	deepClone,
	toast
}

// $u挂载到uni对象上
uni.$u = $u
Vue.prototype.$u = $u

Vue.prototype.tui = tui


Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView);

// Vue.prototype.host = 'http://723jedsp.qykj2020.cn'
// Vue.prototype.host = 'http://sc.jinerwangluo.xyz'
Vue.prototype.host = 'https://appapi.xiaozhuan.net.cn/'
Vue.prototype.hosts = 'https://appapi.xiaozhuan.net.cn/static/mini/' //图片前缀数据，如需可自行更改更改
Vue.prototype.$hosts = 'https://appapi.xiaozhuan.net.cn/static/mini/' //图片前缀数据，如需可自行更改更改
// Vue.prototype.pstt = 'https://appapi.xiaozhuan.net.cn/static/mini/' //图片前缀数据，如需可自行更改更改


// 调用复制 this.$copy
Vue.prototype.$copy=function(value){
	const result = h5Copy(String(value))
	if (result === false) {
	 uni.showToast({
	   title:'不支持',
		  icon:'none'
	 })
	} else {
	 uni.showToast({
	   title:'复制成功',
	   icon:'success'
	 })
	}
}

//全局定义组件
Vue.prototype.$tips = function(e){
	uni.showToast({
		icon:'none',
		title: e
	})
}


//算距离
Vue.prototype.$distance = function(e){
			var radLng1 = e[0].x * Math.PI / 180.0;
			var radLng2 = e[1].x * Math.PI / 180.0;
			var mdifference = radLng1 - radLng2;
			var difference = (e[0].y * Math.PI / 180.0) - (e[1].y * Math.PI / 180.0);
			var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(difference / 2), 2)
					+ Math.cos(radLng1) * Math.cos(radLng2) * Math.pow(Math.sin(mdifference / 2), 2)));
			distance = distance * 6378.137;
			distance = Math.abs(Math.round(distance * 10000) / 10);
			var yuanshi = distance
			if(distance<1000){
				distance = distance + 'm'
			}else{
				distance = parseInt(distance/100)/10 + 'km'
			}
			return {range:distance,to:yuanshi};

}


Vue.prototype.$back=function(){
	window.history.go(-1)
	// uni.navigateBack()
	
}

Vue.prototype.$gonext=function(e){
	console.log(e)
	if(e!='homepage_is_not' && e!='mine'){
		uni.navigateTo({
			url:e
		})
	}else{
		uni.switchTab({
			url: e
		})
	}
}
const app = new Vue({
	store,
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from './common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

let authorization = require("@/common/authorization.mixin.js");
Vue.mixin(authorization);



app.$mount()
