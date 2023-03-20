<template>
	<view>
<!-- 		<view class="otyewg" v-if="!order">
			<image v-if="pstt" :src="pstt+'group_2854rno_klvnp1627004015057.png'" alt=""
				style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;"></image>
			<view class="group_2855hc"></view>
			<view class="wcuzeh" @click="$gonext('../../add_address?chooseId=1')">
				<view class="add_address">添加地址</view>
				<image v-if="pstt" :src="pstt+'resource_xamlo1627003959817.png'" class="senbw"></image>
			</view>
		</view>
		<view class="otyewg" v-else @click="$gonext('../../shipping_addres?chooseId=1')">
			<image v-if="pstt" :src="pstt+'group_2854rno_klvnp1627004015057.png'" alt=""
				style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;"></image>
			<view class="group_2855hc"></view>
			<view class="yvsaf">
				<view class="rdezn">
					<view class="rectangle_mr">
						<view class="default">默认</view>
					</view>
					<view class="wooden_wood">{{order.name}}</view>
					<view class="gf2877re">{{order.mobile}}</view>
				</view>
				<image v-if="pstt" :src="pstt+'resource_xamlo1627003959817.png'	" class="moeqjh"></image>
			</view>
			<view class="room_a_guangfa_bank">
				{{order.province}}{{order.city}}{{order.district}}{{order.address}}
			</view>
		</view> -->
		<view class="rectangle_2858rwf">
			<view class="oeatd" v-for="(item,i) of goodsList">
				<view class="sjfgpi">
					<image :src="item.sku?item.sku.photo:item.goods.thumb_photo" class="ctzga"></image>
					<view class="joaigu">
						<view class="estee_lan_division">{{item.goods.name}}</view>
						<view class="face_cream_ml_2843ef" v-if="item.sku">{{item.sku.suk}}</view>
						<view class="skmlv">
							<view class="ujn2841uf">￥{{item.sku?item.sku.price:item.goods.price}}</view>
							<view class="cdf2839jky">
								<view class="numbers" style="border-right: 0;" @click="reduce(item,i)">
									<u-icon name="minus" size="28"></u-icon>
								</view>
								
								<view class="numbers">{{item.number}}</view>
								<view class="numbers" style="border-left: 0;" @click="add(item,i)">
									<u-icon name="plus" size="28"></u-icon>
								</view>
								
								
							</view>
						</view>
					</view>
				</view>
				<view class="rectangle_2837nzt"></view>
			</view>
		</view>
		<view class="rectangle_2858rwf">
			<view class="vtwdo">
				<view class="add_address">商品总价</view>
				<view class="add_address">￥{{total}}</view>
			</view>
<!-- 			<view class="jvywgt">
				<view class="add_address">运费</view>
				<view class="add_address">￥0</view>
			</view> -->
			<view class="rectangle_2837nzt"></view>
			<view class="vtwdo">
				<view class="add_address">实付款</view>
				<view class="jsi2826hb">￥{{total-price}}</view>
			</view>
			<view class="vtwdo">
				<view class="add_address">配送方式</view>
				<view class="add_address">到店自提</view>
			</view>
		</view>
		<view class="rectangle_2858rwf">
			<view class="wuhil">
				<view class="add_address">支付方式</view>
				<view class="online_payment">在线支付</view>
			</view>
			<view class="rectangle_2823tv"></view>
<!-- 			<view class="mwlok" @click="tab(1)" v-if="list[0].goods.shop_id!=1">
				<view class="rdezn">
					<image v-if="pstt" :src="pstt+'resource_tcpxs1627003676292.png'" class="uzqoln"></image>
					<view class="alipay">支付宝</view>
				</view>
				<image v-if="nav==1" :src="pstt+'select_yes.png'" class="moeqjh"></image>
				<image v-else  :src="pstt+'select_no.png'" class="moeqjh"></image>
			</view>
			<view class="sydiu" @click="tab(0)" v-if="list[0].goods.shop_id!=1">
				<view class="rdezn">
					<image v-if="pstt" :src="pstt+'wechatPayment.png'" class="uzqoln"></image>
					<view class="alipay">微信</view>
				</view>
				<image v-if="nav==0" :src="pstt+'select_yes.png'" class="moeqjh"></image>
				<image v-else :src="pstt+'select_no.png'" class="moeqjh"></image>
			</view> -->
			<view class="nofspw" @click="tab(2)">
				<view class="rdezn" style="display: flex;align-items: center;">
					<u-icon label="积分"  size="30" name="rmb-circle-fill" color="#ff8e24"></u-icon>
					<view class="alipay" style="font-size: 28rpx;color:#606266;margin-top: -2rpx;">{{vuex_user.asset.user_money?vuex_user.asset.user_money:0}}</view>
				</view>
				<image v-if="isShow" :src="pstt+'select_yes.png'" class="moeqjh"></image>
				<image v-else :src="pstt+'select_no.png'" class="moeqjh"></image>
			</view>
		</view>
		<view class="tqkal"></view>
		<br><br><br>
		<view class="rectangle_2822rnt">
			<view class="rvcwhu">
				<view class="rdezn">
					<!-- <view class="estee_lan_division">实付:</view> -->
					<view class="pw2820tn">{{'￥'+(total-price)}}</view>
				</view>
				<view class="rectangle" @click="submitOrder">
					<view class="submit_orders">立即购买</view>
				</view>
				<!-- 支付成功 -->
				<!-- <view class="rectangle" @click="$gonext('pay_failure')">
					<view class="submit_orders">立即购买</view>
				</view> -->
				<!-- 支付失败 -->
				<!-- <view class="rectangle"	@click="$gonext('payment_successfu')">
					<view class="submit_orders">提交订单</view>
				</view> -->
			</view>
		</view>
		
		<view style="height: 150rpx;"></view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				defaultShow: false,
				nav: 1,
				order: {},
				goods_data: '',
				list: [],
				goodsList:[],
				wHeight:'',
				total:'',
				number:1,
				info:{},
				pstt:'',
				isShow:false,
				id:0
				
			}
		},
		onLoad(op) {
			this.pstt = this.hosts
			this.getLIst()
			this.id = op.id
			// this.getList()
			this.getLists(op.id)
			this.getInfo()
			// console.log('kande',op)
			// if (op.addressID) {
			// 	uqu(op.addressID)
			// }else{
			// 	this.huoqu()
			// }
		},
		onShow() {
			
			var address = uni.getStorageSync('addressIDs')
			this.getLIst(true)
			console.log('address',address)
			if(address !=null && address !=''){
				// this.huoqu(address)
			}
		},
		computed:{
			price(){
				if(!this.isShow){
					return 0
				}
				var prs = this.total - this.vuex_user.asset.user_money
				if(prs>=0){
					
					return this.vuex_user.asset.user_money
					
				}else{
					return this.total
				}
				
			}
		},
		mounted() {
			// #ifdef APP-PLUS
				this.wHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		methods: {
			getInfo(){
				this.$u.api.asset().then(res=>{
					console.log('kanjianwo',res)
					this.info = {...res.data}
				}).catch(err=>{
					console.log(err)
				})
			},
			getLists(id) {
				this.$u.api.cartList({
					shop_id:this.id,
					from_type:0
				}).then(res=>{
					console.log(res,'res')
					// this.list = res.data.goods
					this.goodsList = []
					this.total = 0
					res.data.goods.filter(item=>{
						
						console.log('kanbujianwoma',item)
						if(item.is_check_bool){
							this.goodsList.push(item)
							var a = item.sku?item.sku.price * item.sku.number:item.number * item.goods.price
							
							this.total += Number(100 * a / 100)
							
						}
					})
				}).catch(err=>{
					console.log(err)
					this.$tips(err.data.msg)
				})
			},
			cartUpdate(item,i){
				console.log(item)
				this.$u.api.cartUpdate({
					cart_id:item.id,
					is_check:1,
					number:i
				}).then(res=>{
					console.log(res)
					this.getLists()
				}).catch(err=>{
					console.log(err.data.msg)
					// this.$tips(err.data.msg)
				})
			},
			//减少
			reduce(item,index){
				if(item.number<=1){
					this.$tips('不能再减少了~~')
					return
				}
				this.goodsList[index].number --
				this.cartUpdate(item,this.goodsList[index].number)
			},
			//增加
			add(item,index){
				// if(this.number==this.list[0].goods.number){
				// 	this.$tips('已达最大库存数量')
				// 	return
				// }
				this.goodsList[index].number ++
				this.cartUpdate(item,this.goodsList[index].number)
			},
			submitOrder(){
				console.log(uni.getStorageSync('id'),'lookzhege')			// if(this.isShow && this.vuex_user.asset.user_money<this.total){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'您的余额不足，请充值'
				// 	})
				// 	return
				// }
					this.$u.api.createOrder({
						delivery_type:1,
						mobile:this.vuex_user.mobile,
						address_id:this.order.id,
						shop_id:this.id,
						use_points:this.isShow?1:0
				}).then(res=>{
					console.log('kan',res)
					if(res.data.pay_state){
						uni.showToast({
							icon:"none",
							title:'积分抵扣完了'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/mall_order'
							})
						},1500)
						return
					}
					// this.$tips(res.msg)
					this.$u.api.createOrders({
						order_sn:res.data.order_sn
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
								console.log(wxres,'wanchengle');
								//支付之后，跳转到置顶栏目
								uni.switchTab({
									url:'/pages/mall_order'
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
						console.log(err,'createOrders')
						uni.showToast({
							icon:'none',
							title:err.msg
						})
					})
				}).catch(err=>{
					console.log(err)
					this.$tips(err.data.msg)
				})
			},
			back(){
				uni.navigateBack({
				})
			},
			getList() {
				this.$u.api.cartList({
					from_type:0
				}).then(res=>{
					console.log(res)
		
					
					console.log(this.total)
				}).catch(err=>{
					console.log(err)
					this.$tips(err.data.msg)
				})
			},
			tab(u) {
				this.isShow = !this.isShow
				// if (u == 2) {
				// 	uni.showToast({
				// 		title: '该支付方式暂不支持',
				// 		icon: 'none'
				// 	})
					// setTimeout(() => {
					// 	this.nav = 1
					// }, 1000)
				// } else {
					this.nav = u
				// }
			},
			getLIst(type) {
				this.$u.api.addressList().then(res=>{
					console.log('HHY',res)
					if(res.data.length==0){
						this.order = ''
						return
					}
					if(res.data.length==1){
						this.order = res.data[0]
						console.log(this.order)
						return
					}
					// uni.setStorageSync('addressIDs','')
					
					res.data.filter((item)=>{
						console.log('kanni',item)
						
							if(item.is_default){
								this.order = item
						}
						if(uni.getStorageSync('addressIDs')!=''){
								if(item.id == uni.getStorageSync('addressIDs')){
									this.order = item
								}
								return
							}
						
					})
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/css/submit_an_order.scss";
	.estee_lan_division{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.cdf2839jky{
		display: flex;
		align-items: center;
		.numbers{
			width: 40rpx;
			text-align: center;
			border: 1rpx solid ;
		}
	}
</style>
