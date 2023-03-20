<template>
	<view class="VIP_bodys">
		<view class="VIP_once" v-for="(item,index) of list" :key="index">
			<view class="VIP_top">
				<text class="text1" :style="item.pay_state==1?'color:red;':''">{{item.price}}</text>
				<text class="text2" :style="item.pay_state==1?'color:red;':''">{{item.pay_state_text}}</text>
			</view>
			<view class="VIP_center">
				<text class="text3">VIP{{item.level}}</text>
				<text class="text4">{{item.create_time}}</text>
			</view>
			<view class="VIP_btn" v-if="item.pay_state==1 && item.user_money>0">
				<view class="VIP_cancel" @click="cancel(item.id)" >取消订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			cancel(id){
				this.$u.api.orderCancel({
					id:id
				}).then(res=>{
					console.log(res);
					uni.showToast({
						icon:"none",
						title:res.msg
					})
					this.getList()
				}).catch(err=>{
					console.log(err);
					uni.showToast({
						icon:"none",
						title:err.data.msg
					})
				})
			},
			pay(code){
				this.$u.api.createOrders({
					order_sn:code
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
			},
			getList(){
				this.$u.api.VIPorder().then(res=>{
					console.log(res)
					this.list = res.data.data
				}).catch(err=>{
					console.log(err)
				})
			},
			deleteOrder(){
				this.$u.api.orderCancel({id:2}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.VIP_bodys{
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
		padding-top: 1rpx;
		.VIP_once{
			width: 710rpx;
			height: auto;
			padding: 20rpx;
			border-radius: 15rpx;
			background-color: #fff;
			margin: 20rpx auto;
			.VIP_top,.VIP_center,.VIP_btn{
				width: 100%;
				display: flex;
				justify-content: space-between;
			}
			.VIP_top{
				font-size: 28rpx;
				.text1{
					color:#2ba245;
				}
				.text2{
					color:#2ba245;
				}
			}
			.VIP_center{
				margin-top: 10rpx;
				.text3{
					font-size: 26rpx;
					color: coral;
				}
				.text4{
					font-size: 24rpx;
				}
				
			}
			.VIP_btn{
				margin-top: 10rpx;
				width: 100%;
				border-top:1rpx solid #f8f8f8;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding-top: 10rpx;
				.VIP_go,.VIP_cancel{
					// width: 10rpx;
					padding: 10rpx;
					// height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 5rpx;
					color: #fff;
				}
				.VIP_go{
					background-color: red;
					
				}
				.VIP_cancel{
					margin-left: 20rpx;
					background-color: #239243;
				}
			}
		}
	}
</style>