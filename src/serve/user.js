const http = uni.$u.http

// 登录接口
export const postLogin = (params, config = {}) => http.post('/mini/index/getSessionKey', params, config)

// 获取用户信息
export const postUserProfile = (params, config = {}) => http.post('/mini/index/getUserProfile', params, config)

// 无数据获取会员信息
export const getUserInfo = () => http.get('/user/info/index')

// 保存用户信息
export const saveUserInfo = (params, config = {}) => http.post('/user/info/save', params, config)

// 获取用户手机号
export const getUserPhone = (params, config = {}) => http.post('/mini/index/getPhoneNumber', params, config)