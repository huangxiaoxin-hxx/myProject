<template>
	<view style="min-height: 100vh;background-color: #f8f8f8;">
		<view class="my_top">
			<view class="my_top_centent">
				<view class="my_top_header">
					<image class="my_top_img" :src="vuex_user.header"></image>
					<view class="my_top_right">
						<view class="my_top_text">{{vuex_user.nick_name}}<text class="my_VIP"
								v-if="vuex_user.level">VIP{{vuex_user.level}}</text></view>
						<view class="my_top_btn" @click="$gonext('/pages/log_in')" v-if="!vuex_user.id">立即登录</view>
						<view class="my_top_btns" v-else>
							<!-- 用户ID:{{vuex_user.id}}<view class="my_top_fuzhi" @click="copy()">复制</view> -->
							{{vuex_user.mobile}}
						</view>
						<view class="settings" @click="$gonext('/pagesA/setting/personal_setting')">
							<u-icon name="setting-fill" size="50" color="#fff"></u-icon>
						</view>
					</view>
				</view>
				<view
					style="position: absolute;margin-top: -30rpx;width: 100%;text-align: center;color: #fff;font-size: 32rpx;">
					{{vuex_user.countdownMsg}}</view>
				<view class="my_top_VIP">
					<view class="my_top_VIPs">
						<view style="height: 100%;display: flex;align-items: center;">
							<image class="my_top_VIP_img" :src="'https://appapi.xiaozhuan.net.cn/static/mini/lvg.png'">
							</image>
							<text class="my_top_VIP_text">领取会员卡，各种优惠享不停</text>
						</view>
						<view class="my_top_btn" @click="$gonext('/pagesA/more/getVIP')">
							<u-icon name="play-right-fill" color="#000" label="立即领取" size="16" label-size="20"
								label-color="#000" label-pos="left"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my_content">
			<view class="my_contents" @click="$gonext('/pagesA/more/payRecord')">
				<view class="my_contents_text1">{{vuex_user.asset.user_money?vuex_user.asset.user_money:'***'}}</view>
				<view class="my_contents_text2">余额</view>
			</view>
			<view class="my_contents" @click="$gonext('/pagesA/more/Collection')">
				<view class="my_contents_text1">{{vuex_user.other_total.collect_num}}</view>
				<view class="my_contents_text2">收藏</view>
			</view>
		</view>
		<view class="my_tools">
			<view class="my_tools_title">服务功能</view>
			<view class="my_tools_contents">
				<view class="my_tools_every" @click="go(item,index)" v-for="(item,index) of tools" :key="index"
					v-if="index<4">
					<image class="my_tools_img" :src="item.img"></image>
					<text class="my_tools_text">{{item.text}}</text>
				</view>
			</view>
		</view>


		<view class="my_tools" style="margin-top: 20rpx;">
			<view class="my_tools_title">商家功能</view>
			<view class="my_tools_contents">
				<view class="my_tools_every" @click="go(itemst)" v-if="vuex_user.is_shop_user==1">
					<image class="my_tools_img" :src="itemst.img"></image>
					<text class="my_tools_text">{{itemst.text}}</text>
				</view>
				<view class="my_tools_every" @click="go(iteme)" v-if="vuex_user.is_shop_user!=1">
					<image class="my_tools_img" :src="iteme.img"></image>
					<text class="my_tools_text">{{iteme.text}}</text>
				</view>
				<view class="my_tools_every" @click="go(itemez)" v-else>
					<image class="my_tools_img" :src="itemez.img"></image>
					<text class="my_tools_text">{{itemez.text}}</text>
				</view>
				<view class="my_tools_every" v-for="(item,index) of itemeD" @click="go(item)" v-if="vuex_user.is_shop_user==1">
					<image class="my_tools_img" :src="item.img"></image>
					<text class="my_tools_text">{{item.text}}</text>
				</view>
			</view>
		</view>


		<view class="my_bottom">
			<view class="my_bottom_common" v-for="(item,index) of bottom" :key="index" @click="gos(item,index)">
				<view class="my_bottom_left">
					<image class="my_bottom_img" :src="item.img"></image>
					<text class="my_bottom_text">{{item.text}}</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<tabbares :currentPage="4"></tabbares>
	</view>
</template>

<script>
	import tabbares from '@/components/shops.vue'
	export default {
		components: {
			tabbares
		},
		data() {
			return {
				tools: [{
						img: this.hosts + 'img/index/address.png',
						text: '我的团队',
						url: '/pagesA/more/my_team'
					},
					{
						img: this.hosts + 'img/index/icons_cart.png',
						text: '我的订单',
						url: '/pages/mall_order'
					},
					{
						img: this.hosts + 'img/index/coupon.png',
						text: '分销红利',
						url: '/pagesA/more/bonus'
					},
					{
						img: this.hosts + 'img/index/kefu.png',
						text: '联系客服',
						url: '/pagesA/more/online_service'
					}



				],
				itemst: {
					img: this.hosts + 'img/index/hexiao.png',
					text: '订单核销',
					url: '/pagesA/more/hexiao'
				},
				iteme: {
					img: this.hosts + 'img/index/fuwu.png',
					text: '商家申请',
					url: '/pagesA/more/shenqing'
				},
				itemez: {
					img: this.hosts + 'img/index/xiugais.png',
					text: '商家编辑',
					url: '/pagesA/more/shopEdit'
				},
				itemeD: [{
					img: '/static/img/tabbar/a_icon2.png',
					text: '商家订单',
					url: '/pagesA/more/orderShop'
				},
				{
					img: '/static/img/tabbar/a_icon2.png',
					text: '数据统计',
					url: '/pagesA/more/statistics'
				},
				{
					img: this.hosts +'img/shopping/upGoods.png',
					text: '产品操作',
					url: '/pagesA/more/goodsSet'
				}],
				bottom: [{
						img: this.hosts + 'img/index/rili.png',
						text: '关于我们',
						url: '/pagesA/more/about'
					},
					{
						img: this.hosts + 'img/index/gantan.png',
						text: '帮助中心',
						url: '/pagesA/more/help_Center'
					},
					{
						img: this.hosts + 'img/index/coop.png',
						text: '商务合作',
						url: '/pagesA/more/online_service'
					}
				],
				pstt: ''
			}
		},
		onLoad() {
			this.pstt = this.hosts
		},
		onShow() {
			if (this.vuex_user.id) {
				this.getinfo()
			}
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: JSON.stringify(this.vuex_user.id),
					success: function() {
						console.log('复制成功');
					}
				});
			},
			gos(item, index) {
				uni.navigateTo({
					url: item.url
				})
			},
			go(item, index) {
				if (item.url == '') {
					uni.showToast({
						icon: 'none',
						title: '敬请期待'
					})
					return
				}
				if (index == 1) {
					uni.switchTab({
						url: item.url
					})
					return
				}
				uni.navigateTo({
					url: item.url
				})
			},
			getOut() {
				uni.setStorageSync('id', '')
				this.$u.vuex('vuex_user', '')
				this.$u.vuex('vuex_token', '')
			},
			getinfo() {
				this.$u.api.getInfo().then(res => {
					console.log(res, '个人信息')
					this.$u.vuex('vuex_user', res.data)
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.my_top {
		width: 160%;
		height: 300rpx;
		background: linear-gradient(to right, #eadcc3, #e3ba86);
		margin-left: -30%;
		border-radius: 0 0 40% 40%;
		overflow: hidden;

		.my_top_centent {
			width: 750rpx;
			margin: auto;

			.my_top_header {
				height: 200rpx;
				width: 100%;
				padding: 0 30rpx;
				display: flex;
				align-items: center;

				.my_top_img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					background-color: #fff;
				}

				.my_top_right {
					margin-left: 30rpx;
					height: 120rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.my_top_text {
						font-size: 32rpx;

						.my_VIP {
							margin-left: 20rpx;
							color: #fff;
						}
					}

					.my_top_btn {
						width: 120rpx;
						height: 40rpx;
						border: 1rpx solid #fff;
						color: #fff;
						font-size: 22rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 30rpx;
					}

					.my_top_btns {
						display: flex;
						align-items: center;
						font-size: 26rpx;
						color: #fff;

						.my_top_fuzhi {
							margin-left: 10rpx;
							font-size: 20rpx;
							padding: 2rpx 8rpx;
							border: 1rpx solid #fff;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					.settings {
						position: absolute;
						right: 30rpx;
					}
				}


			}

			.my_top_VIP {
				position: relative;
				bottom: -20rpx;
				width: 690rpx;
				margin: auto;
				height: 100rpx;
				border-radius: 25rpx 25rpx 0 0;
				background-color: #2f2f2f;
				padding: 20rpx 20rpx 0 20rpx;
				display: flex;
				align-items: flex-start;

				.my_top_VIPs {
					width: 100%;
					height: 40rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.my_top_VIP_img {
						width: 30rpx;
						height: 30rpx;
					}

					.my_top_VIP_text {
						color: #fff;
						font-size: 22rpx;
						margin-left: 15rpx;
					}

					.my_top_btn {
						width: 130rpx;
						height: 40rpx;
						border-radius: 30rpx;
						background-color: #ffedae;
						display: flex;
						justify-content: center;
						align-items: center;

					}

				}

			}
		}
	}

	.my_content {
		width: 690rpx;
		height: 200rpx;
		margin: 20rpx auto;
		background-color: #fff;
		border-radius: 10rpx;
		display: flex;
		align-items: center;

		.my_contents {
			width: 50%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.my_contents_text1 {
				font-size: 30rpx;
				font-weight: bold;
			}

			.my_contents_text2 {
				margin-top: 15rpx;
				font-size: 24rpx;
			}
		}
	}

	.my_tools {
		width: 690rpx;
		height: auto;
		margin: auto;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx;

		.my_tools_title {
			font-size: 30rpx;
			font-weight: bold;
		}

		.my_tools_contents {
			width: 650rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.my_tools_every {
				margin-top: 30rpx;
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;

				// height: ;
				.my_tools_img {
					width: 40rpx;
					height: 40rpx;
				}

				.my_tools_text {
					margin-top: 10rpx;
					font-size: 22rpx;
				}
			}
		}
	}

	.my_bottom {
		width: 690rpx;
		margin: 20rpx auto;
		border-radius: 10rpx;
		background-color: #fff;
		padding: 20rpx;

		.my_bottom_common {
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.my_bottom_left {
				display: flex;
				align-items: center;

				.my_bottom_img {
					width: 40rpx;
					height: 40rpx;
				}

				.my_bottom_text {
					font-size: 24rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
