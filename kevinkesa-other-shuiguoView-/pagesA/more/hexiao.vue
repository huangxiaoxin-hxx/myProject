<template>
	<view style="width: 100%;min-height: 100vh;background-color: #f8f8f8;padding-top: 1rpx;">
		<view class="saoma">
			<view style="width: 540rpx;">
				<u-input confirm-type="send" v-model="value" type="text" @confirm="hexiao()" :border="true" placeholder="请输入订单核销码" />
			</view>
			<view>
				
			</view>
			<u-icon name="scan" @click="scans" color="#29db6f" size="46" label="扫描订单" label-pos="bottom"></u-icon>
		</view>
		
		<view class="input" v-if="item">
			<view class="rectangle_1506lkw">
				<view v-for="(items,j) of item.orderGoods" :key="j">
					<view class="uxhawj">
						<image :src="items.sku.length?items.sku.photo:items.goods.thumb_photo" class="qdhnr"></image>
						<view class="lwnpit">
							<view class="order_number_1503sd">{{items.goods_name}}</view>
							<view class="face_cream_ml_1480exd">{{items.suk_text}}</view>
							<view class="fdwar">
								<view class="imj1476ei">￥{{items.price}}</view>
								<view class="uov1472xd">x{{items.number}}</view>
							</view>
						</view>
					</view>
					<view class="rectangle_1468epi">
						
					</view>
				</view>
				</view>
		</view>
		<view class="btns" @click="hexiao">
			确定
		</view>
	</view>
</template>

<script>
	import Qrcode from '@/pages/components/qrcodes.vue'
	export default{
		components:{
			Qrcode
		},
		data(){
			return{
				value:'',
				isShow:false,
				item:''
			}
		},
		mounted() {
			this.isShow = true
		},
		methods:{
			hexiao(){
				if(!this.value){
					uni.showToast({
						icon:'none',
						title:'请输入核销订单号'
					})
				}
				this.$u.api.HeXiaoOrder({
					simple_sn:this.value
				}).then(res=>{
					console.log(res)
					this.item = res.data
					uni.showToast({
						icon:'none',
						title:'核销成功'
					})
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						icon:'none',
						title:err.data.msg
					})
				})
			},
			scans(){
				// 只允许通过相机扫码
				uni.scanCode({
					onlyFromCamera: true,
					success: (res)=> {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.value = res.result
						this.hexiao()
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/css/mall_order.scss";
	.saoma{
		width: 690rpx;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.btns{
		position: absolute;
		bottom: 300rpx;
		width: 690rpx;
		height: 100rpx;
		background-color: #daa96f;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 30rpx;
		color: #fff;
		font-size: 32rpx;
		border-radius: 15rpx;
	}
	.input{
		background-color: #fff;
	}
</style>