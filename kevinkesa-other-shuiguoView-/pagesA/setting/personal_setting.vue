<template>
	<view class="bodys">
		<view class="top">
			<image class="top_img" :src="vuex_user.header" v-if="!img"></image>
			<image class="top_img" :src="img" v-else></image>
			<view class="click_to_replace" @click='upimg'>点击更换头像</view>
		</view>
		<view class="center">
			<view class="center_common">
				<view class="center_common_title">昵称</view>
				<view class="center_common_inputs" style="width: 510rpx;margin-right: 0;"><u-input v-model="nick_name" disabled :clearable="false" :type="type" :border="border" /></view>
			</view>
			<view class="center_common">
				<view class="center_common_title">用户ID</view>
				<view class="center_common_inputs"><u-input disabled v-model="id" :type="type" :border="border" /></view>
			</view>
			<view class="center_common">
				<view class="center_common_title">真实姓名</view>
				<view class="center_common_inputs"><u-input v-model="names" :clearable="false" :type="type" :border="border" placeholder="请输入姓名" /></view>
			</view>
			<view class="center_common">
				<view class="center_common_title">电话</view>
				<view class="center_common_inputs"><u-input v-model="mobile" :clearable="false" :type="type" :border="border" placeholder="请输入手机号" />
				<button class="getmobile" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">自动填写</button>
				</view>
			</view>
			<view class="center_common">
				<view class="center_common_title">性别</view>
				<view class="center_common_inputs">
					<u-radio-group v-model="radios" @change="radioGroupChange" active-color="#daa96f">
						<view style="width: 100%;display: flex;align-items: center;">
							<block v-for="(item,index) of list" :key="index" >
								<u-radio 
									@change="radioChange" 
									:checked="item.checked"
									:name="item.name"
									:value="item.value"
								>{{item.name}}
								</u-radio>
							</block>
							
						</view>
								
							</u-radio-group>
				</view>
			</view>
		</view>
		<view class="btn"  @click='change()'>保存</view>

		<view class="agqnd"></view>
	</view>
</template>
<script>
	import {$config} from '@/config.js'
	export default {
		data() {
			return {
				img: '',
				d: {},
				minute: 4,
				seconds: 60,
				work: '',
				path:'',
				server: $config.api.baseUrl + $config.api.url.upload,
				info:{},
				pstt:'',
				nick_name:'',
				id:'',
				list: [
								{
									name: '男',
									value: 1,
									checked: true
								},
								{
									name: '女',
									value: 0,
									checked: false
								}
							],
				radios:'',
				names:'',
				mobile:'',
				values:''
			}
		},
		onLoad() {
			this.names = this.vuex_user.true_name
			this.mobile = this.vuex_user.mobile
			this.pstt = this.hosts
			this.list.filter(item=>{
				if(item.name == this.vuex_user.sex_text){
					this.radios = this.vuex_user.sex_text
				}
				// console.log(item.name,this.vuex_user.sex_text,this.li)
			})
			this.huoqu()
			this.img = this.vuex_user.header
			this.nick_name = this.vuex_user.nick_name
			this.id = this.vuex_user.id
		},

		onShow() {
			this.work = uni.getStorageSync('work');
			if(uni.getStorageSync('minute')){
				this.minute = uni.getStorageSync('minute');
				this.seconds = uni.getStorageSync('seconds');
			}
		},
		methods: {
			getPhoneNumber(e) {
				
				console.log(e,'lliufdosjf中国人')
				this.$u.api.getPhoneNumber({
					code: e.detail.code,
					openid: this.vuex_user.mini_openid
				}).then(res => {
					this.$u.vuex('vuex_user', res.data);
					this.mobile = this.vuex_user.mobile
				})
			},
			radioChange(e){
				console.log(e,'nd')
				if(e==='男'){
					this.values = 1
					
				}else{
					this.values = 2
				}
			},
			radioGroupChange(e){
				console.log(e)
			},
			huoqu(){
				this.$u.api.parent().then(res=>{
					console.log(res)
					this.info = res.data
				}).catch(err=>{
					console.log(err)
				})
			},
			back(){
				uni.navigateBack({
					
				})
			},
			change() {
				this.$u.api.userInfoSave({
					nick_name:this.nick_name,
					header:this.path,
					true_name:this.names,
					mobile:this.mobile,
					sex:this.values
				}).then(res=>{
					console.log('kan',res)
					uni.showToast({
						icon:'none',
						title:'提交成功'
					})
					this.$u.vuex('vuex_user',res.data)
					uni.setStorageSync('nick_name',res.data.nick_name)
					setTimeout(()=>{
						uni.navigateBack({
							
						})
					},1500)
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						icon:'none',
						title:err.msg
					})
				})
			},
			logout() {
				// uni.setStorageSync('isLog','')
						this.$u.vuex('vuex_token','')
						this.$u.vuex('vuex_user','')
										uni.redirectTo({
											url: 'log_in'
										})
										// uni.setStorageSync('isLog','')
			},
			upimg() {
				console.log(this.server)
				uni.chooseImage({
					success: (chooseImageRes) => {
						uni.showLoading({
							title: '正在上传'
						});
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths)
						uni.uploadFile({
							url: this.server, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								uni.hideLoading()
								console.log(JSON.parse(uploadFileRes.data))
								this.img = JSON.parse(uploadFileRes.data).data.url
								this.path = JSON.parse(uploadFileRes.data).data.path
								
								
								this.change()
							}
						});
					}
				});
			},
		}
	}
</script>
<style lang="scss" scoped>
	.bodys{
		width: 100%;
		min-height: 100vh;
		background-color: #f6f6f6;
	}
	.top{
		width: 100%;
		background-color: #fff;
		height: auto;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.top_img{
			margin-top: 30rpx;
			width: 180rpx;
			height: 180rpx;
			border-radius: 50%;
		}
		.click_to_replace{
			margin-top: 30rpx;
			width: 260rpx;
			height: 80rpx;
			background-color: #daa96f;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
		}
	}
	.center{
		width: 100%;
		margin-top: 20rpx;
		background-color: #fff;
		.center_common{
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f6f6f6;
			padding: 0 20rpx 0 20rpx;
			.center_common_title{
				width: 200rpx;
			}
			.center_common_inputs{
				width: 350rpx;
				margin-right: 160rpx;
				display: flex;
				align-items: center;
				.getmobile{
					width: 120rpx;
					font-size: 22rpx;
					display: flex;
					height: 43rpx;
					justify-content: center;
					align-items: center;
					color: #fff;
					border-radius: 6rpx;
					background-color: #daa96f;
					position: absolute;
					right: 20rpx;
					padding: 0;
				}
			}
		}
	}
	.btn{
		width: 690rpx;
		height: 100rpx;
		background-color: #daa96f;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		margin: 40rpx auto;
	}
</style>
