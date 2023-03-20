// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {
	// 查找api文件夹下的模块，执行批量注册
	const modulesFiles = require.context('../api', true, /.js$/)
	console.log('taoge',modulesFiles)
	const apis = modulesFiles.keys().reduce((apis, modulePath) => {
		const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1')
		const value = modulesFiles(modulePath)
		let methods = value.default.install(vm);
		apis = {
			...apis,
			...methods
		};
		return apis;
	}, {})
	vm.$u.api = apis;
}

export default {
	install
}
