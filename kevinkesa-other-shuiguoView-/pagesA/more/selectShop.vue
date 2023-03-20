<template>
	<view>
		<view class="shop1">
			<view class="shop1_common" @click="select(0)">
				<text :class="show?'shop1_text':'shop1_select_text'">选择门店</text>
				<view v-if="!show" class="shop1_common_btn"></view>
			</view>
			<view class="shop1_common" @click="select(1)">
				<text :class="!show?'shop1_text':'shop1_select_text'">常用/收藏</text>
				<view v-if="show" class="shop1_common_btn"></view>
			</view>
		</view>
		<view :style="{width:'100%',height:screenHight+'px'}">
			<swiper :disable-touch="true" :current="show?1:0" style="height: 100%;" @touchmove.stop="stopmove()">
				<swiper-item style="height: 100%;" @touchmove.stop="stopmove()">
					<view class="left_swiper">
						<view class="shop2">
							<view class="shop2_left" @click="$gonext('/pagesA/more/selectArea')">
								<u-icon :label="city+'   '+county" color="#000" label-color="#000" size="30"
									label-pos="left" name="arrow-right"></u-icon>
							</view>
							<view class="shop2_right" @click="$gonext('/pagesA/more/search')">
								<u-icon label="搜索" label-size="20" size="28" label-pos="right" name="search"></u-icon>
							</view>
						</view>
						<view class="shop3">
							<map style="width: 100%;height: 100%;" :latitude="latitude" :longitude="longitude"
								:markers="covers"></map>
						</view>
						<view :class="shows1?'shop4':'shop4_s'">
							<view class="shop4_top" @click="shows1 = !shows1">
								<u-icon v-if="shows1" label="收起地图" size="33" name="arrow-up" label-pos="left"></u-icon>
								<u-icon v-else label="展开地图" size="33" name="arrow-down" label-pos="left"></u-icon>
							</view>
							<scroll-view :scroll-y="true" scroll-top="0" :scroll-x="false" style="height: 100%;">
								<view :class="actions!=index? 'shop4_list':'shop4_lists'" v-for="(item,index) of list"
									:key="index" @click="selectArea(index,item)">
									<view class="shop4_left">
										<view class="shop4_common" style="font-size: 32rpx;margin-top: 0;">{{item.name}}
										</view>
<!-- 										<view class="shop4_common">
											<view class="shop4_list2_common">可外送</view>
											<view class="shop4_list2_common" style="margin-left: 10rpx;">可自取</view>
										</view> -->
										<view class="shop4_common">
											<u-icon name="map" size="28" :label="item.extend.address" label-size="23"></u-icon>
										</view>
										<view class="shop4_common">
											<u-icon name="clock" size="28" :label="item.extend.business_time"
												label-size="23"></u-icon>
										</view>
										<view class="shop4_common">
											<view class="shop4_list5_common" v-if="item.city">{{item.city}}</view>
											<view class="shop4_list5_common" style="margin-left: 10rpx;" v-if="item.district">{{item.district}}</view>
										</view>
									</view>
									<view class="shop4_right">
										<view class="shop4_list_top">去下单</view>
										<!-- <view class="shop4_list_center">距离{{item.distance.range}}</view> -->
										<view class="shop4_list_bottom">
											<view class="shop4_list_bottom_bg" @click.stop="makePhone(item)">
												<u-icon name="phone-fill" size="32"></u-icon>
											</view>
											<view class="shop4_list_bottom_bg" @click.stop="golocation(item)">
												<u-icon name="map-fill" size="32"></u-icon>
											</view>
										</view>
										<view :class="actions==index?'lg':'lgs'">
											<u-icon v-if="actions==index?true:false" name="checkmark" color="#fff"
												size="30"></u-icon>
										</view>
									</view>
								</view>
								<view class="bottom_tishi">
									<loadding v-if="page==last_page"></loadding>
								</view>
							</scroll-view>

						</view>
					</view>

				</swiper-item>
				<swiper-item @touchmove.stop="stopmove()">
					<view class="shop_right">
						<text class="shop_text" v-if="!shopList.length">暂无内容</text>
						<view class="goods_common" v-for="(item,index) in shopList" :key="index">
							<view class="goods_common_img">
								<image class="goods_img" :src="item.shop.logo"></image>
								<view class="chakan" @click="go(item)">点击查看</view>
							</view>
							<view class="goods_right">
								<view class="goods_title">{{item.shop.name}}</view>
								<view class="goods_text">{{item.shop.province?item.shop.province+item.shop.city+item.shop.district:' '}}</view>
								<!-- <view>{{isShow?}}</view> -->
								<view class="goods_price">
								<text class="goods_prices">{{'热度:'+item.shop.popularity}}</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="tips" v-if="shows2">
			<view class="tips_top">
				<text class="tips_top_text">提示</text>
				<u-icon name="close" size="32" @click="close()"></u-icon>
			</view>
			<view class="tips_center" v-if="shows3">
				<text>你选中的是当前所在店铺，是否返回上一</text>
				<text>级继续点单</text>
			</view>
			<view class="tips_center" v-else>
				<text>你所在的位置离该门店较远，确认切换</text>
				<text>到[{{list[actions].name}}]门店吗？</text>
			</view>
			<view class="tips_bottom">
				<button class="tips_bottom_left" @click="goShop()">确定</button>
				<button class="tips_bottom_right" @click="close()">取消</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false, //最上面选择门店/收藏
				shows1: true, //收起地图/展开地图
				shows2: false,
				shows3: false, //选择是否改变 ， false没变，true变了
				actions: 0,
				screenHight: 0,
				list: {},
				city: '南昌',
				county: '青云谱',
				page: 1,
				limit: 20,
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				last_page: 1,
				goList: false,
				shopList:[]
			}

		},
		onShow() {
			if (uni.getStorageSync('city')) {
				this.city = uni.getStorageSync('city')
				this.county = uni.getStorageSync('county')
			}
			if (uni.getStorageSync('isTrue')) {
				this.getList(true)
			}
			uni.setStorageSync('isTrue', false)
		},
		onLoad({
			type
		}) {
			console.log(type)
			this.getShopList()
			this.getList()

			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					var bei = (res.windowWidth / 375)
					//#ifdef H5
					this.screenHight = (res.windowHeight - 40)
					//#endif
					//#ifdef MP-WEIXIN
					this.screenHight = (res.windowHeight - 40)
					//#endif
				}
			})
		},
		methods: {
			go(item){
					uni.setStorageSync('id',item.shop_id)
					uni.switchTab({
						url:'/pages/tabbar/mallMenu/index'
					})
			},
			//获取收藏列表
			getShopList() {
				this.$u.api.collectShopList().then(res => {
					console.log(res, 'collect')
					if (this.goList) {
						this.shopList.push({
							...res.data.data
						})
						this.goList = false
					} else {
						this.shopList = res.data.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getList(type) {
				this.$u.api.shopList({
					page: 1,
					limit: 20,
					keyword: type ? uni.getStorageSync('search') : '',
					province: type ? uni.getStorageSync('Province') : '',
					city: type ? uni.getStorageSync('city') : '',
					district: type ? uni.getStorageSync('county') : ''
				}).then((res) => {
					console.log(res)
					this.last_page = res.data.last_page
					this.page = res.data.current_page
					var lists = res.data.data
					// var dis = [{
					// 	x: this.longitude,
					// 	y: this.latitude
					// }, {
					// 	x: 0,
					// 	y: 0
					// }]
					// lists.filter((item, index) => {
					// 	console.log(item)
					// 	lists.filter((item1, index1) => {
					// 		if (item1.goods.length <= 0) {
					// 			lists.splice(index1, 1)
					// 		}
					// 	})

					// })
					// lists.filter((item, index) => {
					// 	dis[1].x = item.extend.lng
					// 	dis[1].y = item.extend.lat
					// 	item.distance = this.$distance(dis)
					// })


					console.log(lists, 'looks')
					if (this.goList) {
						lists.filter((item, index) => {
							this.list.push(item)
						})
						this.goList = false
					} else {
						this.list = lists
					}

					// for (var i = 1; i < this.list.length; i++) {
					// 	//内层循环：控制每轮比较次数  数组长度-i
					// 	for (var j = 0; j < this.list.length - i; j++) {
					// 		//如果当前的元素(j)大于下一个元素(j+1)，则交换位置
					// 		if (uni.getStorageSync('id') == this.list[j].id) {
					// 			this.list.unshift(this.list[j])
					// 			this.list.splice(j, 1)
					// 		} else {
					// 			if (this.list[j].distance.to > this.list[j + 1].distance.to) {
					// 				var t = this.list[j];
					// 				this.list[j] = this.list[j + 1];
					//   		this.list[j + 1] = t;
					//   	}
					// 		}

					//  }
					// }
					this.list.filter((item, index) => {

						if (item.id == uni.getStorageSync('id')) {
							this.actions = index
							this.latitude = item.extend.lat
							this.longitude = item.extend.lng
						} else {
							if (index == 0) {
								this.latitude = item.extend.lat
								this.longitude = item.extend.lng
							}
						}
						this.covers.push({
							id: index,
							iconPath: '../../static/dingwei.png',
							latitude: parseFloat(item.extend.lat),
							longitude: parseFloat(item.extend.lng),
							width: 40,
							height: 40
						})
					})
					this.city
					console.log(this.list)
				}).catch(err => {
					console.log(err)
				})
			},
			goShop() {
				uni.setStorageSync('id', this.list[this.actions].id)
				uni.switchTab({
					url: '/pages/tabbar/mallMenu/index'
				})
			},
			close() {
				this.shows2 = false
			},
			// getlocations() {
			// 	uni.getLocation({
			// 		type: 'wgs84',
			// 		success: (res) => {
			// 			console.log('当前数值：',res);
			// 			console.log('当前位置的经度：' + res.longitude);
			// 			console.log('当前位置的纬度：' + res.latitude);
			// 			setTimeout(() => {
			// 				// console.log(this.latitude,this.longitude)

			// 				this.latitude = res.latitude
			// 				this.longitude = res.longitude
			// 			}, 50)

			// 		}
			// 	});
			// },
			stopmove() {
				return false
			},
			changes(e) {
				console.log(e)
			},
			makePhone(item) {
				uni.makePhoneCall({
					phoneNumber: item.mobile //仅为示例
				});
			},
			golocation(item) {
				console.log('taoge')
				uni.openLocation({
					latitude: parseFloat(item.extend.lat),
					longitude: parseFloat(item.extend.lng),
					name: item.name,
					success: function() {
						console.log('success');
					}
				});
			},
			selectArea(index, item) {
				if (index == 0) {
					this.shows3 = true
				} else {
					this.shows3 = false
				}
				this.longitude = this.list[index].extend.lng
				this.latitude = this.list[index].extend.lat
				// return
				this.shows2 = true
				this.actions = index
			},
			select(type) {
				if (type) {
					this.show = true
				} else {
					this.show = false
				}
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: async function() {
			if (this.page >= this.last_page) {
				return
			} else {
				this.goList = true
				this.page = this.page + 1;
				this.getList()

			}
		},
	}
</script>

<style lang="scss" scoped>
	.shop1 {
		width: 100%;
		height: 40px;
		font-size: 33rpx;
		border-bottom: 1rpx solid #cacdd1;
		display: flex;
		justify-content: space-between;

		.shop1_common {
			width: 300rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			.shop1_text {
				margin-top: 10rpx;
			}

			.shop1_select_text {
				margin-top: 10rpx;
				font-weight: bold;
				color: #daa773;
			}

			.shop1_common_btn {
				width: 100rpx;
				height: 6rpx;
				background-color: #daa773;
			}
		}
	}

	.left_swiper {
		width: 750rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		.shop2 {
			background-color: #fff;
			width: 100%;
			height: 7%;
			padding: 10px 0 10px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.shop2_left {
				margin-left: 30rpx;
			}

			.shop2_right {
				margin-right: 30rpx;
				width: 120rpx;
				height: 50rpx;
				border-radius: 30rpx;
				background-color: #d0d0d1;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.shop3 {
			width: 100%;
			height: 33%;
			background-color: #d0d0d1;
		}

		.shop4,
		.shop4_s {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 60%;
			background-color: #f5f5f5;

			.shop4_top {
				width: 100%;
				padding: 10px 0 10px 0;
				background-color: #fff;
				display: flex;
				justify-content: center;
			}
		}

		.shop4_s {
			height: 94%;
		}

		.shop4_list,
		.shop4_lists {
			width: 690rpx;
			padding: 30rpx;
			border-radius: 15rpx;
			margin: 20rpx auto;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			padding-bottom: 30rpx;

			.shop4_left {
				// width: 80%;

				.shop4_common {
					margin-top: 10rpx;
					// width: 100%;
					display: flex;
					justify-content: flex-start;

					.shop4_list2_common {
						font-size: 20rpx;
						padding: 5rpx 10rpx 5rpx 10rpx;
						border-radius: 5rpx;
						background-color: #eaf3e8;
						color: #5ca546;
					}

					.shop4_list5_common {
						font-size: 20rpx;
						padding: 5rpx 10rpx 5rpx 10rpx;
						border-radius: 5rpx;
						border: 1rpx solid #daa773;
						color: #daa773;
					}
				}
			}

			.shop4_right {
				width: 200rpx;
				border-left: 1rpx solid #eeeeee;
				padding-left: 30rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.shop4_list_top {
					margin-top: 20rpx;
					color: #000;
				}

				.shop4_list_center {
					margin-top: 15rpx;
					font-size: 24rpx;
					color: #8e8e8e;
				}

				.shop4_list_bottom {
					margin-top: 20rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;

					.shop4_list_bottom_bg {
						width: 55rpx;
						height: 55rpx;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #d5d8db;
					}
				}
			}
		}

		.shop4_list {
			border: 1rpx solid #fff;
		}

		.shop4_lists {

			border: 1rpx solid #daa773;
		}

		.lg,
		.lgs {
			margin-top: 20rpx;
			border-radius: 0 0 10rpx 0;
			position: relative;
			width: 60rpx;
			height: 60rpx;
			right: -85rpx;
			bottom: -31rpx;
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;
			padding: 5rpx;
			background: linear-gradient(135deg, white, white 50%, #daa773 50%, #daa773 100%);
		}

		.lgs {
			background: #fff;
		}

		.bottom_tishi {
			width: 100%;
			height: 140rpx;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			color: #000;
		}
	}

	.shop_right {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;

		.shop_text {
			margin-top: 80rpx;
		}
	}

	.tips {
		padding: 20rpx 20rpx 20rpx 20rpx;
		position: absolute;
		left: 75rpx;
		width: 600rpx;
		height: 550rpx;
		margin: auto;
		top: 400rpx;
		background-color: #fff;
		// border: 1rpx solid #333;
		border-radius: 10rpx;
		box-shadow: 0rpx 2rpx 10rpx #333;
		display: flex;
		flex-direction: column;
		align-items: center;

		.tips_top {
			width: 100%;
			display: flex;
			justify-content: space-between;
			font-size: 32rpx;
		}

		.tips_center {
			margin-top: 100rpx;
			width: 85%;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			font-size: 26rpx;
		}

		.tips_bottom {
			margin-top: 130rpx;
			width: 85%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tips_bottom_left,
			.tips_bottom_right {
				width: 220rpx;
				height: 60rpx;
				font-size: 28rpx;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.tips_bottom_left {
				color: #fff;
				background-color: #1fc164;
			}

			.tips_bottom_right {
				color: #1fc164;
				background-color: #f2f2f2;
			}
		}
	}
	.goods_common{
		margin-top: 10rpx;
		width: 100%;
		padding: 15rpx 20rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.goods_common_img{
			width: 160rpx;
			height: 220rpx;
			.goods_img{
				width: 160rpx;
				height: 160rpx;
				background-color: red;
			}
			.chakan{
				margin: auto;
				font-size: 24rpx;
				width: 120rpx;
				height: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #5281c8;
				border: 1rpx solid #5281c8;
				border-radius: 10rpx;
			}
		}
		
		.goods_right{
			width: 540rpx;
			height: 220rpx;
			// background-color: green;
			.goods_title{
				font-weight: bold;
				font-size: 28rpx;
				display:-webkit-box;
				overflow:hidden;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2; //显示两行
				// height: 70rpx;
			}
			.goods_text{
				font-size: 26rpx;
				color: #8e8e8e;
			}
			.goods_price{
				font-size: 32rpx;
				margin-top: 50rpx;	
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: red;
				
			}
		}
	}
</style>
