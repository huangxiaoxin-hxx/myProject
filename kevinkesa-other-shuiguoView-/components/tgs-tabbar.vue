
<template>
	<view class="tabbar-container">
			
				<view class="tabbar-item" v-for="(item, index) in tabbarList" :key="index" :class="[item.centerItem ? 'center-item' : '']" @click="changeItem(item)">
				
				<view class="item-top">
					<!-- <view v-if="index==3" class="hongbiao">1</view> -->
					<image :class="index==2?'tupian2':'tupian'" :src="currentItem == index ? item.selectIcon : item.icon"></image></view>
				<view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
					<text v-if="index==2?false:true" style="font-size: 12px;line-height: 15px;font-family:myIconfont;" >{{ item.text }}</text>
				</view>
				
			</view>
	</view>
</template>
<script>
export default {
	props: {
		currentPage: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			currentItem: 0,
			tabbarList: [
				
				{
					id: 0,
					path: '/pages/homepage_is_not',
					icon: '/static/b_icon.png',
					selectIcon: '/static/a_icon.png',
					text: '首页',
					centerItem: false
				},
				{
					id: 1,
					path: '/pages/mission_hall',
					icon: '/static/b_icon2.png',
					selectIcon: '/static/a_icon2.png',
					text: '任务',
					centerItem: false
				},
				{
					id: 2,
					path: '/pages/release_video',
					icon: '/static/a_icon3.png',
					selectIcon: '/static/a_icon3.png',
					text: '发布',
					centerItem: true
				},
				{
					id: 3,
					path: '/pages/shop/index',
					icon: '/static/b_icon4.png',
					selectIcon: '/static/a_icon4.png',
					text: '商城',
					centerItem: false
				},
				{
					id: 4,
					path: '/pages/mine',
					icon: '/static/b_icon5.png',
					selectIcon: '/static/a_icon5.png',
					text: '我的',
					centerItem: false
				}
			],
			wHeight:100,
			windowWidth:0
		};
	},
			beforeCreate() {
							//#ifdef APP-PLUS
								const domModule = uni.requireNativePlugin('dom')
								domModule.addRule('fontFace', {
									'fontFamily': "myIconfont",
									'src': "url('http://at.alicdn.com/t/font_2234252_v3hj1klw6k9.ttf')"
								});
							//#endif
						},
	mounted() {
		this.windowWidth = uni.getSystemInfoSync().screenWidth//获取屏幕宽度
		this.wHeight = uni.getSystemInfoSync().screenHeight;//获取屏幕高度
		this.currentItem = this.currentPage;
		uni.hideTabBar();
	},
	methods: {
		changeItem(item) {
			let _this = this;
			//_this.currentItem = item.id;
			uni.switchTab({
				url: item.path
			});
		}
	}
};
</script>
<style>

.tabbar-container {
	padding: 0;
	margin: 0;
	/* box-sizing: border-box; */
}
.tabbar-container {
	background-color: #FFFFFF;
	z-index: 10;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 750rpx;
	height: 60px;
	/* box-shadow: 0 0 5rpx #999; */
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #FFFFFF;
	/* padding: 5rpx 0; */
	/* color: #999999; */
}
.tabbar-container .tabbar-item {
	width: 75px;
	height: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* text-align: center; */
}
.tabbar-container .item-active {
	/* color: #2D6ED4; */
}
.tabbar-container .center-item {
	/* position: relative; */
}
.tabbar-container .tabbar-item .item-top {
	width: 150rpx;
	
	/* height: 70rpx; */
	/* padding: 10rpx; */
	display: flex;
	justify-content: center;
}
.tabbar-container .center-item .item-top {

	/* box-shadow: 0 -3rpx 3rpx #999;
	/* background-color: #ffffff; */
	display: flex;
	justify-content: center;
	
	
}
.tabbar-container .tabbar-item .item-top .tupian {
	width:30px;
	height:30px;
}
.tabbar-container .tabbar-item .item-top .tupian2 {
	width: 50px;
	height: 50px;
}
.tabbar-container .tabbar-item .item-bottom {
	
	/* font-size: 22rpx; */
	width: 125rpx;
	height: 15px;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
</style>