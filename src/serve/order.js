const http = uni.$u.http

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getOrderList = (data) => http.get('/shop/order/list', data)

// post 创建订单 
export const createOrder = (params, config = {}) => http.post('/shop/buy/createOrder', params, config)
