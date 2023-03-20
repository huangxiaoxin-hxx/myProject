const install = (vm) => {
	// 发送验证码
	let sendMobile = (params = {}) => vm.$u.post('/user/send_code', params);
	
	//上传图片
	let upload = (params = {}) => vm.$u.post('/user/upload', params);
	
	
	
	// 通过keyword获取地点位置 truck/map/searchKeyword
	let getImgPosition = (params = {}) => vm.$u.get('/truck/position/getImgPosition', params);
	
	// 通过keyword获取地点位置 truck/map/searchKeyword
	let getTextPosition = (params = {}) => vm.$u.get('/truck/position/getTextPosition', params);
	
	// 通过keyword获取地点位置 truck/map/searchKeyword
	let getInfo = (params = {}) => vm.$u.get('/truck/shareSet/getInfo', params);
	

	return {
		getInfo,
		getTextPosition,
		getImgPosition,
		sendMobile,
		upload
		
	}
}

export default {
	install
}
