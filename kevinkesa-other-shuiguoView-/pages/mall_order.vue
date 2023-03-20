<template>
	<view>
		<view class="rectangle_1528xme">

			<view class="xiqsz">
				<view class="jhwdl" @click="mallList('all')">
					<view class="pending_payment_1511yp" :class="{active:nav=='all'}">全部</view>
				</view>
				<view class="jhwdl" @click="mallList('unPay')">
					<view class="pending_payment_1511yp" :class="{active:nav=='unPay'}">待付款</view>
				</view>
						<view class="jhwdl" @click="mallList('unSend')">
									<view class="pending_payment_1511yp" :class="{active:nav=='unSend'}">待自提</view>
						</view>
<!-- 				<view class="jhwdl" @click="mallList('unSend')">
					<view class="pending_payment_1511yp" :class="{active:nav=='unSend'}">待发货</view>
				</view>
				<view class="jhwdl" @click="mallList('Received')"> 
					<view class="pending_payment_1511yp" :class="{active:nav=='Received'}">待收货</view>
				</view> -->
				<view class="jhwdl" @click="mallList('finish')">
					<view class="pending_payment_1511yp" :class="{active:nav=='finish'}">已完成</view>
				</view>
			</view>
		</view>
		<view class="rectangle_1506lkw" v-for="(item,i) of List" :key="item.id" >
			<view class="bgpdo">
				<view class="order_number_1503sd">订单编号：{{item.order_sn}}</view>
				<view class="pending_payment">
					{{item.pay_state==2?item.order_state_text:item.pay_state_text}}{{item.shop_hand_state>0?"|"+item.shop_hand_state_text:''}}
				</view>
			</view>
			<view v-for="(items,j) of item.orderGoods" :key="items.id" @click='$gonext("/pages/shop/goods/product_details?id="+items.goods_id)'>
				<view class="uxhawj">
					<image :src="items.sku.length?items.sku.photo:items.goods.thumb_photo" class="qdhnr"></image>
					<view class="lwnpit">
						<view class="order_number_1503sd">{{items.goods_name}}</view>
						<view class="face_cream_ml_1480exd">{{items.suk_text}}</view>
						<view class="fdwar">
							<view class="imj1476ei">￥{{items.price}}</view>
							<view class="uov1472xd">x{{items.number}}</view>
						</view>
						<view class="order_number_1503sd" style="margin-top: 10rpx;">{{item.shop_info.name}}</view>
					</view>
				</view>
				<view class="rectangle_1468epi">
					
				</view>
			</view>
			<view class="rgfiyc">
				<view class="total_1497wc">合计：￥{{item.order_total}}</view>
			</view>
			<view v-if="item.pay_state==2 && item.order_state==0" style="position: absolute;right: 60rpx;margin-top: -40rpx;" @click.stop="hexiao(item.simple_sn)">
				<tki-qrcode
				  cid="qrcode2"
				  ref="qrcode2"
				  :val="item.simple_sn"
				  size="50"
				  :onval="onval"
				  :loadMake="loadMake"
				  :usingComponents="true"
				/>
			</view>
			<view class="lxdaro">
				<view class="rectangle_1461xoy" v-if="item.pay_state<2" @click.stop="overOrder(item.id)">
					<view class="cancel_order_1457kh">取消订单</view>
				</view>
				<view class="rectangle_1463ef"  v-if="item.pay_state<2">
					<view class="go_to_pay" @click='$gonext("/pagesA/more/order_details?id="+item.id)'>去支付</view>
				</view>
			</view>
			<view class="rectangle_1462reu" v-if="item.status==2" @click.stop="taskOrder(item.id)">
				<view class="go_to_pay">确认收货</view>
			</view>
			<!-- 			<view class="rectangle_1462reu" v-if="item.status==3" @click.stop="$gonext('product_details?id='+)">
				<view class="go_to_pay">再次购买</view>
			</view> -->
		</view>
		<u-popup v-model="show" mode="bottom" height="300px">
			<view class="rectangle_2858rwf">
				<view class="wuhil">
					<view class="add_address">支付方式</view>
					<view class="online_payment">在线支付</view>
				</view>
				<view class="rectangle_2823tv"></view>
				<view class="mwlok" @click="changeTab(1)">
					<view class="rdezn">
						<image v-if="pstt" :src="pstt+'resource_tcpxs1627003676292.png'" class="uzqoln"></image>
						<view class="alipay">支付宝</view>
					</view>
					<image v-if="nav2==1 && pstt" :src="pstt+'select_yes.png'" class="moeqjh"></image>
					<image v-if="nav2!=1 && pstt" :src="pstt+'select_no.png'" class="moeqjh"></image>
				</view>
				<view class="sydiu" @click="changeTab(0)">
					<view class="rdezn">
						<image v-if="pstt" :src="pstt+'wechatPayment.png'" class="uzqoln"></image>
						<view class="alipay">微信</view>
					</view>
					<image v-if="nav2==0 && pstt" :src="pstt+'select_yes.png'" class="moeqjh"></image>
					<image v-if="nav2!=0 && pstt" :src="pstt+'select_no.png'" class="moeqjh"></image>
				</view>
				<view class="nofspw" @click="changeTab(2)">
					<view class="rdezn">
						<image v-if="pstt" :src="pstt+'unionpay_zifqk1627003674545.png'" class="uzqoln"></image>
						<view class="alipay">银行卡</view>
					</view>
					<image v-if="nav2==2" :src="pstt+'select_yes.png'" class="moeqjh"></image>
					<image v-else :src="pstt+'select_no.png'" class="moeqjh"></image>
				</view>
			</view>
			<view class="btn" @click="sure">确定</view>
		</u-popup>
		<u-popup v-model="shows" mode="center" border-radius="15">
			<view style="padding: 20rpx;display: flex;flex-direction: column;align-items: center;">
				<tki-qrcode
				  cid="qrcode2"
				  ref="qrcode2"
				  :val="value"
				  size="400"
				  :onval="onval"
				  :loadMake="loadMake"
				  :usingComponents="true"
				/>
				<view style="margin-top: 10rpx;font-size: 44rpx;padding: 0 20rpx;border: 1rpx solid black;border-radius: 10rpx;">{{value}}</view>
			</view>
		</u-popup>
		<view class="ywasrn"></view>
		<view style="height: 120rpx;"></view>
		<tabbares :currentPage="3"></tabbares>
	</view>
</template>
<script>
	import tabbares from '@/components/shops.vue'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	export default {
		components: {
			tabbares,
			tkiQrcode
		},
		data() {
			return {
				nav: 'all',
				limit: 20,
				page: 1,
				List: [],
				order: '',
				show: false,
				nav2: '1',
				wHeight:'',
				shu:'' ,//页面层数
				pstt:'',
				img:[],
				unit: "rpx", // 单位
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				value:'',
				shows:false
			}
		},
		onLoad({type}) {
			this.pstt = this.hosts
			console.log(type)
			this.mallList(type)
			//防止刷新后不能返回-->将直接回首页
			var pages = getCurrentPages();
			this.shu = pages.length
		},
		mounted() {
			// #ifdef APP-PLUS
				this.wHeight = plus.navigator.getStatusbarHeight();
			// #endif
			
		},
		onShow() {
			// this.orderList()
			this.mallList(this.nav)
		},
		methods: {
			hexiao(e){
				this.shows = true
				console.log(e)
				this.value = e
			},
			mallList(type){
				console.log(type)
				this.nav = type
				this.List = []
				this.$u.api.orderList({
					type:this.nav,
					limit:this.limit,
					page:this.page
				}).then(res=>{
					this.List = res.data.data
					console.log('resmall_order',res)
				}).catch(err=>{
					console.log('resmall_ordererr',err)
				})
			},
			back(){
				if(this.shu>1){
					uni.navigateBack({})
				}else{
					uni.switchTab({
						url:'/pages/shop/index'
					})
				}
			},
			overOrder(id) {
				// this.$request("/index/shop/overOrder", "POST", {
				// 	orderid: id
				// }).then(res => {
				// 	if (res.code == 0) {
				// 		this.orderList()
				// 	}
				// })
				this.$u.api.cancelOrder({
					order_id:id
				}).then(res=>{
					console.log(res);
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.mallList()
				}).catch(err=>{
					uni.showToast({
						title:err.data.msg,
						icon:'none'
					})
					console.log(err,'errrs');
				})
			},
			taskOrder(id) {
				this.$request("/index/shop/taskOrder", "POST", {
					orderid: id
				}).then(res => {
					if (res.code == 0) {
						this.nav = 4
						this.orderList()
					}
				})
			},
			changeTab(u) {
				if (u == 2) {
					uni.showToast({
						title: '该支付方式暂不支持',
						icon: 'none'
					})
					setTimeout(() => {
						this.nav2 = 1
					}, 1000)
				} else {
					this.nav2 = u
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../css/mall_order.scss";
	.lxdaro{
		margin-top: -40rpx;
		display: flex;
	}
	.rectangle_1462reu{
		margin-top: -40rpx;
	}
</style>
