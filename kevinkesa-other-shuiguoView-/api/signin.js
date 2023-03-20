const install = (vm) => {
	// 每月签到记录
	let signinLogs = (params = {}) => vm.$u.get('/user/sign/logs', params);
	
	// 签到统计
	let signinInfo = (params = {}) => vm.$u.get('/user/sign/info', params);
	
	// 签到排行榜
	let signinList = (params = {}) => vm.$u.get('/user/sign/list', params);
	
	// 提交签到
	let signinCreate = (params = {}) => vm.$u.post('/user/sign/create', params);

	return {
		signinLogs,
		signinInfo,
		signinList,
		signinCreate
	}
}

export default {
	install
}
