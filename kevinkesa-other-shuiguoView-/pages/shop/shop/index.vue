<template>
	<view class="shop_body">
		<!-- 状态栏高度 -->
		<view :style="'height:'+wHeight+'rpx;width:100%;background-color: #fff;'"></view>
		<view class="top_tabbar" style="background-color: #fff;">

			<image :src="pstt+'returns.png'" @click="back" class="top_tabbar_img"
				style="margin: -5rpx 0 0 30rpx;">
			</image>
			<view class="dp_center" style="font-size: 32rpx;">店铺</view>
			<view style="margin-right: 30rpx;" v-if="showSub">
				<u-icon size="45" name="plus-circle" @click="shows = true"></u-icon>
			</view>
		</view>
		<view class="shop_info">
			<view class="shop_fly">
				<!-- <view class="shop_btn1" @click="$gonext('../shop/index')">进店逛逛</view> -->
				<view class="shop_btn2" @click="makePhone(shop.mobile)">联系商家</view>
			</view>
			<view class="shop_top">
				<image class="shop_top_img" :src="shop.logo"></image>
				<view class="shop_top_center">
					<text class="shop_top_text1">{{shop.name}}</text>
					<view class="shop_top_centers">
						<view class="shop_top_auth">企业</view>
						<text class="shop_top_text2">已上架商品 {{shop.goods_num}}件</text>
					</view>
				</view>
			</view>
			<view class="shop_center">
				<text class="shop_center_text1">店铺人气</text>
				<text class="shop_center_common">{{shop.popularity}}</text>
				<view class="shop_center_xu"></view>
				<text class="shop_center_text2">店铺评价</text>
				<text class="shop_center_common" style="margin-right: 10rpx;">{{shop.score}}</text>
				<u-icon label="收藏店铺" size="30" label-size="24" :color="isShow?'red':''" name="star" @click="collect"></u-icon>
			</view>
		</view>
		<view class="shop_tabbars">
			<view class="shop_common">
				<view class="shop_common_center" @click="select(0)">
					销量
					<view class="shop_common_centers">
						<image class="shop_imgs" :src="pstt+'img/index/top.png'" v-if="type!=0"></image>
						<image class="shop_imgs" :src="pstt+'img/index/bottom.png'" v-if="type!=0"></image>
						<image class="shop_imgs" :src="pstt+'img/index/topBlack.png'" v-if="type==0&&show"></image>
						<image class="shop_imgs" :src="pstt+'img/index/bottomBlack.png'" v-if="type==0&&!show"></image>
					</view>
				</view>
				<view class="shop_tabbars_bot" v-if="type==0"></view>
			</view>
			<view class="shop_common" @click="select(1)">
				<view>上新</view>
				<view class="shop_tabbars_bot" v-if="type==1"></view>
			</view>
			<view class="shop_common" @click="select(2)">
				<view class="shop_common_center">
					消费积分
					<view class="shop_common_centers">
						<image class="shop_imgs" :src="pstt+'img/index/top.png'" v-if="type!=2"></image>
						<image class="shop_imgs" :src="pstt+'img/index/bottom.png'" v-if="type!=2"></image>
						<image class="shop_imgs" :src="pstt+'img/index/topBlack.png'" v-if="type==2&&show"></image>
						<image class="shop_imgs" :src="pstt+'img/index/bottomBlack.png'" v-if="type==2&&!show"></image>

					</view>
				</view>
				<view class="shop_tabbars_bot" v-if="type==2"></view>
			</view>
		</view>
		<view class="every_goods">
			<view class="every_goods1" v-for="(item,index) in list" :key="index"
				@click="$gonext('../goods/product_details?id='+item.id)">
				<img mode="scaleToFill" class="every_goods_img" :src="item.thumb_photo"></img>
				<view class="every_goods_text1">{{item.name}}</view>
				<view class="every_goods_center">
					<text class="every_goods_text2">{{vuex_user.id&&vuex_user.price_show>0?'￥'+item.price:'******'}}</text>
					<text class="every_goods_text3">消费积分</text>
				</view>
				<view class="triangle"></view>
				<view class="every_goods_bottom">
					<view class="every_goods_yue">约2.2VST</view>
					<text>销量：{{item.pageview}}</text>
				</view>
			</view>
		</view>
		<u-mask :show="shows" @click="shows = false" :zIndex="10"></u-mask>
		<view class="bodys" v-show="shows" :style="'top:'+(wHeight+80)+'rpx;'">
			<view class="pops_triangle"></view>
			<view class="pops">
				<view>
					<u-icon label="分享到微信" label-color="#fff" name="weixin-fill" label-size="33" color="#fff" size="50"
						margin-left="15"></u-icon>
				</view>
				<view>
					<u-icon label="分享到微信" label-color="#fff" name="share-fill" label-size="33" color="#fff" size="50"
						margin-left="15"></u-icon>
				</view>
				<view>
					<u-icon label="分享到微信" label-color="#fff" name="scan" label-size="33" color="#fff" size="50"
						margin-left="15"></u-icon>
				</view>

				<!-- 人生若只如初见，何事秋风悲画扇 -->
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				wHeight: 20,
				shu: '', //页面层数
				type: 0,
				show: false,
				shows: false,
				shop: {},
				id: 0, //店铺id
				page: 1,
				limit: 20,
				last_page: 1,
				price_sort: 0, //价格排序
				list: [] ,//商品列表
				showSub:true,
				pstt:'',
				isShow:false
			}
		},
		onLoad({
			id
		}) {
			this.pstt = this.hosts
			// #ifdef APP-PLUS
			this.wHeight = plus.navigator.getStatusbarHeight() + 30;
			// #endif
			//#ifdef MP-WEIXIN
				this.showSub =false
			//#endif
			//防止刷新后不能返回-->将直接回首页
			var pages = getCurrentPages();
			this.shu = pages.length
			this.id = id
			this.shops(id)
			this.getList()
		},
		methods: {
			collect(){
				this.$u.api.shopcollect({
					state:1,
					shop_id:this.shop.id
				}).then(res=>{
					console.log(res)
					this.isShow = true
				}).catch(err=>{
					console.log(err)
				})
			},
			//拨打电话
			makePhone(phone) {
				console.log(phone)
				//#ifdef H5
				this.$tips('请使用手机app')
				//#endif
				//#ifdef APP-PLUS
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
				//#endif
				//#ifdef MP-WEIXIN
				
					// this.call(phone)
					// plus.device.dial(phone,true)
					uni.makePhoneCall({
						phoneNumber: phone ,//仅为示例
					success: (res) => {
						console.log('relext',res)
					},
					fail: (err) => {
						console.log('err',err)
					}
				});
				//#endif
			},
			getList(type) {
				this.$u.api.goodsList({
					shop_id: this.id,
					page: this.page,
					limit: this.limit,
					price_sort: this.price_sort,
					is_new: this.type == 1 ? 1 : 0
				}).then(res => {
					console.log(res)
					this.last_page = res.data.last_page
					if (type) {
						this.list.push(...res.data.data)
					} else {
						this.list = res.data.data
					}

				}).catch(err => {
					console.log(err)
				})
			},
			shops(id) {
				this.$u.api.shopInfo({
					id: id
				}).then(res => {
					console.log(res)
					this.shop = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			select(type) {
				if (type == this.type) {
					this.show = !this.show
				} else {
					this.show = false
				}
				this.type = type
			},
			back() {
				if (this.shu > 1) {
					uni.navigateBack({})
				} else {
					uni.switchTab({
						url: '/pages/homepage_is_not'
					})
				}
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: async function() {
			if (this.page >= this.last_page) {} else {
				this.page++
				this.getList(true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop_body {
		width: 100%;
		min-height: 100vh;
		background-color: #e8e7e3;
	}

	.top_tabbar {
		width: 750rpx;
		height: 100rpx;
		margin: auto;
		display: flex;
		// justify-content: flex-end;
		align-items: flex-end;
		.dp_center{
			position: relative;
			width: 750rpx;
			text-align: center;
			// margin: auto;
		}
		.top_tabbar_img {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.shop_info {
		// margin-top: 15rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background-color: #fff;
		// border-radius: 15rpx;
		padding: 30rpx 0 20rpx 30rpx;

		.shop_top {
			width: 690rpx;
			display: flex;
			align-items: flex-start;

			// margin: 0 auto;
			.shop_top_img {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}

			.shop_top_center {
				margin-left: 20rpx;
				height: 90rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.shop_top_centers {
					display: flex;
					align-items: center;

					.shop_top_auth {
						padding: 0 10rpx 0 10rpx;
						border-radius: 10rpx;
						display: flex;
						background-color: red;
						font-size: 24rpx;
						color: #fff;
					}

					.shop_top_text2 {
						margin-left: 10rpx;
						font-size: 24rpx;
						color: #978095;
					}
				}

				.shop_top_text1 {
					font-size: 33rpx;
					font-weight: bold;
				}
			}

		}

		.shop_center {
			margin-top: 20rpx;
			width: 690rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;

			.shop_center_text1 {
				color: #978095;
			}

			.shop_center_xu {
				margin-left: 10rpx;
				height: 20rpx;
				border-left: 1rpx solid #978095;
			}

			.shop_center_text2 {
				margin-left: 10rpx;
				color: #978095;
			}

			.shop_center_common {
				margin-left: 8rpx;
				color: red;
			}
		}

		.shop_fly {
			position: absolute;
			right: 30rpx;

			.shop_btn1,
			.shop_btn2 {
				width: 140rpx;
				height: 50rpx;
				border: 1rpx solid red;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				color: red;
			}

			.shop_btn2 {
				margin-top: 10rpx;
			}
		}
	}

	.shop_tabbars {
		background-color: #fff;
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: flex-start;

		.shop_common {
			width: 250rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			.shop_common_center {
				display: flex;
				align-items: center;

				.shop_common_centers {
					margin-left: 8rpx;
					display: flex;
					flex-direction: column;

					.shop_imgs {
						width: 18rpx;
						height: 18rpx;
					}
				}
			}
		}

		.shop_tabbars_bot {
			margin-top: 10rpx;
			width: 80rpx;
			height: 6rpx;
			border-radius: 80rpx;
			background-color: #e23d2e;
		}
	}

	.every_goods {
		width: 710rpx;
		// margin-top: 10rpx;
		margin: auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.every_goods1 {
			background-color: #fff;
			border-radius: 15rpx;
			width: 345rpx;
			margin-top: 20rpx;
			padding: 0 0 20rpx 0;

			.every_goods_img {
				width: 100%;
				height: 345rpx;
				border-radius: 10rpx 10rpx 0 0;
			}

			.every_goods_text1 {
				padding: 0 10rpx 0 10rpx;
				display: -webkit-box;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2; //显示两行
			}

			.every_goods_center {
				padding: 0 10rpx 0 10rpx;
				color: red;

				.every_goods_text2 {
					font-size: 30rpx;
					font-weight: bold;
				}

				.every_goods_text3 {
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}

			.every_goods_bottom {
				padding: 0 10rpx 0 10rpx;
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// justify-content: space-between;
				font-size: 22rpx;
				color: #5a5a5a;

				.every_goods_yue {
					padding: 3rpx 10rpx 3rpx 10rpx;
					border-radius: 10rpx;
					border: 1rpx solid #95822c;
				}

			}

			.triangle {
				position: absolute;
				margin-left: 60rpx;
				margin-top: 5rpx;
				background-color: #fff;
				width: 15rpx;
				height: 15rpx;
				border-left: 1rpx solid #95822c;
				border-top: 1rpx solid #95822c;
				transform: rotate(45deg);
			}
		}
	}

	// background-color: #5d5c5b;
	.bodys {
		position: fixed;
		right: 30rpx;
		top: 100rpx;
		z-index: 100;
	}

	.pops {
		background-color: #1f3140;
		width: 300rpx;
		height: 280rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.pops_triangle {

		position: absolute;
		margin-top: -6rpx;
		right: 20rpx;
		width: 15rpx;
		height: 15rpx;
		background-color: #1f3140;
		border-left: 1rpx solid #1f3140;
		border-top: 1rpx solid #1f3140;
		transform: rotate(45deg);
	}
</style>
