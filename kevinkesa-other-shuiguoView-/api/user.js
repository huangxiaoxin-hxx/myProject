const install = (vm) => {
	// 用户注册
	let userReg = (params = {}) => vm.$u.post('/user/no_auth/register', params);

	// 用户登录
	let userLogin = (params = {}) => vm.$u.post('/user/no_auth/login', params).then(res => {
		vm.$u.vuex('vuex_token', res.data);
		vm.$u.api.userInfo(); // 获取用户信息
	});

	// 用户续签
	let userTokenRefresh = (params = {}) => vm.$u.post('/user/no_auth/tokenRefresh', params).then(res => {
		vm.$u.vuex('vuex_token', res.data);
	});

	// 查询会员
	let userSearch = (params = {}) => vm.$u.post('/user/no_auth/get_user', params);

	// 找回密码
	let userForget = (params = {}) => vm.$u.post('/user/no_auth/forget', params);

	// 退出登录
	let userLogout = (params = {}) => vm.$u.post('/user/info/login_out', params).then(res => {
		vm.$u.vuex('vuex_user', null);
		vm.$u.vuex('vuex_token', null);
		vm.$u.route({
			url: '/pages/login/login/login',
			type: 'reLaunch'
		});
		return res;
	});

	// 用户信息
	let userInfo = (params = {}) => vm.$u.get('/user/info/index', params).then(res => {
		vm.$u.vuex('vuex_user', res.data);
		return res;
	});

	// 会员信息修改
	let userInfoSave = (params = {}) => vm.$u.post('/user/info/save', params).then(res => {
		vm.$u.api.userInfo(); // 获取用户信息
		return res;
	});

	// 修改登录密码
	let resetPassword = (params = {}) => vm.$u.post('/user/reset/password', params);

	// 修改支付密码
	let resetPayPassword = (params = {}) => vm.$u.post('/user/reset/pay_password', params);

	// 实名认证
	let certificationAuth = (params = {}) => vm.$u.post('/user/certification/auth', params);

	// 实名认证-信息
	let certificationInfo = (params = {}) => vm.$u.get('/user/certification/info', params);
	// 推广海报
	let userShareImg = (params = {}) => vm.$u.get('/user/info/shareImg', params);

	// 意见反馈-提交
	let feedbackSave = (params = {}) => vm.$u.post('/user/feedback/create', params);
	let feedbackList = (params = {}) => vm.$u.get('/user/feedback/list', params);
	let feedbackInfo = (params = {}) => vm.$u.get('/user/feedback/info', params);


	// 单独获取资产
	let asset = (params = {}) => vm.$u.get('/user/wallet/asset', params);
	// 资产流水列表
	let pointsLog = (params = {}) => vm.$u.get('/user/wallet/pointsLog', params);
	// 资产流水详情
	let pointsInfo = (params = {}) => vm.$u.get('/user/wallet/pointsInfo', params);
	// 资产统计
	let assetTotal = (params = {}) => vm.$u.get('/user/wallet/total', params);
	
	// 充值设置列表
	let rechargeConfig = (params = {}) => vm.$u.get('/user/recharge/config', params);
	// 充值设置详情
	let rechargeInfo = (params = {}) => vm.$u.get('/user/recharge/info', params);
	// 提交充值
	let rechargeCreate = (params = {}) => vm.$u.post('/user/recharge/create', params);
	// 充值订单列表
	let rechargeOrderList = (params = {}) => vm.$u.get('/user/recharge/orderList', params);
	// 充值订单详情
	let rechargeOrderInfo = (params = {}) => vm.$u.get('/user/recharge/orderInfo', params);

	
	// 提交提现
	let withdrawCreate = (params = {}) => vm.$u.post('/user/withdraw/create', params);
	// 提现列表
	let withdrawList = (params = {}) => vm.$u.get('/user/withdraw/list', params);
	// 提现详情
	let withdrawInfo = (params = {}) => vm.$u.get('/user/withdraw/info', params);
	
	// 提交转账
	let transferCreate = (params = {}) => vm.$u.post('/user/transfer/create', params);
	// 转账列表
	let transferList = (params = {}) => vm.$u.get('/user/transfer/list', params);
	// 转账详情
	let transferInfo = (params = {}) => vm.$u.get('/user/transfer/info', params);
	

	// 添加银行卡
	let bankCardCreate = (params = {}) => vm.$u.post('/user/bank_card/create', params);
	// 修改银行卡
	let bankCardUpdate = (params = {}) => vm.$u.post('/user/bank_card/update', params);
	// 删除银行卡
	let bankCardDelete = (params = {}) => vm.$u.post('/user/bank_card/delete', params);
	// 银行卡列表
	let bankCardList = (params = {}) => vm.$u.get('/user/bank_card/list', params);
	// 银行卡详情
	let bankCardInfo = (params = {}) => vm.$u.get('/user/bank_card/info', params);
	// 银行列表
	let bankList = (params = {}) => vm.$u.get('/user/bank_card/bankList', params);
	
	
	// 消息统计
	let messageTotal = (params = {}) => vm.$u.get('/user/message/total', params);
	let messageList = (params = {}) => vm.$u.get('/user/message/list', params);	
	
	// 推广统计
	let shareTotal = (params = {}) => vm.$u.get('/user/spread/total', params);
	let userSonList = (params = {}) => vm.$u.get('/user/spread/sonList', params);	
	let teamList = (params = {}) => vm.$u.get('/user/spread/teamList', params);	
	let assetLog = (params = {}) => vm.$u.get('/user/spread/assetLog', params);	
	let userWallet = (params = {}) => vm.$u.get('/user/spread/wallet', params);	
	
	
	return {
		userWallet,
		assetLog,
		userShareImg,
		teamList,
		shareTotal,
		userSonList,
		messageTotal,
		messageList,
		bankList,
		bankCardCreate,
		bankCardUpdate,
		bankCardDelete,
		bankCardList,
		bankCardInfo,
		withdrawCreate,
		withdrawList,
		withdrawInfo,
		transferCreate,
		transferList,
		transferInfo,
		pointsLog,
		pointsInfo,
		assetTotal,
		rechargeConfig,
		rechargeInfo,
		rechargeCreate,
		rechargeOrderList,
		rechargeOrderInfo,
		feedbackSave,
		feedbackList,
		feedbackInfo,
		asset,
		userReg,
		userLogin,
		userTokenRefresh,
		userSearch,
		userForget,
		userLogout,
		userInfo,
		userInfoSave,
		resetPassword,
		resetPayPassword,
		certificationAuth,
		certificationInfo
	}
}

export default {
	install
}
