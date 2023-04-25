const http = uni.$u.http

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getBusinessList = (data) => http.get('/shop/shop/list', data)

// 注册成为商家 shop/store/apply
export const postApplyBusiness= (params, config = {}) => http.post('/shop/store/apply', params, config)

// 申请成为商家资料 shop/store/applyInfo
export const getApplyInfo = (data) => http.get('/shop/store/applyInfo', data)