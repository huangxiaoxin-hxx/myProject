<template>
	<view class="every_body">
		<view class="bodys_bg">
			<view class="top_tabbars" :style="{height:wHeight+'px'}"></view>
			<view class="top_back" @click="back">
				<u-icon name="arrow-left" color="#fff" size="50"></u-icon>
			</view>
			<view class="body_center">
				<view class="center_top">
					<view class="center_top_left">
						<image class="left_img" :src="vuex_user.header"></image>
					</view>
					<view class="center_top_right">
						<text class="right_title">{{vuex_user.nick_name}}</text>
						<view class="rights_level">
						<scroll-view class="scroll-view_H" scroll-x="true" >
							<view class="every_ones">
								<image class="every_ones_img" :src="'https://appapi.xiaozhuan.net.cn/static/mini/lvg.png'"></image>
								<view :class="'every_ones_num'">{{vuex_user.level}}</view>
							</view>
						</scroll-view>
						<view class="order_everys" @click="$gonext('/pagesA/more/VIPInfo')">查看订单</view>
						</view>
					</view>
				</view>
				<view class="centers" v-for="(item,index) in list" :key="index">
					<!-- <view class="centers_title">特权介绍</view> -->
					<view class="centers_content">
						<view class="VIP_top">
							<view class="VIP_top_left">
								<image class="every_ones_img" :src="num<=index?'https://appapi.xiaozhuan.net.cn/static/mini/lvl.png':'https://appapi.xiaozhuan.net.cn/static/mini/lvg.png'"></image>
								<view :class="num>index?'every_ones_num':'every_ones_nums'">{{item.level}}</view>
							</view>
							<view class="VIP_top_right">
								<view class="VIP_top_title">{{item.level_name}}</view>
								<view class="VIP_top_text">价格：{{item.price}}元</view>
							</view>
						</view>
						<view class="VIP_center">积分最高抵扣：{{item.rebate_ratio}}%           推荐返佣：{{item.reward_ratio}}%</view>
						<view class="VIP_btn" :style="num>index?'background-image: none;background-color: #c0c0c0;':''" @click="pay(item)">立即支付</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom">
					<pays v-if="show" :info="price"></pays>
		</u-popup>
	</view>
</template>

<script>
	import pays from '@/pages/components/paysorder.vue'
	export default {
		components:{
			pays
		},
		data() {
			return {
				wHeight: '',
				num:7,
				list:[],
				isShow:false,
				show:false,
				price:''
			}
		},
		onLoad() {
			
			console.log(this.vuex_user, 'look')
			uni.getSystemInfo({
				success: (res) => {
					console.log('taoge', res.statusBarHeight)
					this.wHeight = res.statusBarHeight
				},
				fail: (err) => {
					console.log(err)
				}
			})
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#ffffff'
			})
		},
		onShow() {
			this.num = this.vuex_user.level
			this.getList()
		},
		methods: {
			pay(item){
				if(item.level<=this.vuex_user.level){
					uni.showToast({
						icon:'none',
						title:'您已购买此等级，请忽多次购买'
					})
					return
				}
				this.price = item
				this.show = true
			},
			
			getList(){
				this.$u.api.VIPlist().then(res=>{
					console.log(res,"vip")
					this.list = res.data
				}).catch(err=>{
					console.log(err)
				})
			},
			back(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.every_body {
		width: 100%;
		min-height: 100vh;

		.bodys_bg {
			width: 100%;
			height: auto;
			background-image: linear-gradient(to right, #2ac6f6, #3663ff);

			.top_tabbars {
				width: 100%;
			}

			.top_back {
				padding: 20rpx 0 0 20rpx;
			}

			.body_center {
				width: 100%;
				margin-top: 40rpx;
				border-radius: 50px 0 0 0;
				background-color: #fff;
				// height: 500rpx;
				padding: 30rpx 30rpx 20rpx 30rpx;

				.center_top {
					width: 100%;
					height: 120rpx;
					display: flex;
					align-items: center;
					// justify-content: sp;
					.center_top_left {

						.left_img {
							border-radius: 50%;
							width: 120rpx;
							height: 120rpx;
						}
					}

					.center_top_right {
						margin-top: 10rpx;
						margin-left: 20rpx;
						width: 100%;
						height: 100%;
						.right_title {
							font-size: 30rpx;
						}

						.rights_level {
							margin-top: 20rpx;
							display: flex;
							align-items: center;
							width: auto;
							.scroll-view_H {
									white-space: nowrap;
									width: 520rpx;
									.every_ones{
										width: 50rpx;
										height: 50rpx;
										// background-color: #90a4ae;
										margin-right: 15rpx;
										display: inline-block;
										.every_ones_img{
											width: 40rpx;
											height: 40rpx;
										}
										.every_ones_num{
											position: absolute;
											margin-top: -34rpx;
											margin-left: 26rpx;
											z-index: 7;
											font-size: 24rpx;
											color: #f2ce65;
										}
										.every_ones_nums{
											position: absolute;
											margin-top: -34rpx;
											margin-left: 26rpx;
											z-index: 7;
											font-size: 24rpx;
											color: #707070;
										}
									}
									
								}
								.order_everys{
										position: absolute;
										right: 40rpx;
										color: #2cb8f8;
									}
						}
					}
				}

				.centers {
					margin-top: 30rpx;
					.centers_title {
						font-size: 32rpx;
					}

					.centers_content {
						margin-top: 30rpx;
						width: 100%;
						box-shadow: 0 7rpx 18rpx #c0c0c0;
						padding: 20rpx;
						border-radius: 15rpx;
						.VIP_top{
							height: 100rpx;
							display: flex;
							align-items: center;
							.VIP_top_left{
								width: 100rpx;
								height: 100rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								// background-color: red;
								.every_ones_img{
									width: 80rpx;
									height: 80rpx;
								}
								.every_ones_num{
									position: absolute;
									margin-top: 40rpx;
									margin-left: 40rpx;
									z-index: 7;
									font-size: 33rpx;
									color: #f2ce65;
								}
								.every_ones_nums{
									position: absolute;
									margin-top: 40rpx;
									margin-left: 40rpx;
									z-index: 7;
									font-size: 33rpx;
									color: #707070;
								}
							}
							.VIP_top_right{
								margin-left: 10rpx;
								.VIP_top_title{
									font-size: 32rpx;
									font-weight: bold;
									
								}
								.VIP_top_text{
									margin-top: 10rpx;
									font-size: 24rpx;
									color: #a4a2a8;
								}
							}
						}
						.VIP_center{
							margin-top: 20rpx;
							width: 100%;
							font-size: 24rpx;
							color: #a4a2a8;
						}
						.VIP_btn{
							margin-top: 20rpx;
							width: 100%;
							height: 80rpx;
							background-image: linear-gradient(to right, #f9dfa1, #fcc155);
							border-radius: 14rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #9a560d;
							font-size: 32rpx;
						}
					}
				}
			}
		}

	}
</style>
