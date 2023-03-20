import {
	$config
} from "../config.js";
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	
	Vue.prototype.$u.http.setConfig({
		baseUrl: $config.api.baseUrl,
		showLoading: false, // 是否显示请求中的loading
		loadingText: '努力加载中~',
		loadingTime: 800,
		dataType: 'json', // 设置为json，返回后会对数据进行一次JSON.parse()
		originalData: true, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			// 'Content-type': 'application/json;charset=UTF-8',
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// console.log(vm.$store.state.vuex_token,'看一下token')
		// 引用token
		config.header.Authorization =  vm.$store.state.vuex_token;

		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if (config.url.indexOf('/user/no_auth') >= 0) config.header.Authorization = '';
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// console.log(res.data.code)
		if (res.data.code == 200 || res.data.code == 201) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值

			var resCode = res.data.code
			if (resCode != 200) {
				/* if (resCode === 2001) {
					//token过期
					vm.$u.toast('TOKEN失效，请重新登录');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login/login'
						});
					}, 1000)

				} else if (resCode === 2002) {
					// token续签
					vm.$u.api.userTokenRefresh({
						user_id: vm.$store.state.vuex_user.id
					})
				}else if(resCode === 2020){					
					// 禁止登录
					vm.$u.toast('账户被禁止登录');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login/login'
						});
					}, 1000)
					
					
				} else {
					//其他错误，直接弹窗提示
					vm.$u.toast(res.data.msg);
				} */

				return false;
			} else {
				return res.data;
			}
		} else if (res.data.code == 2001) {
			console.log(res)
			// uni.setStorageSync('token','')
			// this.$u.vuex('vuex_token', '');
			// 假设201为token失效，这里跳转登录
			//vm.$u.toast('验证失败，请重新登录');
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				vm.$u.route('/pages/log_in')
			}, 1500)
			return false;
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			if (res.data.code == 422 || res.data.code == 500) {
				vm.$u.toast(res.data.message);
			}
			return false;
		}
	}
}

export default {
	install
}
