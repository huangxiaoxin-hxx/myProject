const install = (vm) => {

	//注册
	let register = (params = {}) => vm.$u.post('/user/no_auth/register', params);
	
	//登录
	let login = (params = {}) => vm.$u.post('/user/no_auth/login', params);
	
	//获取视频
	let video = (params = {}) => vm.$u.get('/suer/data/video', params);
	
	//添加视频
	let VideoAdd = (params = {}) => vm.$u.post('/suer/data/VideoAdd', params);
	
	//点赞/取消
	let like = (params = {}) => vm.$u.post('/suer/data/like', params);
	
	//转发
	let forward = (params = {}) => vm.$u.post('/suer/data/forward', params);
	
	//评论
	let comment = (params = {}) => vm.$u.post('/suer/data/comment', params);
	
	//评论列表
	let CommentList = (params = {}) => vm.$u.get('/suer/data/CommentList', params);
	
	//观看记录
	let watchLog = (params = {}) => vm.$u.post('/suer/data/watchLog', params);
	
	//余额转入仓库
	let toStore = (params = {}) => vm.$u.post('/suer/store/toStore', params);
	
	//仓库转入余额
	let outStore = (params = {}) => vm.$u.post('/suer/store/outStore', params);
	
	//仓库转给别人
	let outStoreToUser = (params = {}) => vm.$u.post('/suer/store/outStoreToUser', params);
	
	//首页数据
	let index = (params = {}) => vm.$u.get('/suer/data/index', params);
	
	//任务列表
	let frontList = (params = {}) => vm.$u.get('/suer/task/list', params);
	
	//任务列表
	let frontInfo = (params = {}) => vm.$u.get('/suer/task/info', params);
	
	//任务列表
	let buyTask = (params = {}) => vm.$u.post('/suer/task/buyTask', params);
	
	//任务列表
	let myTaskList = (params = {}) => vm.$u.get('/suer/task/myTaskList', params);
	
	//任务列表
	let myTaskInfo = (params = {}) => vm.$u.get('/suer/task/myTaskInfo', params);
	
	
	//任务统计
	let taskTotal = (params = {}) => vm.$u.get('/suer/task/taskTotal', params);

	//消费比例
	let ratio = (params = {}) => vm.$u.get('/suer/pay_points/ratio', params);
	
	//进行转换
	let exchange = (params = {}) => vm.$u.post('/suer/pay_points/exchange', params);
	
	//仓库信息
	let frontTotal = (params = {}) => vm.$u.get('/suer/store/total', params);
	
	
	//余额转别人
	let outUserMoneyToUser = (params = {}) => vm.$u.post('/suer/store/outUserMoneyToUser', params);
	
	//收藏/取消收藏
	let collect = (params = {}) => vm.$u.post('/suer/data/collect', params);
	
	//查询会员
	let searchUser = (params = {}) => vm.$u.post('/suer/index/searchUser', params);
	
	//公告协议详情
	let GGinfo = (params = {}) => vm.$u.get('/web/notice/info', params);
	
	
	//账户页面
	let accountPage = (params = {}) => vm.$u.get('/suer/index/accountPage', params);
	
		//视频+直播
	let videoPage = (params = {}) => vm.$u.get('/suer/index/videoPage', params);
	
	//奖励记录
	let rewardLog = (params = {}) => vm.$u.get('/suer/index/rewardLog', params);
	
	//关注/取消关注
	let follow = (params = {}) => vm.$u.post('/suer/data/follow', params);
	
	//修改登录密码
	let passwordByCode = (params = {}) => vm.$u.post('/user/reset/passwordByCode', params);
	
	//修改支付密码
	let payPasswordByCode = (params = {}) => vm.$u.post('/user/reset/payPasswordByCode', params);
	
	//获取验证码
	let sendCodeWith = (params = {}) => vm.$u.post('/user/send_code_with_token', params);
	
	//会员首页
	let usersIndex = (params = {}) => vm.$u.get('/suer/user/index', params);
	
	//粉丝列表
	let fansList = (params = {}) => vm.$u.get('/suer/user/fansList', params);
	
	//关注列表
	let followList = (params = {}) => vm.$u.get('/suer/user/followList', params);
	
	//收藏列表
	let collectList = (params = {}) => vm.$u.get('/suer/user/collectList', params);
	
	//靓号列表
	let listt = (params = {}) => vm.$u.get('/suer/beautiful_num/list', params);
	
	//靓号购买
	let buyNumber = (params = {}) => vm.$u.post('/suer/beautiful_num/buy', params);
	
	//签到
	let xuSign = (params = {}) => vm.$u.post('/suer/user/sign', params);
	
	//抽奖列表
	let luckList = (params = {}) => vm.$u.get('/suer/luck/list', params);
	
	//抽奖信息详情
	let luckInfo = (params = {}) => vm.$u.get('/suer/luck/info', params);
	
	//买进幸运号
	let luckBuy = (params = {}) => vm.$u.post('/suer/luck/buy', params);
	
	//买进幸运号
	let getLiveList = (params = {}) => vm.$u.get('/suer/index/getLiveList', params);
	
	//请求
	let checkVersion = (params = {}) => vm.$u.get('/web/version', params);
	
	//客服
	let kefus = (params = {}) => vm.$u.get('/user/kefu', params);
	
	
	//公告协议列表
	let noticeList = (params = {}) => vm.$u.get('/web/notice/list', params);
	
	//公告协议详情
	let noticeInfo = (params = {}) => vm.$u.get('/web/notice/info', params);

	//点赞列表
	let zanList = (params = {}) => vm.$u.get('/suer/user/zanList', params);
	
	//评论列表
	let commentList = (params = {}) => vm.$u.get('/suer/user/commentList', params);
	
	//删除评论
	let commentDel = (params = {}) => vm.$u.post('/suer/data/commentDel', params);
	
	//我的视频发布记录
	let myVideo = (params = {}) => vm.$u.get('/suer/user/myVideo', params);
	
	//删除记录
	let delVideo = (params = {}) => vm.$u.post('/suer/user/delVideo', params);
	
	//配置信息
	let getConfigByKey = (params = {}) => vm.$u.get('/user/getConfigByKey', params);
	
	//视频详情
	let videoInfo = (params = {}) => vm.$u.get('/suer/data/videoInfo', params);
	
	//流水列表
	let pointsLog = (params = {}) => vm.$u.get('/user/wallet/pointsLog', params);
	
	//流水列表
	let userLog = (params = {}) => vm.$u.get('/suer/user/log', params);
	
	//推荐人信息
	let parent = (params = {}) => vm.$u.get('/user/spread/parent', params);
	
	//店铺详情
	let shopInfo = (params = {}) => vm.$u.get('/shop/shop/info', params);
	
	
	
	return {
		shopInfo,
		parent,
		userLog,
		pointsLog,
		videoInfo,
		delVideo,
		myVideo,
		commentDel,
		commentList,
		zanList,
		noticeInfo,
		noticeList,
		kefus,
		checkVersion,
		getLiveList,
		luckBuy,
		luckInfo,
		luckList,
		xuSign,
		buyNumber,
		listt,
		collectList,
		followList,
		fansList,
		usersIndex,
		sendCodeWith,
		payPasswordByCode,
		passwordByCode,
		follow,
		rewardLog,
		videoPage,
		accountPage,
		GGinfo,
		searchUser,
		collect,
		outUserMoneyToUser,
		frontTotal,
		exchange,
		ratio,
		taskTotal,
		myTaskInfo,
		myTaskList,
		buyTask,
		frontInfo,
		frontList,
		index,
		outStoreToUser,
		outStore,
		toStore,
		watchLog,
		CommentList,
		comment,
		forward,
		like,
		VideoAdd,
		login,
		register,
		video
	}
}

export default {
	install
}
