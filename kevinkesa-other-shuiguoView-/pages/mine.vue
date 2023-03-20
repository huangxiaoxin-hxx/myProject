<template>
	<view class="mine_body">
		<view :style="{height:wHeight+'px',position:'fixed',background:'#dff4ee',top:0,zIndex:'20',width:'100%'}"></view>
		<view :style="{height:wHeight+'px'}"></view>
		<view class="sehpx">
			<view class="dmpoxh">
				<view class="tpxbyk">
					<view class="fasgl">
						<img v-if='vuex_user.header' :src="vuex_user.header" class="avater"
							style="height: 116rpx;width: 116rpx;" mode="scaleToFill"></img>
							<view class="mineS" @click="$gonext('/pagesA/more/getVIP')" v-if="vuex_user.level">
								<image :src="'https://appapi.xiaozhuan.net.cn/static/mini/lvg.png'" class="tu_imgs"></image>
								<view class="ming_one_text">{{vuex_user.level}}</view>
							</view>
						
					</view>
				</view>
				<view class="tbwimd">
					<view class="i_am_sleeping">{{vuex_user.nick_name!=''?vuex_user.nick_name:vuex_user.user_name}}</view>
					
					<view class="id"><u-icon name="setting-fill" color="#000" size="40" label="设置中心" @click="$gonext('personSet/indexSet')"></u-icon></view>
					
				</view>
				<!-- <view class="ziywns" >
					<image @click="$gonext('personSet/indexSet')" v-if="pstt" :src="pstt+''"
						class="qvjic"></image>
						<u-icon name="setting-fill" color="#000" size="40" label="设置中心"></u-icon>
				</view> -->
			</view>

		</view>
		
		<view class="more_mine">
			<view class="more_top">
				<view class="more_top_common">
					<image class="top_imgs" v-if="pstt" :src="pstt+'img/index/collect.png'"></image>
					<text class="top_text">商品收藏 3</text>
				</view>
				<view class="more_top_common">
					<image class="top_imgs" v-if="pstt" :src="pstt+'img/index/shops.png'"></image>
					<text class="top_text">店铺关注 182</text>
				</view>
				<view class="more_top_common">
					<image class="top_imgs" v-if="pstt" :src="pstt+'img/index/time.png'" style="width: 33rpx;height: 33rpx;"></image>
					<text class="top_text">浏览记录 100</text>
				</view>
			</view>
			
			<view class="more_bottom">
				<view class="more_bottom_common" @click="$gonext('/pages/mall_order?type=unPay')">
					<u-icon label="待付款" size="50" name="coupon" label-pos="bottom" color="#333333" label-color="#333333" label-size="26" margin-top="15"></u-icon>
				</view>
				<view class="more_bottom_common" @click="$gonext('/pages/mall_order?type=unSend')">
					<u-icon label="待收货" size="50" name="gift" label-pos="bottom" color="#333333" label-color="#333333" label-size="26" margin-top="15"></u-icon>
				</view>
				<view class="more_bottom_common" @click="$gonext('/pages/mall_order?type=Received')">
					<u-icon label="待发货" size="50" name="car" label-pos="bottom" color="#6d493a" label-color="#333333" label-size="26" margin-top="15"></u-icon>
				</view>
				<view class="more_bottom_common" @click="$gonext('/pages/mall_order?type=finish')">
					<u-icon label="待评价" size="50" name="chat" label-pos="bottom" color="#333333" label-color="#333333" label-size="26" margin-top="15"></u-icon>
					<view class="right_num">1</view>
				</view>
				
				<view class="more_bottom_common" @click="$gonext('/pages/mall_order?type=all')">
					<u-icon label="我的订单" size="50" name="order" label-pos="bottom" color="red" label-size="26" label-color="#333333" margin-top="15"></u-icon>
					<text class="bottom_common_text">电子发票</text>
				</view>
			</view>
		</view>
		
		<view class="qianbao">
			<view class="qiaobao_centent">
				<view class="qianbao_common">
					<view class="qianbao_top">95</view>
					<text class="qianbao_center">京豆</text>
					<text class="qianbao_bottom">签到领京豆</text>
				</view>
			<view class="qianbao_common">
				<view class="qianbao_top">89</view>
				<text class="qianbao_center">优惠券</text>
				<text class="qianbao_bottom">下单立省</text>
			</view>
			<view class="qianbao_common">
				<view class="qianbao_top">60.00<text>元</text></view>
				<text class="qianbao_center">白条</text>
				<text class="qianbao_bottom">领无门槛券</text>
			</view>
			<view class="qianbao_common">
				<view class="qianbao_top">20.00<text>万</text></view>
				<text class="qianbao_center">京东金条</text>
				<text class="qianbao_bottom">急速到账</text>
			</view>
			<view class="qianbao_common">
				<view class="qianbao_top"><image class="qianbao_img" v-if="pstt" :src="pstt+'img/index/qianbao.png'"></image></view>
				<text class="qianbao_center">我的钱包</text>
				<text class="qianbao_bottom"></text>
			</view>
			</view>
			
		</view>
		
		<view class="tools">
			<view class="tools_title">常用工具</view>
			<view class="tools_center">
				<view class="tools_everys" v-for="(item,index) in getlist" :key="index" @click="select(index)">
					<view class="tools_everys_bg" :style="{backgroundColor: item.bg}">
						<image class="tools_everys_img" :style="{width:item.size+'rpx',height:item.size+'rpx'}" :src="item.img"></image>
					</view>
					<text class="tools_text" >{{item.text}}</text>
				</view>
			</view>
		</view>
		
		<view :style="{height:(60-wHeight)+'px',width: '100%'}"></view>
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
				img: '',
				userInfo: {},
				news_num: 0,
				level: [this.hosts+'v0.png', this.hosts+'v1.png', this.hosts+'v2.png', this.hosts+'v3.png', this.hosts+'v4.png',
					this.hosts+'v5.png'
				],
				show: false,
				pstt:'',
				wHeight:'',
				getlist:[{
					text:'出行',
					img:this.hosts + 'img/shopping/Go.png',
					bg:'#a52a2a',
					size:36,
					url:''
				},{
					text:'酒店',
					img:this.hosts + 'img/shopping/JiuDian.png',
					bg:'#ff7f50',
					size:36,
					url:''
				},
				{
					text:'景区',
					img:this.hosts + 'img/shopping/JingQu.png',
					bg:'#00008b',
					size:38,
					url:''
				},
				{
					text:'对接',
					img:this.hosts + 'group_1046ltf_trvyj1627003578571.png',
					bg:'#fc963e',
					size:72,
					url:''
				},
				{
					text:'合作商家',
					img:this.hosts + 'group_1037dg_wrzve1627003576167.png',
					bg:'#ff4a4b',
					size:72,
					url:''
				},
				{
					text:'充话费',
					img:this.hosts + 'img/shopping/HuaFei.png',
					bg:'#008b8b',
					size:42,
					url:''
				},
				{
					text:'水费',
					img:this.hosts + 'img/shopping/ShuiFei.png',
					bg:'#bdb76b',
					size:42,
					url:''
				},
				{
					text:'购买记录',
					img:this.hosts + 'img/index/zhangben.png',
					bg:'#ff0000',
					size:38,
					url:'/pages/mall_order'
				},
				{
					text:'我的团队',
					img:this.hosts + 'group_1050uso_jmuyg1627003579399.png',
					bg:'#fc9842',
					size:72,
					url:'/pagesA/more/my_team'
				},
				{
					text:'邀请好友',
					img:this.hosts + 'img/shopping/YaoQing.png',
					bg:'#696969',
					size:32,
					url:''
				},
				{
					text:'分享建议',
					img:this.hosts + 'img/shopping/Suggest.png',
					bg:'#1e90ff',
					size:32,
					url:'/pages/mineList/sharePropo'
				}]
			}
		},
		
		onLoad() {
			console.log(this.vuex_user)
			uni.getSystemInfo({success: (res) => {
				this.wHeight = res.statusBarHeight
			}})
			this.pstt = this.hosts
			
			// console.log(this.pstt,'taoge')
			// this.$request("/index/Member/information", "POST",{type:1,limit:15,page:1})
			// 	.then(res => {
			// 		if (res.code == 0) {
			// 			this.news_num = res.count.article+res.count.comment+res.count.like
			// 		}
			// 	})
		},
		onShow() {
			this.getinfo()
			uni.hideTabBar({
				animation: false
			})
			this.userIndex()
		},
		methods: {
			getinfo(){
				this.$u.api.getInfo().then(res=>{
					console.log(res,'个人信息')
					this.$u.vuex('vuex_user',res.data)
				}).catch(err=>{
					console.log(err)
				})
			},
			select(i){
				if(this.getlist[i].url==''){
					uni.showToast({
						icon:'none',
						title: '开发对接中，敬请期待....'
					})
				}else{
					uni.navigateTo({
						url:this.getlist[i].url
					})
				}
			},
			userIndex() {
				this.$u.api.usersIndex().then(res => {
					console.log(res)
					this.userInfo = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			go() {
				var ts = this
				// uni.navigateTo({
				// 	url: 'real_name_certification29'
				// })
				// 0未实名 1待审核 2已实名 3实名未通过
				if (this.vuex_user.auth_state == 0) {
					uni.navigateTo({
						url: 'real_name_certification29'
					})
				} else {
					// 成功或失败
					uni.navigateTo({
						url: 'real_name_certification42'
					})
				}
			},
			goInvvite() {
				if (this.userInfo.experience == 2) {
					uni.navigateTo({
						url: 'invite_friends'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先成为正式会员'
					});
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../css/mine.scss";
	*{
		-webkit-text-size-adjust:none;
	}

	.mine_body {
		background-color: #dff4ee;
		width: 100%;
		height: 100vh;
		.ziywns{
			z-index: 20;
		}
	}
	.tools{
		width: 710rpx;
		margin: 20rpx auto;
		padding: 20rpx;
		background-color: #fff;
		.tools_title{
			width: 100%;
			font-size: 32rpx;
		}
		.tools_center{
			width: 680rpx;
			margin: 20rpx auto;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			.tools_everys{
				margin-top: 20rpx;
				width: 170rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-bottom: 10rpx;
				.tools_everys_bg{
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					.tools_everys_img{
						width: 36rpx;
						height: 36rpx;
					}
				}
				.tools_text{
					font-size: 28rpx;
					margin-top: 10rpx;
				}
			}
		}
	}

	.tbwimd {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.rectangle_1108px {
		padding: 0;
		font-size: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(165, 165, 165);
		height: 120rpx;

	}

	.more_mine{
		width: 710rpx;
		height: 220rpx;
		margin: 20rpx auto;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.more_top{
			width: 670rpx;
			height: 60rpx;
			border-bottom: 1rpx solid #f0f0f0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.more_top_common{
				width: 200rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.top_imgs{
					width: 40rpx;
					height: 40rpx;
				}
				.top_text{
					font-size: 24rpx;
					margin-left: 7rpx;
				}
			}
		}
		.more_bottom{
			width: 670rpx;
			display: flex;
			justify-content: space-between;
			.more_bottom_common{
				margin-top: 22rpx;
				width: 134rpx;
				display: flex;
				// justify-content: center;
				flex-direction: column;
				align-items: center;
				.right_num{
					position: absolute;
					margin-top: 0;
					margin-left: 28rpx;
					background-color: red;
					width: 24rpx;
					height: 24rpx;
					border-radius: 20rpx 20rpx 20rpx 0;
					// font-size: ;
					font-size: 16rpx;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.bottom_common_text{
					margin-top: 8rpx;
					font-size: 20rpx;
					color: lightgray;
				}
			}
		}
	}
	.qianbao{
		width: 710rpx;
		height: 180rpx;
		margin: 20rpx auto;
		background-color: #fff;
		border-radius: 20rpx;
		.qiaobao_centent{
			width: 100%;
			height: 100%;
			padding-left: 20rpx;
			padding-right: 20rpx;
			display: flex;
			justify-content: space-between;
			.qianbao_common{
				width: 134rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				// justify-content: center;
				align-items: center;
				.qianbao_top{
					height: 55rpx;
					margin-top: 30rpx;
					font-size: 33rpx;
					font-weight: bold;
					.qianbao_img{
						width: 48rpx;
						height: 48rpx;
					}
					text{
						font-size: 18rpx;
						font-weight: normal;
					}
				}
				.qianbao_center{
					margin-top: 10rpx;
					font-size: 26rpx;
					color: #000000;
				}
				.qianbao_bottom{
					// margin-top: 10rpx;
					font-size: 20rpx;
					color: #ababab;
				}
			}
		}
	}
	.mineS{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		// background-color: #fff;
		display: flex;
		position: absolute;
		margin-top: -40rpx;
		margin-left: 60rpx;
		// justify-content: center;
		// align-items: center;
		.tu_imgs{
			width: 50rpx;
			height: 50rpx;
		}
		.ming_one_text{
			font-size: 26rpx;
			position: absolute;
			color: #f2ce65;
			margin: 20rpx 0 0 35rpx;
			
		}
	}
</style>
