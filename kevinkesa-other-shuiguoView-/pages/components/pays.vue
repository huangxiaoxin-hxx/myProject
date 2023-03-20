<template>
	<view>
		<view class="rectangle_2858rwf">
			<view class="top_text">请支付1.5元实名认证费用</view>
			<view class="wuhil">
				<view class="add_address">支付方式</view>
				<view class="online_payment">在线支付</view>
			</view>
			<view class="rectangle_2823tv"></view>
			<view class="mwlok" @click="tab(1)">
				<view class="rdezn">
					<image :src="hosts+'resource_tcpxs1627003676292.png'" class="uzqoln"></image>
					<view class="alipay">支付宝</view>
				</view>
				<image v-if="nav==1" :src="hosts+'select_yes.png'" class="moeqjh"></image>
				<image v-else :src="hosts+'select_no.png'" class="moeqjh"></image>
			</view>
			<view class="sydiu" @click="tab(0)">
				<view class="rdezn">
					<image :src="hosts+'wechatPayment.png'" class="uzqoln"></image>
					<view class="alipay">微信</view>
				</view>
				<image v-if="nav==0" :src="hosts+'select_yes.png'" class="moeqjh"></image>
				<image v-else :src="hosts+'select_no.png'" class="moeqjh"></image>
			</view>
			<button class="btn">确认</button>
<!-- 			<view class="nofspw" @click="tab(2)">
				<view class="rdezn">
					<u-icon size="30" name="rmb-circle-fill" color="#ff8e24"></u-icon>
					<view class="alipay">积分</view>
				</view>
				<image v-if="nav==2" :src="hosts+'select_yes.png'" class="moeqjh"></image>
				<image v-else :src="hosts+'select_no.png'" class="moeqjh"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nav:1
			}
		},
		methods:{
			tab(u) {
				if (u == 2) {
					uni.showToast({
						title: '该支付方式暂不支持',
						icon: 'none'
					})
					setTimeout(() => {
						this.nav = 1
					}, 1000)
				} else {
					this.nav = u
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.rectangle_2858rwf{
	    border-radius: 8rpx;
	    background-color: rgb(255, 255, 255);
	    margin-top: 24rpx;
	    margin-left: auto;
	    margin-right: auto;
	    padding-bottom: 32rpx;
	    padding-top: 1rpx;
	    width: 686rpx;
			.top_text{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				font-size: 32rpx;
			}
			.btn{
				
				margin-top: 20rpx;
				width: 638rpx;
				height: 100rpx;
				border-radius: 10rpx;
				border: 1rpx solid #d8ca9e;
			}
	}
	.wuhil{
	    margin-top: 32rpx;
	    margin-left: auto;
	    margin-right: auto;
	    display: flex;
	    align-items: center;
	    width: 638rpx;
	    justify-content: space-between;
	}
	.sydiu{
	    margin-top: 26rpx;
	    margin-left: 24rpx;
	    display: flex;
	    width: 620rpx;
	    justify-content: space-between;
	}
	.nofspw{
	    margin-top: 28rpx;
	    margin-left: 24rpx;
	    display: flex;
	    width: 620rpx;
	    justify-content: space-between;
	}
	.rectangle_2823tv{
	    background-color: rgb(245, 245, 245);
	    margin-top: 24rpx;
	    margin-left: auto;
	    margin-right: auto;
	    width: 638rpx;
	    height: 2rpx;
	}
	.mwlok{
	    margin-top: 32rpx;
	    margin-left: 24rpx;
	    display: flex;
	    align-items: center;
	    width: 620rpx;
	    justify-content: space-between;
	}
	.rdezn{
	    width: fit-content;
	    display: flex;
	    align-items: center;
	}
	.uzqoln{
	    width: 32rpx;
	    height: 32rpx;
	}
	.alipay{
	    font-size: 28rpx;
	    color: rgb(34, 34, 34);
	    margin-left: 8rpx;
	}
	.moeqjh{
	    width: 40rpx;
	    height: 40rpx;
	}
</style>