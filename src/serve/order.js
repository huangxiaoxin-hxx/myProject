const http = uni.$u.http

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getOrderList = (data) => http.get('/shop/order/list', data)

// post 创建订单 
export const createOrder = (params, config = {}) => http.post('/shop/buy/createOrder', params, config)

// 微信支付预请求订单
export const postPayOrder = (params, config = {}) => http.post('/mini/pay/createOrder', params, config)

// 商品订单详情 shop/order/info
export const getOrderDetail = (data) => http.get('/shop/order/info', data)

// 预约房间下单
export const createRoomOrder = (params, config = {}) => http.post('/shop/shop/yuyueRoom', params, config)

// 房间订单列表 shop/yuyue/orderList
export const getRoomOrder = (data) => http.get('/shop/yuyue/orderList', data)

// 取消预约订单 shop/yuyue/cancelOrder
export const refundRoomOrder= (params, config = {}) => http.post('/shop/yuyue/cancelOrder', params, config)

// 预约订单详情 shop/yuyue/orderInfo
export const getRoomOrderDetail = (data) => http.get('/shop/yuyue/orderInfo', data)
