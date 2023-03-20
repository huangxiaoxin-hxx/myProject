const install = (vm) => {
	// 获取轮播数据
	let news_banner = (params = {}) => vm.$u.get('/web/news/banner', params);

	// 获取新闻列表
	let news_list = (params = {}) => vm.$u.get('/web/news/list', params);

	// 获取新闻详细
	let news_info = (params = {}) => vm.$u.get('/web/news/info', params);
	
	// 获取协议详情
	let agreement = (params = {}) => vm.$u.get('/web/agreement', params);

	// 新闻点赞
	let news_dianzan = (params = {}) => vm.$u.post('/web/news/dianzan', params);

	// 新闻收藏
	let news_collect = (params = {}) => vm.$u.post('/web/news/collect', params);

	// 新闻评论列表
	let news_comment_list = (params = {}) => vm.$u.get('/web/comment/list', params);

	// 获取评论信息
	let news_comment_info = (params = {}) => vm.$u.get('/web/comment/info', params);

	// 获取评论的子评论
	let news_infoAllComment = (params = {}) => vm.$u.get('/web/comment/infoAllComment', params);

	// 评论点赞
	let news_comment_dianzan = (params = {}) => vm.$u.post('/web/comment/dianzan', params);

	// 提交评论
	let news_comment_create = (params = {}) => vm.$u.post('/web/comment/create', params);

	return {
		news_banner,
		news_list,
		news_info,
		news_dianzan,
		news_collect,
		news_comment_list,
		news_comment_info,
		news_infoAllComment,
		news_comment_dianzan,
		news_comment_create,
		agreement,
	}
}

export default {
	install
}
