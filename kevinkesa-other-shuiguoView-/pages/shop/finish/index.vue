<template>
	<view>
		<view class="top_tu">
			<u-icon  size="80" color="#fff" name="checkbox-mark"></u-icon>
		</view>
		<view class="finish_text">支付完成</view>
		<view class="finish_btn" @click="go()">查看订单</view>
		
	</view>
</template>

<script>
	export default {
		methods:{
			go(){
				uni.redirectTo({
					url:'/pages/mall_order'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top_tu{
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
		margin: auto;
		margin-top: 100rpx;
		background-color: #5faabb;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.finish_text{
		width: 100%;
		font-size: 33rpx;
		font-weight: bold;
		margin: 20rpx auto;
		text-align: center;
	}
	.finish_btn{
		margin: 100rpx auto;
		border-radius: 15rpx;
		width: 320rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		color: #fff;
		font-weight: bold;
		background-color: #223642;
	}
</style>