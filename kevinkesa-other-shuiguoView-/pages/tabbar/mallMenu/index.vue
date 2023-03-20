<template>
	<view class="u-wrap">
		<view class="u-search-box">
<!-- 			<view class="mall_need">
				<view :class="shows ?'mall_common1':'mall_common2'" @click="select(0)">自提</view>
				<view :class="shows?'mall_common2':'mall_common1'" @click="select(1)">外卖</view>
			</view> -->
			<!-- <u-icon name="search" color="#909399" :size="28"></u-icon> -->
			<!-- <text class="u-search-text" @click="$gonext('/pagesA/more/selectShop')">选择门店</text> -->
			<view class="mall_top">
				<u-icon name="star" size="38" :color="isShow?'red':''" @click="collect"></u-icon>
				<text style="max-width: 450rpx;">{{info.name}}</text>
				<u-icon name="arrow-right" label="切换门店" @click="$gonext('/pagesA/more/selectShop')" size="28"
					label-size="28" label-pos="left" color="#999999" label-color="#999999"></u-icon>
			</view>
			<view class="mall_center">
				<!-- <text style="margin-right: 10rpx;">距离您{{juli}}</text> -->
			</view>
			<view class="mall_bottom">
				<u-icon :label="info.extend.shop_desc==''?'商家暂无公告':info.extend.shop_desc" name="volume" color="#dbaa78" size="32" label-color="#999999" label-size="28">
				</u-icon>
				<u-icon label="更多" name="arrow-down" color="#999999" size="24" label-pos="left" label-color="#999999"
					label-size="24" @click="show=true"></u-icon>
			</view>

		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
				:scroll-into-view="itemId">
				<view v-for="(item,index) in list" :key="index" class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box"
				@scroll="rightScroll">
				<view class="page-view">
					<view class="class-item" :id="'item' + index" v-for="(item , index) in list" :key="index">
						<view class="item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="item-container" v-for="(item1,index1) of item.goods_list" :key="index1" @click="$gonext('/pages/shop/goods/product_details?id='+item1.id)">
							<!-- 之前的uview -->
<!-- 							<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
								<image class="item-menu-image" :src="item1.icon" mode="scaleToFill"></image>
								<view class="item-menu-name">{{item1.name}}</view>
							</view> -->
							<!-- 之前的uview -->
							<image class="left_tu" :src="item1.thumb_photo"></image>
							<view class="right_content">
								<text class="right_top_text">{{item1.name}}</text>
								<text class="right_center_text">库存：{{item1.number}}</text>
								<view class="right_bottom">
									<text class="right_bottom_text">
										{{vuex_user.id&&vuex_user.price_show>0?'￥'+item1.price:'******'}}
										</text>
									<view class="right_bottom_btn" >选择</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<u-popup v-model="show" mode="bottom" :closeable="true" height="600" border-radius="26">
			<view class="mall_pops">
				<view class="mall_pops1">
					<view class="mall_pops_h1">{{item.name}}</view>
					<text class="mall_pops_title">公告</text>
					<text class="mall_pops_text">{{info.extend.shop_desc==''?'商家暂无公告':info.extend.shop_desc}}</text>
					<text class="mall_pops_title">配送信息</text>
					<text class="mall_pops_text">到店自提</text>
					<text class="mall_pops_title">门店信息</text>
					<text class="mall_pops_text">营业时间：{{info.extend.business_time}}</text>
					<text class="mall_pops_text" style="margin-top: 0;">联系电话：{{info.mobile}}</text>
					<text class="mall_pops_text" style="margin-top: 0;">门店地址：{{info.extend.address}}</text>
				</view>
				<view class="mall_pops_rice">
					<view class="pop_xu" ><text>到店</text></view>
					<view class="pop_tu" @click="golocation()">
						<u-icon name="map-fill" size="40" ></u-icon>

					</view>
					<view class="pop_tu" @click="makePhone()">
						<u-icon name="phone-fill" size="40"></u-icon>
					</view>
				</view>
			</view>
		</u-popup>

		<tabbares :currentPage="1"></tabbares>
	</view>
</template>
<script>
	import classifyData from '@/common/classify.data.js';
	import tabbares from '@/components/shops.vue' //后期其他人需要的
	export default {
		components: {
			tabbares
		},
		data() {
			return {
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0,
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				tabbar: classifyData,
				menuItemPos: [],
				arr: [],
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器
				list: [],
				show: false,
				shows: false ,//默认是自提  true 为外卖
				info:{},
				latitude:39.909,
				longitude:116.39742,
				dis:[{
					x:116.39742,
					y:39.909
				},{
					x:116.39742,
					y:39.909
				}],
				juli:'',
				isShow:false
			}
		},
		onLoad(res) {
			// this.getlocations()
			if(res.id){
				uni.setStorageSync('id',res.id)
			}
		},
		onReady() {
			this.getMenuItemTop()
		},
		onShow() {
			this.isShow = false
			if(uni.getStorageSync('id')){
				this.getInfo(uni.getStorageSync('id'))
			}else{
				this.$u.api.shopList({
					page:1,
					limit:20,
					keyword:''
				}).then((res)=>{
					this.getInfo(res.data.data[0].id)
				})
			}
			// wx.enableAlertBeforeUnload({
			// 	message:'确定要离开小程序吗？'
			// })
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
				wx.showShareMenu({
					withShareTicket: false,
					menus: ['shareAppMessage', 'shareTimeline']
				})
		    return {
		      title: this.info.name,
		      path: '/pages/tabbar/mallMenu/index?shareId=' + this.vuex_user.id+'&id='+this.info.id,
					imageUrl: this.info.logo
		    }
		  },
			onShareTimeline(res) {
				return {
					title: this.info.name,
					query: 'shareId=' + this.vuex_user.id+'&id='+this.info.id,
					imageUrl: this.info.logo
				}
			},
		methods: {
			collect(){
				this.$u.api.shopcollect({
					state:1,
					shop_id:uni.getStorageSync('id')
				}).then(res=>{
					console.log(res)
					this.isShow = true
					uni.showToast({
						icon:'none',
						title:res.msg
					})
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						icon:'none',
						title:err.data.msg
					})
				})
			},
			makePhone(){
				uni.makePhoneCall({
					phoneNumber: this.info.mobile //仅为示例
				});
			},
			golocation(){
				console.log('taoge')
				uni.openLocation({
							latitude: this.dis[1].y,
							longitude: this.dis[1].x,
							name:this.info.name,
							success: function () {
								console.log('success');
							}
						});
			},
			// getlocations(){
			// 	uni.getLocation({
			// 		type: 'gcj02',
			// 		altitude:true,
			// 		isHighAccuracy:true,
			// 		success:  (res)=> {
			// 			console.log(res)
			// 			console.log('当前位置的经度：' + res.longitude);
			// 			console.log('当前位置的纬度：' + res.latitude);
			// 			setTimeout(()=>{
			// 				this.dis[0].y = res.latitude
			// 				this.dis[0].x = res.longitude
			// 				if(uni.getStorageSync('id')){
			// 					this.getInfo(uni.getStorageSync('id'))
			// 				}else{
			// 					this.getInfo()
			// 				}
			// 			},50)
			
			// 		}
			// 	});
			// },

			getInfo(id){
				console.log(id)
				this.$u.api.shopInfo({id:id?id:1}).then(res=>{
					console.log(res,'taoge')
					this.info = res.data
					// this.dis[1].x = parseFloat(res.data.extend.lng)
					// this.dis[1].y = parseFloat(res.data.extend.lat)
					// setTimeout(()=>{
					// 	// this.juli = this.$distance(this.dis).range
					// },50)
					this.get(id)
				}).catch(err=>{
					console.log(err)
				})
			},
			select(type) {
				if (type) {
					uni.navigateTo({
						url: '/pages/shipping_addres'
					})
					this.shows = true
				} else {
					this.shows = false
				}
			},
			get(id) {
				this.$u.api.cateAll({shop_id:id?id:1}).then(res => {
					console.log(res,'shuju')
					this.list = res.data
				}).catch(err => {
					console.log(err)
				})
				this.$u.api.goodsList().then(res => {
					console.log('cateInfo', res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			// 观测元素相交状态
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					// 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
					// 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			// 设置左边菜单的滚动状态
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取右边菜单每个item到顶部的距离
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return;
						}
						rects.forEach((rect) => {
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
							resolve();
						})
					}).exec()
				})
			},
			// 右边菜单滚动
			async rightScroll(e) {
				// console.log(e)
				this.oldScrollTop = e.detail.scrollTop;
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (this.timer) return;
				if (!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return;
						}
					}
				}, 10)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;

		.mall_top {
			font-size: 32rpx;
			display: flex;
			// justify-content: center;
			align-items: center;

			text {
				margin-left: 15rpx;
				margin-right: 15rpx;
				font-weight: bold;
			}
		}

		.mall_center {
			margin-top: 12rpx;
			font-size: 28rpx;
			color: #999999;
		}

		.mall_bottom {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #999999;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.mall_need {
			position: absolute;
			right: 30rpx;
			width: 180rpx;
			height: 70rpx;
			border: 1rpx solid #dddddd;
			background-color: #f6f6f6;
			border-radius: 50rpx;
			padding: 0 10rpx 0 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.mall_common1,
			.mall_common2 {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.mall_common1 {
				font-size: 28rpx;
				width: 80rpx;
				color: #999999;
			}

			.mall_common2 {
				font-size: 30rpx;
				width: 80rpx;
				height: 50rpx;
				border-radius: 30rpx;
				background-color: #000;
				color: #fff;
			}
		}
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.class-item:last-child {
		min-height: 100vh;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		// display: flex; //之前的uview
		// flex-wrap: wrap; //之前的uview
		margin-top: 20rpx;
		width: 100%;
		height:  auto;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		.left_tu{
			width: 200rpx;
			height: 200rpx;
			border-radius: 16rpx;
		}
		.right_content{
			width: 300rpx;
			display: flex;
			flex-direction: column;
			
			.right_top_text{
				font-size: 30rpx;
				// font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.right_center_text{
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #aeaeae;
			}
			.right_bottom{
				margin-top: 28rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				.right_bottom_text{
					font-size: 28rpx;
					font-weight: bold;
				}
				.right_bottom_btn{
					width: 120rpx;
					height: 50rpx;
					border-radius: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #daa773;
					color: #fff;
				}
			}
		}
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}

	.mall_pops {
		width: 690rpx;
		margin-left: 30rpx;
		padding-top: 24rpx;
		display: flex;
		justify-content: center;

		.mall_pops1 {
			width: 690rpx;
			display: flex;
			flex-direction: column;

			.mall_pops_h1 {
				width: 690rpx;
				font-size: 44rpx;
				font-weight: bold;
				text-align: center;

			}

			.mall_pops_title {
				margin-top: 20rpx;
				font-size: 32rpx;
				color: #000;
			}

			.mall_pops_text {
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #999999;
			}
		}

		.mall_pops_rice {
			width: 180rpx;
			position: absolute;
			right: 30rpx;
			bottom: 30rpx;
			display: flex;
			justify-content: space-between;

			.pop_tu {
				width: 60rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				background-color: #d5d8db;

			}

			.pop_xu {
				z-index: 20;
				position: absolute;
				padding: 0 10rpx 0 10rpx;
				margin-left: 46rpx;
				margin-top: -10rpx;
				// width: 40rpx;
				color: red;
				font-size: 18rpx;
				border-radius: 10rpx;
				background-color: #ffefea;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

	}
</style>
