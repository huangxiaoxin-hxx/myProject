const install = (vm) => {
	// 商品分类列表
	let cateList = (params = {}) => vm.$u.get('/shop/cate/list', params);
	// 分类详细
	let cateInfo = (params = {}) => vm.$u.get('/shop/cate/info', params);
	// 所有分类
	let cateAll = (params = {}) => vm.$u.get('/shop/cate/cateAll', params);
	

	// 商品列表
	let goodsList = (params = {}) => vm.$u.get('/shop/goods/list', params);
	
	// 商品评论统计
	let goodsCommentTotal = (params = {}) => vm.$u.get('/shop/goods_comment/total', params);
	
	// 商品评论列表
	let goodsCommentList = (params = {}) => vm.$u.get('/shop/goods_comment/list', params);

	// 商品评论详情
	let goodsCommentInfo = (params = {}) => vm.$u.get('/shop/goods_comment/info', params);

	// 商品详细
	let goodsInfo = (params = {}) => vm.$u.get('/shop/goods/info', params);

	// 获取商品sku组合详细
	let goodsSkuInfo = (params = {}) => vm.$u.get('/shop/goods/sukInfo', params);

	// 商品收藏
	let goodsCollect = (params = {}) => vm.$u.post('/shop/goods/collect', params);
	
	// 商品收藏列表
	let collectGoodsList = (params = {}) => vm.$u.get('/shop/goods/collectGoodsList', params);
	
	// 店铺收藏
	let shopcollect = (params = {}) => vm.$u.post('/shop/shop/collect', params);
	
	// 店铺收藏列表
	let collectShopList = (params = {}) => vm.$u.get('/shop/shop/collectShopList', params);
	
	
	
	// 商品搜索记录
	let goodsSearchLog = (params = {}) => vm.$u.get('/shop/search/searchLog', params);
	// 清除自己的搜索记录
	let goodsClearLog = (params = {}) => vm.$u.post('/shop/search/clearLog', params);

	// 个人店铺商品列表
	let userShopGoods = (params = {}) => vm.$u.get('/attractive/shop/shopGoods', params)

	// 个人店铺商品
	let userGoodInfo = (params = {}) => vm.$u.get('/attractive/shop/shopGoodsInfo', params)

	// 加入购物车
	let cartAdd = (params = {}) => vm.$u.post('/shop/cart/add', params);

	// 购物车列表
	let cartList = (params = {}) => vm.$u.get('/shop/cart/list', params);

	// 删除购物车
	let cartDel = (params = {}) => vm.$u.post('/shop/cart/del', params);

	// 编辑购物车
	let cartUpdate = (params = {}) => vm.$u.post('/shop/cart/update', params);

	// 购物车商品数量
	let getCarTotal = () => vm.$u.get('/shop/cart/cartGoodsTotal')

	// 个人购物车列表
	let userCartList = (params = {}) => vm.$u.get('/attractive/cart/list', params);

	// 个人购物车商品数量
	let userCarTotal = () => vm.$u.get('/attractive/cart/cartGoodsTotal')

	// 个人加入购物车
	let userAddCart = (params = {}) => vm.$u.post('/attractive/cart/add', params);

	// 个人删除购物车
	let userCartDel = (params = {}) => vm.$u.post('/attractive/cart/del', params);

	// 个人编辑购物车
	let userCartUpdate = (params = {}) => vm.$u.post('/attractive/cart/update', params);

	// 个人创建订单
	let userCreateOrder = (params = {}) => vm.$u.post('/attractive/buy/createOrder', params);
	
	// 个人获取支付订单
	let userPayInfo = (params = {}) => vm.$u.get('/attractive/buy/payInfo', params);
	
	// 个人支付订单
	let userPayOrder = (params = {}) => vm.$u.post('/attractive/buy/payOrder', params);
	
	// 个人订单列表
	let userOrderList = (params = {}) => vm.$u.get('/attractive/order/list', params);
	// 个人订单详情
	let userOrderInfo = (params = {}) => vm.$u.get('/attractive/order/info', params);

	// 个人商铺信息
	let userShopInfo = (params = {}) => vm.$u.get('attractive/shop/shopInfo', params)

	// 上传支付凭证 attractive/lovers/submitPay
	let submitPay = (params = {}) => vm.$u.post('attractive/lovers/submitPay', params)


	// 收货地址列表
	let addressList = (params = {}) => vm.$u.get('/shop/address/list', params);
	
	// 收货地址详情
	let addressInfo = (params = {}) => vm.$u.get('/shop/address/info', params);
	
	// 添加收货地址
	let addressAdd = (params = {}) => vm.$u.post('/shop/address/create', params);
	
	// 删除收货地址
	let addressDel = (params = {}) => vm.$u.post('/shop/address/delete', params);
	
	// 编辑收货地址
	let addressUpdate = (params = {}) => vm.$u.post('/shop/address/update', params);
	// 编辑收货地址
	let setDefault = (params = {}) => vm.$u.post('/shop/address/setDefault', params);
	
	// 获取结算产品
	let cartGoods = (params = {}) => vm.$u.get('/shop/buy/cartGoods', params);
	
	// 创建订单
	let createOrder = (params = {}) => vm.$u.post('/shop/buy/createOrder', params);
	
	// 获取支付订单
	let payInfo = (params = {}) => vm.$u.get('/shop/buy/payInfo', params);
	
	// 支付订单
	let payOrder = (params = {}) => vm.$u.post('/shop/buy/payOrder', params);
	
	// 订单列表
	let orderList = (params = {}) => vm.$u.get('/shop/order/list', params);
	//订单详情
	let orderInfo = (params = {}) => vm.$u.get('/shop/order/info', params);
	//申请退款
	let orderAfterSaleApply = (params = {}) => vm.$u.post('/shop/order/afterSaleApply', params); 
	//提交退货物流
	let orderAfterSaleSubmit = (params = {}) => vm.$u.post('/shop/order/afterSaleSubmit', params);
	//确定收货
	let orderconfirmReceipt = (params = {}) => vm.$u.post('/shop/order/confirmReceipt', params);
	
	// 取消订单
	let cancelOrder = (params = {}) => vm.$u.post('/shop/order/cancelOrder', params);

	// 提醒发货 shop/order/remindSend
	let remindSend = (params = {}) => vm.$u.post('/shop/order/remindSend', params);
	
	// 拼团商品列表
	let pintuanGoodsList = (params = {}) => vm.$u.get('/shop/pintuan/goodsList', params);
	// 拼团商品详情
	let pintuanGoodsInfo = (params = {}) => vm.$u.get('/shop/pintuan/goodsInfo', params);
	// 拼团商品里面的团列表
	let pintuanGoodsTuanList = (params = {}) => vm.$u.get('/shop/pintuan/goodsTuanList', params);	
	// 拼团商品购买
	let pintuanBuy = (params = {}) => vm.$u.post('/shop/pintuan/buy', params);
	
	// 店铺列表
	let shopList = (params = {}) => vm.$u.get('/shop/shop/list', params);
	
	// 选择地址
	let getCity = (params = {}) => vm.$u.get('/shop/shop/getCity', params);
	
	
	// xuanze
	let getOpenId = (params = {}) => vm.$u.post('/mini/index/getSessionKey', params);
	
	// mini/index/getUserProfile
	let getUserProfile = (params = {}) => vm.$u.post('/mini/index/getUserProfile', params)
	
	let getPhoneNumber = (params = {}) => vm.$u.post('/mini/index/getPhoneNumber', params)
	
	let getInfo = (params = {}) => vm.$u.get('/user/info/index', params)
	
	//微信支付订单请求
	let createOrders = (params = {}) => vm.$u.post('/mini/pay/createOrder', params)
	
	//vip列表
	let VIPlist = (params = {}) => vm.$u.get('/fruit/user_vip/list', params)
	
	//vip列表
	let VIPBuy = (params = {}) => vm.$u.post('/fruit/user_vip/buy', params)
	
	//vip订单列表
	let VIPorder = (params = {}) => vm.$u.get('/fruit/user_vip/orderList', params)
	
	//vip取消订单
	let orderCancel = (params = {}) => vm.$u.post('/fruit/user_vip/orderCancel', params)
	
	//vip取消订单
	let HeXiaoOrder = (params = {}) => vm.$u.post('/shop/HeXiaoOrder/hand', params)
	
	//注册商家
	let saveShop = (params = {}) => vm.$u.post('/shop/shop/saveShop', params)
	
	// 查询地址 /truck/map/searchAddress
	let searchAddress = (params = {}) => vm.$u.get('/shop/shop/getAreaAddress', params);
	
	// 通过keyword获取地点位置 truck/map/searchKeyword
	let getPositionByKeyword = (params = {}) => vm.$u.get('/truck/map/searchKeyword', params);
	
	// 通过keyword获取地点位置 truck/map/searchKeyword
	let getShopInfoByUid = (params = {}) => vm.$u.get('/shop/shop/getShopInfoByUid', params);
	
	//改变订单状态
	let changeOrderState = (params = {}) => vm.$u.post('/shop/order/changeOrderState', params);
	
	//改变订单状态
	let shopOrderLists = (params = {}) => vm.$u.get('/shop/order/shopOrderList', params);
	
	//统计列表
	let goodsTotals = (params = {}) => vm.$u.get('/shop/order/goodsTotal', params);
	
	//商店产品列表
	let shopGoodsList = (params = {}) => vm.$u.get('/shop/shop_goods/list', params);
	
	//改变状态
	let changeState = (params = {}) => vm.$u.post('/shop/shop_goods/changeState', params);
	
	//添加|修改产品
	let changeShopSave = (params = {}) => vm.$u.post('/shop/shop_goods/save', params);
	
	//规格
	let skuDataG = (params = {}) => vm.$u.get('/shop/shop_goods/skuData', params);
	
	//生成规格
	let createSku = (params = {}) => vm.$u.post('/shop/shop_goods/createSku', params);
	
	//修改规格
	let updateSku = (params = {}) => vm.$u.post('/shop/shop_goods/updateSku', params);
	
	//删除规格
	let deleteSku = (params = {}) => vm.$u.post('/shop/shop_goods/deleteSku', params);
	
	return {
		deleteSku,
		createSku,
		updateSku,
		skuDataG,
		changeShopSave,
		changeState,
		shopGoodsList,
		goodsTotals,
		shopOrderLists,
		changeOrderState,
		getShopInfoByUid,
		getPositionByKeyword,
		searchAddress,
		saveShop,
		HeXiaoOrder,
		orderCancel,
		VIPorder,
		VIPBuy,
		VIPlist,
		collectGoodsList,
		shopcollect,
		collectShopList,
		createOrders,
		getCity,
		getInfo,
		getPhoneNumber,
		getUserProfile,
		getOpenId,
		shopList,
		setDefault,
		pintuanGoodsList,
		pintuanGoodsInfo,
		pintuanGoodsTuanList,
		pintuanBuy,
		cateAll,
		goodsClearLog,
		goodsSearchLog,
		orderList,
		orderInfo,
		orderAfterSaleApply,
		orderAfterSaleSubmit,
		orderconfirmReceipt,
		cartGoods,
		createOrder,
		payInfo,
		payOrder,
		cateList,
		cateInfo,
		goodsList,
		goodsInfo,
		goodsSkuInfo,
		goodsCollect,
		cartAdd,
		cartList,
		cartDel,
		cartUpdate,
		goodsCommentList,
		goodsCommentTotal,
		goodsCommentInfo,
		addressAdd,
		addressList,
		addressDel,
		addressUpdate,
		addressInfo,
		getCarTotal,
		userShopGoods,
		userCartList,
		userCarTotal,
		userAddCart,
		userCartDel,
		userGoodInfo,
		userCartUpdate,
		userCreateOrder,
		userPayInfo,
		userPayOrder,
		userOrderList,
		userOrderInfo,
		userShopInfo,
		submitPay,
		cancelOrder,
		remindSend
	}
}

export default {
	install
}
