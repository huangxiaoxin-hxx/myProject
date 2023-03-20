<template>
	<view class="online_body">
		<view class="online_top">
			<image class="online_img" :src="info.wx_img" mode="widthFix"></image>
			<!-- <view class="online_name">xxxxxx</view> -->
		</view>
		<button open-type="contact" bindcontact="handleContact" session-from="sessionFrom" class="online_btn">在线客服</button>
		<view class="online_btn1" @click="makePhone()">
			<u-icon name="phone-fill" label="联系电话" label-size="32" label-color="#daa96f" color="#daa96f" size="40"></u-icon>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				info:''
			}
		},
		onLoad() {
			this.kefu()
		},
		onShow() {

		},
		methods: {
			kefu(){
				this.$u.api.kefus().then(res=>{
					console.log(res)
					this.info = res.data
				}).catch(err=>{
					console.log(err)
				})
			},
			makePhone(){
				uni.makePhoneCall({
					phoneNumber: this.info.mobile //仅为示例
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
.online_body{
	width: 100%;
	min-height: 100vh;
	background-color: #F8F8F8;
	// padding-top: 200rpx;
	.online_top{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.online_img{
			width: 100%;
			// height: 160rpx;
			// border-radius: 50%;
			background-color: #fff;
		}
		.online_name{
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #b4b4b4;
		}
		margin-bottom: 130rpx;
	}
	.online_btn,.online_btn1{
		width: 690rpx;
		height: 90rpx;
		border-radius: 90rpx;
		margin: 40rpx auto;
		font-size: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.online_btn{
		color: #fff;
		background-color: #daa96f;
	}
	.online_btn1{
	color: #daa96f;
		border: 1rpx solid #daa96f;
	}
}
</style>
