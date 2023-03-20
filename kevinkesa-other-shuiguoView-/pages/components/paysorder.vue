<template>
	<view>
		<view class="rectangle_2858rwf">
			<view class="wuhil">
				<view class="add_address">支付方式</view>
				<view class="online_payment">在线支付</view>
			</view>
			<view class="rectangle_2823tv"></view>
			<view class="nofspw" @click="tab()">
				<view class="rdezn" style="display: flex;align-items: center;">
					<u-icon label="积分"  size="30" name="rmb-circle-fill" color="#ff8e24"></u-icon>
					<view class="alipay" style="font-size: 28rpx;color:#606266;margin-top: -2rpx;">{{vuex_user.asset.user_money}}</view>
				</view>
				<image v-if="isShow" :src="pstt+'select_yes.png'" class="moeqjh"></image>
				<image v-else :src="pstt+'select_no.png'" class="moeqjh"></image>
			</view>
			<view style="padding-left: 60rpx;">还需支付：{{isShow?need:price}}</view>
			<button class="btn" @click="buy">确认购买</button>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			info:''
		},
		data(){
			return{
				nav:1,
				isShow:false,
				level:'',
				pstt:'',
				price:''
			}
		},
		computed:{
			need(){
				var price = this.price - this.vuex_user.asset.user_money
				if(price>=0){
					return price
				}else{
					return 0
				}
			}
		},
		mounted() {
			this.pstt = this.hosts
			console.log(this.info,'zhehsi')
			this.level = this.info.level
			this.price = this.info.price
			
			this.getInfo()
		},
		methods:{
			buy(){
				this.$u.api.VIPBuy({
					level: this.level,
					use_user_money: this.isShow?1:0
				}).then(res=>{
					if(res.data.pay_state){
						uni.showToast({
							icon:"none",
							title:'积分抵扣完了'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/tabbar/my/index'
							})
						},1500)
						return
					}
					console.log(res,'zhifu')
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
								uni.showToast({
									icon:"none",
									title:'购买成功'
								})
								//支付之后，跳转到置顶栏目
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/tabbar/my/index'
									})
								},1500)
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
				})
			},
			getInfo(){
				this.$u.api.asset().then(res=>{
					this.info = {...res.data}
				}).catch(err=>{
					console.log(err)
				})
			},
			tab() {
				this.isShow = !this.isShow
			},
			submitOrder(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rectangle_2858rwf{
	    border-radius: 8rpx;
	    background-color: rgb(255, 255, 255);
	    margin-top: 24rpx;
	    margin-left: auto;
	    margin-right: auto;
	    padding-bottom: 32rpx;
	    padding-top: 1rpx;
	    width: 686rpx;
			.top_text{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				font-size: 32rpx;
			}
			.btn{
				
				margin-top: 20rpx;
				width: 638rpx;
				height: 100rpx;
				border-radius: 10rpx;
				border: 1rpx solid #d8ca9e;
			}
	}
	.wuhil{
	    margin-top: 32rpx;
	    margin-left: auto;
	    margin-right: auto;
	    display: flex;
	    align-items: center;
	    width: 638rpx;
	    justify-content: space-between;
	}
	.sydiu{
	    margin-top: 26rpx;
	    margin-left: 24rpx;
	    display: flex;
	    width: 620rpx;
	    justify-content: space-between;
	}
	.nofspw{
	    margin-top: 28rpx;
	    margin-left: 24rpx;
	    display: flex;
	    width: 620rpx;
	    justify-content: space-between;
	}
	.rectangle_2823tv{
	    background-color: rgb(245, 245, 245);
	    margin-top: 24rpx;
	    margin-left: auto;
	    margin-right: auto;
	    width: 638rpx;
	    height: 2rpx;
	}
	.mwlok{
	    margin-top: 32rpx;
	    margin-left: 24rpx;
	    display: flex;
	    align-items: center;
	    width: 620rpx;
	    justify-content: space-between;
	}
	.rdezn{
	    width: fit-content;
	    display: flex;
	    align-items: center;
	}
	.uzqoln{
	    width: 32rpx;
	    height: 32rpx;
	}
	.alipay{
	    font-size: 28rpx;
	    color: rgb(34, 34, 34);
	    margin-left: 8rpx;
	}
	.moeqjh{
	    width: 40rpx;
	    height: 40rpx;
	}
</style>