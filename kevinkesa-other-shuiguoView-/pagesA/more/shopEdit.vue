<template>
	<view class="bodys">
		<view class="top">
			<view class="xuyao" @click='upimg'>
				<image class="top_img"  :src="img" v-if="isShow"></image>
				<view v-else>
					<u-icon name="plus" color="#daa96f" size="80" ></u-icon>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="center_common">
				<view class="center_common_title">店铺名称</view>
				<view class="center_common_inputs"><u-input v-model="name" style="width: 430rpx;"  placeholder="请输入店铺名称" :clearable="false" :type="type" :border="border" /></view>
			</view>
			<view class="center_common">
				<view class="center_common_title">真实姓名</view>
				<view class="center_common_inputs">
					<u-input placeholder="请输入真实姓名" style="width: 430rpx;" v-model="true_name" :type="type" :border="border" /></view>
			</view>
			<view class="center_common">
				<view class="center_common_title">电话号码</view>
				<view class="center_common_inputs"><u-input v-model="mobile" :clearable="false" :type="type" :border="border" placeholder="请输入手机号" />
				<button class="getmobile" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">自动填写</button>
				</view>
			</view>
			<view class="center_common">
				<view class="center_common_title">所在地选择</view>
				<view class="center_common_inputs" @click.stop="$gonext('/pages/map/selectMap')">
					<u-input disabled v-model="address" style="width: 430rpx;" :clearable="false" :type="type" :border="border" placeholder="请选择省市县" />
					<u-icon name="arrow-right" color="#000" size="28"></u-icon>
					<view style="width: 480rpx;height: 100rpx;position: absolute;z-index: 100;"></view>
				</view>
			</view>
			<view class="center_common">
				<view class="center_common_title">详细地址</view>
				<view class="center_common_inputs"><u-input v-model="form.address" style="width: 430rpx;" :clearable="false" :type="type" :border="border" placeholder="请输入详细地址" /></view>
			</view>
			<view class="center_common">
				<view class="center_common_title">营业时间</view>
				<view class="center_common_inputs"><u-input v-model="business_time" style="width: 430rpx;" :clearable="false" :type="type" :border="border" placeholder="请输入营业时间" /></view>
			</view>
			<view class="center_common">
				<view class="center_common_title">管理员名称</view>
				<view class="center_common_inputs"><u-input v-model="admin_name" style="width: 430rpx;" :clearable="false" :type="type" :border="border" placeholder="管理员后台登录名称" /></view>
			</view>
			<view class="center_common">
				<view class="center_common_title">管理员密码</view>
				<view class="center_common_inputs">
					<u-input v-model="admin_pwd" :clearable="false" style="width: 430rpx;" :type="type" :border="border" placeholder="管理员后台登录密码(选填)" /></view>
			</view>

		</view>
		<view class="btn"  @click='change()'>保存设置</view>

		<view class="agqnd"></view>
	</view>
</template>
<script>
	import {$config} from '@/config.js'
	export default {
		data() {
			return {
				isShow:false,
				img:'',
				minute: 4,
				seconds: 60,
				work: '',
				path:'',
				server: $config.api.baseUrl + $config.api.url.upload,
				pstt:'',
				nick_name:'',
				id:'',
				radios:'',
				names:'',
				name:'' ,//店铺名
				true_name:'', //真实姓名
				mobile:'' ,//手机号
				address:'' ,//省市县位置
				business_time:'' ,//营业时间
				admin_name:'',//管理员名称
				admin_pwd:'' ,//管理员密码
				form:{
					province:'',
					city:'',
					district:'',
					lat:'',
					lng:'',
					address:''
					
				} //选择的地区参数
			}
		},
		onLoad() {
			// this.names = this.vuex_user.true_name
			// this.mobile = this.vuex_user.mobile
			this.pstt = this.hosts
			// this.nick_name = this.vuex_user.nick_name
			// this.id = this.vuex_user.id
			this.$u.api.getShopInfoByUid().then(res=>{
				if(res.data.shop.logo_str){
					this.isShow = true
					this.img = res.data.shop.logo_str
				}
				this.path = res.data.shop.logo
				this.mobile = res.data.shop.mobile
				this.name = res.data.shop.name
				this.true_name = res.data.shop.true_name
				this.address = res.data.shop.province+res.data.shop.city+res.data.shop.district
				this.form.province = res.data.shop.province
				this.form.city = res.data.shop.city
				this.form.district = res.data.shop.district
				this.form.address = res.data.shop.extend.address
				this.form.lat = res.data.shop.extend.lat
				this.form.lng = res.data.shop.extend.lng
				this.admin_name=res.data.shopAdmin.name
				this.business_time = res.data.shop.extend.business_time
				
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
		},

		onShow() {
			this.work = uni.getStorageSync('work');
			if(uni.getStorageSync('minute')){
				this.minute = uni.getStorageSync('minute');
				this.seconds = uni.getStorageSync('seconds');
			}
			if(uni.getStorageSync('address')){
				const ads = JSON.parse(uni.getStorageSync('address'))
				console.log(ads,'look')
				this.form.address = ads.city.street_number
				this.address = ads.city.province +ads.city.city + ads.city.district
				this.form.province = ads.city.province
				this.form.city = ads.city.city
				this.form.district = ads.city.district
				this.form.lat = ads.location.lat
				this.form.lng = ads.location.lng
				uni.setStorageSync('address','')
			}
		},
		methods: {
			getPhoneNumber(e) {
				this.$u.api.getPhoneNumber({
					code: e.detail.code,
					openid: this.vuex_user.mini_openid
				}).then(res => {
					this.$u.vuex('vuex_user', res.data);
					this.mobile = this.vuex_user.mobile
				})
			},
			change() {
				if(!this.img){
					uni.showToast({
						title:'请上传图片',
						icon:'none'
					})
					return
				}
				if(!this.name){
					uni.showToast({
						title:'请填写店铺名称',
						icon:'none'
					})
					return
				}
				if(!this.true_name){
					uni.showToast({
						title:'请填写真实姓名',
						icon:'none'
					})
					return
				}
				if(!this.mobile){
					uni.showToast({
						title:'请填写手机号',
						icon:'none'
					})
					return
				}
				if(!this.address){
					uni.showToast({
						title:'请选择地区',
						icon:'none'
					})
					return
				}
				if(!this.address){
					uni.showToast({
						title:'请填写详细地址',
						icon:'none'
					})
					return
				}
				if(!this.business_time){
					uni.showToast({
						title:'请填写营业时间',
						icon:'none'
					})
					return
				}
				if(!this.admin_name){
					uni.showToast({
						title:'请填写管理员名称',
						icon:'none'
					})
					return
				}
				this.$u.api.saveShop({
					state:1,
					name:this.name,
					true_name:this.true_name,
					mobile:this.mobile,
					logo:this.path,
					business_time:this.business_time,
					admin_name:this.admin_name,
					admin_pwd:this.admin_pwd,
					...this.form
				}).then(res=>{
					console.log(res)
					uni.navigateBack({})
				}).catch(err=>{
					uni.showToast({
						title:err.data.msg,
						icon:'none'
					})
					console.log(err)
				})
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
								this.isShow = true
								uni.hideLoading()
								console.log(JSON.parse(uploadFileRes.data))
								this.img = JSON.parse(uploadFileRes.data).data.url
								this.path = JSON.parse(uploadFileRes.data).data.path
								
								

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
		.xuyao{
			background-color: #f3f3f3;
			margin-top: 30rpx;
			width: 180rpx;
			height: 180rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			.top_img{
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
			}
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
				width: 480rpx;
				// margin-right: 160rpx;
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
