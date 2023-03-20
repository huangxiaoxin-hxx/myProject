
<template>
	<view class="tabbar-container">
				<view class="tabbar-item" v-for="(item, index) in tabbarList" :key="index" :class="[item.centerItem ? 'center-item' : '']" @click="changeItem(item)">
				<view class="item-top">
					<!-- <view v-if="index==3" class="hongbiao">1</view> -->
					<image :class="index==2?'tupian2':'tupian'" :src="currentItem == index ? item.selectIcon : item.icon"></image>
				</view>
				<view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
					<text style="font-size: 12px;line-height: 15px;font-family:myIconfont;" >{{ item.text }}</text>
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
					path: '/pages/shop/index',
					icon: '/static/img/tabbar/b_icon4.png',
					selectIcon: '/static/img/tabbar/a_icon4.png',
					text: '商城',
					centerItem: false
				},
				{
					id: 1,
					path: '/pages/tabbar/mallMenu/index',
					icon: '/static/img/tabbar/FL.png',
					selectIcon: '/static/img/tabbar/FL_1.png',
					text: '店铺',
					centerItem: false
				},
				{
					id: 2,
					path: '/pages/shop/shopCart/shopping_cart',
					icon: '/static/img/tabbar/carts.png',
					selectIcon: '/static/img/tabbar/carts_1.png',
					text: '购物车',
					centerItem: true
				},
				{
					id: 3,
					path: '/pages/mall_order',
					icon: '/static/img/tabbar/b_icon2.png',
					selectIcon: '/static/img/tabbar/a_icon2.png',
					text: '订单',
					centerItem: false
				},
				{
					id: 4,
					path: '/pages/tabbar/my/index',
					icon: '/static/img/tabbar/b_icon5.png',
					selectIcon: '/static/img/tabbar/a_icon5.png',
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
	height: 100rpx;
	/* box-shadow: 0 0 5rpx #999; */
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-top: 1px solid #cacdd1;
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
	color: #2dc9b1;
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
	width:50rpx;
	height:50rpx;
}
.tabbar-container .tabbar-item .item-top .tupian2 {
	width: 55rpx;
	height: 55rpx;
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