<template>
	<view style="width: 100%;">
		<view
			:style="'height:'+ wHeight +'rpx;background:linear-gradient(90deg, rgb(75, 211, 173), rgb(29, 200, 177));width:100%;'">
		</view>
		<view class="topInfo">

			<image v-if="pstt" :src="pstt+'qtxoe1627006586707.png'" @click="back" class="topInfo_img"></image>
			<view class="topInfo_text">{{text}}</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: ''
			},
			IsAct:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				wHeight: '',
				shu:'' ,//页面层数
				pstt:''
			}
		},
		mounted() {
			this.pstt = this.hosts
			// #ifdef APP-PLUS
				this.wHeight = plus.navigator.getStatusbarHeight()*2;
			// #endif
			//#ifdef MP-WEIXIN
			this.wHeight = 80
			//#endif
			
			//防止刷新后不能返回-->将直接回首页
			var pages = getCurrentPages();
			this.shu = pages.length
					

		},
		methods: {
			back() {
				if(this.IsAct&&this.shu>1){
					uni.navigateBack({})
				}else{
					uni.switchTab({
						url:'/pages/homepage_is_not'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topInfo {
		background: linear-gradient(90deg, rgb(75, 211, 173), rgb(29, 200, 177));
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: auto;
		padding-bottom: 20rpx;
		.topInfo_img {
			position: absolute;
			left: 30rpx;
			width: 48rpx;
			height: 48rpx;
		}

		.topInfo_text {
			
			font-size: 36rpx;
			color: rgb(255, 255, 255);
		}
	}
	
</style>
