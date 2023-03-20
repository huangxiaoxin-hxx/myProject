let baseUrl;
baseUrl = "https://appapi.xiaozhuan.net.cn/";
//baseUrl = "http://bendi.chaintp6.cn";


export const $config = {
	name: "App", // 项目名称
	api: {
		baseUrl, // 后端接口地址
		timeout: 10000, // 10秒超时
		url: {
			upload: "/user/upload"
		}
	}
};
