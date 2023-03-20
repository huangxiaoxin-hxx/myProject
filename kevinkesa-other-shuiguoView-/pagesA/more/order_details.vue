<template>
	<view>
		
		<!-- 状态栏高度 -->
		<view :style="'height:'+wHeight+'rpx;width:100%;background: linear-gradient(90deg, rgb(255, 71, 77), rgb(254, 136, 58));'"></view>
		<view class="mihtn"></view>
		<view class="rectangle_1586bid">
			<image v-if="pstt" :src="pstt+'return_igscp1627003662191.png'" class="bipywc" @click="back"></image>
			<view class="order_details">订单详情</view>
		</view>
		<view class="rectangle_1570sq">
			<view class="to_be_delivered">{{info.pay_state_text}}</view>
			<view class="rectangle_1565yk"></view>
			<view class="oyamf">
				<image v-if="pstt" :src="pstt+'resource_fhkwb1627003661321.png'" class="awrghi"></image>
				<view class="bytdp" v-if="info.adress">
					<view class="wooden_wood">{{info.address.name}}{{info.address.mobile.slice(0,3)}}****{{info.address.mobile.slice(-4)}}</view>
					<view class="block_a_guangfa">{{info.address.province}}{{info.address.city}}{{info.address.area}}{{info.address.address}}</view>
				</view>
				<view class="ziti" v-else>自提</view>
			</view>
		</view>
		<view class="rectangle_1564ejh">
			<view class="ejwbgu"  v-for="(item,i) of info.orderGoods" :key="i">
				<image :src="item.sku.length?item.sku.photo:item.goods.thumb_photo" class="xobruk"></image>
				<view class="enwcyq">
					<view class="estee_lan_division">{{item.goods_name}}</view>
					<view class="face_cream_ml_1541qo">{{item.sku.suk}}</view>
					<view class="jislza">
						<view class="ob1539zh">￥{{item.price}}</view>
						<view class="tx1537xp">x{{item.number}}</view>
					</view>
				</view>
			</view>
			<view class="rectangle_1535ha"></view>
			<view class="wmjpbz">
				<view class="new_beauty_smart">实际付款</view>
				<view class="etu1542yv">￥{{info.order_total}}</view>
			</view>
			<view class="wmjpbz">
				<view class="new_beauty_smart">店铺名称</view>
				<view class="etu1542yv" style="color: black;">{{info.shop_info.name}}</view>
			</view>

			<view class="wmjpbz">
				<view class="new_beauty_smart">电话</view>
				<view class="etu1542yv" style="color: black;">{{info.shop_info.mobile}}</view>
			</view>
			<view class="wmjpbz">
				<view class="new_beauty_smart">联系人</view>
				<view class="etu1542yv" style="color: black;">{{info.shop_info.true_name}}</view>
			</view>
			
			<view class="wmjpbz">
				<view class="new_beauty_smart">店铺地址</view>
				<view style="display: flex;align-items: center;" @click="goaddresss(info.shop_info.extend.lat,info.shop_info.extend.lng)">
					<view class="etu1542yv" style="color: #4099e0;width: 350rpx;display:-webkit-box;
					overflow:hidden;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:1;" >
									{{info.shop_info.extend.address}}
									</view>
									<u-icon name="arrow-right" size="22" color="#4099e0"></u-icon>
				</view>
			</view>
			
		</view>
		<view class="rectangle_1564ejh">
			<view class="order_informatio">订单信息</view>
			<view class="swtqz">
				<view class="order_number">订单编号</view>
				<view class="kwq1550cly">{{info.order_sn}}</view>
				<view class="copy_1556de" @click="$copy(info.order_sn)">复制</view>
			</view>
			<view class="tfunby" v-if="info.pay_type">
				<view class="new_beauty_smart">交易方式</view>
				<view class="alipay">{{info.pay_type==1?'微信':(info.pay_type==2?'支付宝':'银行卡')}}</view>
			</view>
			<!-- <view class="tfunby" v-if="info.expressname">
				<view class="new_beauty_smart">快递公司</view>
				<view class="alipay">{{info.expressname}}</view>
			</view> -->
			<view class="nzvpw" v-if="info.expressnumber">
				<view class="order_number">快递单号</view>
				<view class="kwq1550cly">{{info.expressnumber}}</view>
				<view class="copy_1556de" @click="$copy(info.expressnumber)">复制</view>
			</view>
			<view class="owgpz">
				<view class="new_beauty_smart">创建时间</view>
				<view class="alipay">{{info.update_time}}</view>
			</view>
			<view class="owgpz" v-if="info.status==2||info.status==3">
				<view class="new_beauty_smart">发货时间</view>
				<view class="alipay">{{info.sendtime}}</view>
			</view>
		</view>
		<view class="order_btns" v-if="info.pay_state<2" @click="submitOrder">支付</view>
		<u-popup v-model="show" mode="bottom" border-radius="14" height="500" >
				<paysorders v-if="show" :infos="info"></paysorders>
		</u-popup>
		<view style="height: 240rpx;"></view>
<!-- 		<view class="rectangle_1532cfl">
			<view class="rectangle">
				<view class="cancel_order">取消订单</view>
			</view>
		</view> -->
		
	</view>
</template>
<script>
	import paysorders from '@/pages/components/paysorder.vue'
	export default {
		data() {
			return {
        info:null,
				wHeight:'',
				id:null,
				show:false,
				pstt:''
			}
		},
		components:{
			paysorders
		},
		onLoad(op) {
			this.pstt = this.hosts
			this.id = op.id
			this.getInfo(this.id)
		},
		mounted() {
			// #ifdef APP-PLUS
				this.wHeight = plus.navigator.getStatusbarHeight()*2;
			// #endif
			//#ifdef MP-WEIXIN
			this.wHeight = 60
			//#endif
		},
		onShow() {

		},
		methods: {
			goaddresss(lat,lng){
				console.log(lat,lng)
				uni.openLocation({
							latitude: parseFloat(lat),
							longitude: parseFloat(lng),
							name:this.info.shop_info.name,
							success: ()=> {
								console.log('success');
							}
						});
			},
			submitOrder(){
					this.$u.api.createOrders({
						order_sn:this.info.order_sn
					}).then(res=>{
						console.log(res)
						uni.requestPayment({
							provider: 'wxpay',
							appId:res.data.appid,
							mch_id:res.data.mch_id,
							timeStamp: res.data.timeStamp + '',
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: 'MD5',
							paySign: res.data.paySign,
							orderInfo:"支付订单",
							success: (wxres) => {
								console.log(wxres);
								//支付之后，跳转到置顶栏目
								uni.switchTab({
									url: 'pages/mine?type=all'
								})
							},
							fail:(err)=> {
								console.log('fail:' + JSON.stringify(err));								
								this.tui.toast('支付失败，请重试一次吧')
							},
							complete:(err)=> {
								console.log('complete:' + JSON.stringify(err));								
							}
						});
					}).catch(err=>{
						console.log(err)
						uni.showToast({
							icon:'none',
							title:err.data.msg
						})
					})
				
			},
			getInfo(id){
				this.$u.api.orderInfo({
					id:id
				}).then(res=>{
					this.info=res.data
					console.log(res)
				}).catch(err=>{
					console.log(err)
					this.$tips(err.data.msg)
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
	@import "@/css/order_details.scss";
	.order_btns{
		left: 30rpx;
		width: 690rpx;
		height: 100rpx;
		border-radius: 15rpx;
		// margin-top: 50rpx;
		position: fixed;
		bottom: 120rpx;
		font-size: 36rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: bold;
		background: linear-gradient(90deg, rgb(255, 71, 77), rgb(254, 136, 58));
	}
	.ziti{
		margin-left: 20rpx;
		height: 100%;
		font-size: 32rpx;
		font-weight: bold;
	}
</style>
