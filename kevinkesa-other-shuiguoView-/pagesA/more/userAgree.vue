<template>
	<view style="padding: 0 20rpx;">
		<rich-text :nodes="info.content"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				info:null
			}
		},
		onLoad({types}) {
			console.log(types,'type')
			this.getInfo()
			if(types=="2"){
				uni.setNavigationBarTitle({
					title:'个人信息保护政策'
				})
			}if(types=="1"){
				uni.setNavigationBarTitle({
					title:'用户服务协议'
				})
			}
		},
		methods:{
			getInfo(){
				this.$u.api.GGinfo({id:1}).then(res=>{
					console.log(res)
					this.info = res.data
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
</style>