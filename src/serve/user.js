const http = uni.$u.http

// 登录接口
export const postLogin = (params, config = {}) => http.post('/mini/index/getSessionKey', params, config)

// 获取用户信息
export const postUserProfile = (params, config = {}) => http.post('/mini/index/getUserProfile', params, config)