<template>
	<view>
		<view class="rectangle_1528xme">

			<view class="xiqsz">
				<view class="jhwdl" @click="mallList('all')">
					<view class="pending_payment_1511yp" :class="{active:nav=='all'}">全部</view>
				</view>
				<view class="jhwdl" @click="mallList('un_taking')">
					<view class="pending_payment_1511yp" :class="{active:nav=='un_taking'}">未接单</view>
				</view>
				<view class="jhwdl" @click="mallList('taking')">
					<view class="pending_payment_1511yp" :class="{active:nav=='taking'}">已接单</view>
				</view>
				<view class="jhwdl" @click="mallList('finish')">
					<view class="pending_payment_1511yp" :class="{active:nav=='finish'}">已完成</view>
				</view>
			</view>
		</view>
		<view class="rectangle_1506lkw" v-for="(item,i) of List" :key="item.id">
			<view class="bgpdo">
				<view class="order_number_1503sd">订单编号：{{item.order_sn}}</view>
				<view class="pending_payment">
					{{item.pay_state==2?item.order_state_text:item.pay_state_text}}{{item.shop_hand_state>0?'|'+item.shop_hand_state_text:''}}
				</view>
			</view>
			<view v-for="(items,j) of item.orderGoods" :key="items.id"
				@click='$gonext("/pages/shop/goods/product_details?id="+items.goods_id)'>
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
			<view class="lxdaro" v-if="item.shop_hand_state!=2">
				<view class="btnt" @click.stop="changeOrder(item,1)" v-if="item.shop_hand_state==0">
					已接单
				</view>
				<view class="btnt" @click.stop="changeOrder(item,2)">
					已到货
				</view>
				<view class="btnt" @click.stop="changeOrder(item,3)">
					延迟到货
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				nav: 'all',
				limit: 20,
				page: 1,
				List: [],
				order: '',
				show: false,
				nav2: '1',
				wHeight: '',
				shu: '', //页面层数
				pstt: '',
				value: '',
				shows: false
			}
		},
		onLoad({
			type
		}) {
			this.pstt = this.hosts
			// console.log(type)
			this.mallList('all')
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
			changeOrder(item,index){
				this.$u.api.changeOrderState({
					order_id:item.id,
					type:index
				}).then(res=>{
					console.log(res);
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.mallList(this.nav)
				}).catch(err=>{
					uni.showToast({
						title:err.data.msg,
						icon:'none'
					})
					console.log(err);
				})
			},
			hexiao(e) {
				this.shows = true
				console.log(e)
				this.value = e
			},
			mallList(type) {
				console.log(type)
				this.nav = type
				this.List = []
				this.$u.api.shopOrderLists({
					type: this.nav,
					limit: this.limit,
					page: this.page
				}).then(res => {
					this.List = res.data.data
					console.log('resmall_order', res)
				}).catch(err => {
					console.log('resmall_ordererr', err)
				})
			}

		}
	}
</script>
<style lang="scss" scoped>
	@import "@/css/mall_order.scss";

	.lxdaro {
		position: absolute;
		right: 20rpx;
		margin-top: -40rpx;
		display: flex;
		align-items: center;

		.btnt {
			padding: 5rpx 20rpx;
			font-size: 24rpx;
			color: #fc2526;
			text-align: center;
			border: 1rpx solid #fc2526;
			border-radius: 8rpx;
			margin-left: 10rpx;
		}
	}
	.rgfiyc{
		display: flex;
		align-items: center;
		
	}
</style>
