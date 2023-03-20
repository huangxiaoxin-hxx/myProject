<template>
	<view class="bodys">
		<tabbares :currentPage="3"></tabbares>
		<navigator url="/pages/kcx/user/huo_notice" class="xiaoxi_top">
			<view style="width: 100rpx;height: 100rpx;margin-left: 30rpx;">
				<view class="hongbiao">11</view>
				<image class="xiaoxi_img" :src="vuex_user.header" />
			</view>

			<view class="xiaoxi_content">
				<view class="xiaoxi_content1">
					<text class="xiaoxi_content_title">新货源通知</text>
					<view>11</view>
				</view>
				<text>您订阅的线路有新的货源了</text>
			</view>

		</navigator>
		<view class="xiaoxi_center" v-for="(item,index) in info" :key="item.id"  @click="toInfo(item)">
			<text class="xiaoxi_center_time">{{item.update_time}}</text>
			<view class="xiaoxi_center1">
				<view class="xiaoxi_center1_title">
					<view v-if="item.state_text=='未读'" class="xiaoxi_center_red">未读</view>
					<view class="title">{{item.xin.title}}</view>
				</view>
				<!-- <text class="xiaoxi_center1_text" v-html="item.xin.content"></text> -->
				<view class="xiaoxi_center1_xq">
					查看详情
					<!-- <tui-icon name="arrowright" color="#D5D5D5" :size="22"></tui-icon> -->
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	import tabbares from '@/components/shops.vue' //后期其他人需要的
	export default {
		components: {
			tabbares
		},
		data() {
			return {
				info: [{
					id:1,
					update_time:'2012-10-10',
					state_text:'未读',
					xin:{
						title:'taoge'
					}
				},{
					id:2,
					update_time:'2012-10-10',
					state_text:'已读',
					xin:{
						title:'一年有365个日出，我给你365个祝福。'
					}
				}],
				noNum:'' ,//未读消息
				totalInfo:null,
			}
		},
		onShow() {
			// this.noInfo()
			// if(!this.vuex_user.id||this.vuex_user.mobile==''){
			// 	uni.navigateTo({
			// 		url:'/pages/kcx/login/index'
			// 	})
			// }else{
				
			// 	// this.getInfo()
			// }			
		},	
		methods: {
			//获取未读消息数量
			noInfo(){
				this.$u.api.noticeUnReadNum().then(res=>{
					this.noNum = res.data.num
					this.totalInfo = res.data
				})
			},
			toInfo(item) {
				if(item.xin.page!=''){
					
					if(item.xin.page.indexOf("pages/kcx/tabbar") != -1){
						uni.switchTab({
							url:'/'+item.xin.page
						})
					}else{
						uni.navigateTo({
							url:'/'+item.xin.page
						})
					}
				}else{
					uni.navigateTo({
						url: '/pagesA/kcx/user/xinxiInfo?id=' + item.id
					})
				}
			},
			async getInfo() {
				const data = await this.$u.api.noticeList({
					page: 1,
					limit: 40
				})
				this.info = data.data.data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bodys{
		background-color: #f6f6f6;
		width: 100%;
		min-height: 1200rpx;
	}
	.xiaoxi_top {
		background-color: #f6f6f6;
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		border-top: 1rpx solid #D5D5D5;
		border-bottom: 1rpx solid #D5D5D5;

		.hongbiao {
			position: absolute;
			margin-left: 70rpx;
			margin-top: -10rpx;
			width: 40rpx;
			height: 40rpx;
			background-color: red;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			font-size: 24rpx;
			z-index: 10;
		}

		.xiaoxi_img {
			width: 100rpx;
			height: 100rpx;
			background-color: #007AFF;
			border-radius: 50%;
			
		}

		.xiaoxi_content {
			height: 100rpx;
			margin-left: 20rpx;
			font-size: 24rpx;
			color: #9A9A9A;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.xiaoxi_content1 {
				width: 570rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.xiaoxi_content_title {
					font-size: 32rpx;
					color: #000000;
				}
			}

		}
	}

	.xiaoxi_center {
		width: 690rpx;
		margin: 20rpx auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30rpx;
		// background-color: #f6f6f6;

		.xiaoxi_center_time {
			font-size: 24rpx;
			color: #9A9A9A;
		}

		.xiaoxi_center1 {
			margin-top: 20rpx;
			border-radius: 10rpx;
			width: 100%;
			background-color: #dcdcdc;
			padding-left: 20rpx;

			.xiaoxi_center1_title {
				
				font-size: 32rpx;
				color: #000000;
				margin: 20rpx 10rpx;
				display: flex;
				flex-direction: row;
				align-items: left;
				
				.title{
					overflow:hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					flex: 1;
				}
				
				.xiaoxi_center_red {
					width: 80rpx;
					height: 40rpx;
					line-height: 35rpx;
					border-radius: 20rpx;
					background-color: red;
					color: #FFFFFF;
					font-size: 22rpx;
					margin-right: 10rpx;
					text-align: center;
				}
			}

			.xiaoxi_center1_text {
				margin-top: 24rpx;
				font-size: 24rpx;
				color: #9A9A9A;
				
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.xiaoxi_center1_xq {
				color: #2D6ED4;
				margin-top: 28rpx;
				width: 650rpx;
				height: 100rpx;
				border-top: 1rpx solid #D5D5D5;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>
