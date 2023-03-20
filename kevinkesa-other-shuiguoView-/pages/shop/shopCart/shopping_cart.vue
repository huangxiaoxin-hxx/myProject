<template>
	<view>
		<view :style="'height:'+wHeight+'rpx;width:100%;background-color:#FFFFFF;'"></view>
		<view class="shopp_top">
			<!-- 状态栏高度 -->
			
			<!-- <image :src="pstt+'return_gshtb1627003647791.png'" @click="back" class="omgkh"></image> -->
			<view class="shopping_cart">购物车</view>
			<view @click="guanli">
				<view class="carry_out" style="left: 30rpx;" v-if="!isdel" >管理</view>
				<view class="carry_out" style="left: 30rpx;" v-else>完成</view>
			</view>
		</view>
		<view class="padding-b60">
			<view class="rectangle_2618gqm" v-for="(item,index) of list" :key="index">
				<view @click="select(item,index)">
					<image  :src="pstt+'select_no.png'" class="group_2592olb" v-if="pstt && !item.is_check_bool"></image>
					<image :src="pstt+'mplch1627024430798.png'" class="group_2592olb" v-if="pstt && item.is_check_bool"></image>
				</view>
				<img :src="item.sku?item.sku.photo:item.goods.thumb_photo" mode="scaleToFill" class="group_2594rk"></img>
				<view class="fxndrs">
					<view class="estee_lan_division_2615fqu">{{item.goods.name}}</view>
					<view class="rectangle_2613uvi">
						<view class="face_cream_ml_2611ahd" v-if="item.sku">{{item.sku?item.sku.suk:''}}</view>
					</view>
					<view class="pze2609cdt">{{vuex_user.id&&vuex_user.price_show>0?item.sku?'￥'+item.sku.price:'￥'+item.goods.price:'******'}}</view>
					<view class="rectangle_2605yb">
						<view class="oval_2603wmf">
							<view class="nv2599lu" @click='calculation($event,item,index,1)'>-</view>
						</view>
						<view class="cf2607rxy">{{item.number}}</view>
						<view class="oval_2601zqk">
							<view class="pfl2597hfe" @click='calculation($event,item,index,2)'>+</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="znqgy"></view>
		<view class="rectangle_2575eu">
			<view class="ytrdg" @click="all()">
				<image :src="pstt+'select_no.png'" mode="" class="group" v-if="pstt&&!active"></image>
				<image :src="pstt+'mplch1627024430798.png'" class="group" v-if="pstt && active"></image>
				<view class="select_all">全选</view>
			</view>
			<view class="db-inline-item" v-if="!isdel">
				<view class="total">合计：<text>{{vuex_user.id&&vuex_user.price_show>0?'￥'+total:'******'}}</text></view>
				<view class="settlement" @click="settlement">立即支付</view>
			</view>
			<view class="rectangle" v-if="isdel" @click="deleteCar">
				<view class="delete_selected">删除选中</view>
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		<tabbares :currentPage="2"></tabbares>
	</view>
</template>
<script>
	import tabbares from '@/components/shops.vue' //后期其他人需要的
	export default {
		data() {
			return {
				num: 1,
				isdel: false,
				total: 0,
				list: [],
				activeList: [],
				active: false,
				wHeight:'',
				pstt:''
			}
		},
		components:{
			tabbares
		},
		onLoad() {
			this.pstt = this.hosts
		},
		mounted() {
			// #ifdef APP-PLUS
				this.wHeight = plus.navigator.getStatusbarHeight()*2;
			// #endif
			// #ifdef H5
				this.wHeight = 50
			// #endif
			// #ifdef MP-WEIXIN
				this.wHeight = 80;
			// #endif
		},
		onShow() {
			if(this.vuex_user.id&&this.vuex_user.price_show>0){
				this.getList()
			}
			this.getList()
			
		},
		methods: {
			guanli(){
				this.isdel = !this.isdel
			},
			back(){
				uni.navigateBack({
					
				})
			},
			getList() {
				
				this.$u.api.cartList({
					shop_id:uni.getStorageSync('id'),
					from_type:0
				}).then(res=>{
					console.log(res)
					this.list = res.data.goods
					this.activeList = []
					this.total = 0
					this.list.filter((item,index)=>{
						if(item.is_check_bool){
							this.activeList.push(item)
							var a = item.sku?item.sku.price:item.goods.price
							this.total += item.number *100 * a / 100
						}
					})
					for(var i=0;i<this.list.length;i++){
						if(!this.list[i].is_check_bool){
							this.active = false
							return
						}else{
							console.log('1')
							this.active = true
						}
					}
				}).catch(err=>{
					console.log(err)
					this.$tips(err.data.msg)
				})
			},
			// 选中商品
			select(obj,index) {
				console.log(obj,index)
				console.log(this.activeList)
				this.list.filter(item => {
					if (obj.id == item.id) {
						item.is_check_bool = !item.is_check_bool
						this.total = 0
						this.activeList = []
						this.list.filter(item => {
							if (item.is_check_bool) {
								this.activeList.push(item)
							}
						})
						for (var i = 0; i < this.activeList.length; i++) {
							var a=this.activeList[i].sku?this.activeList[i].sku.price:this.activeList[i].goods.price
							this.total += this.activeList[i].number *100 * a / 100
						}
					}
				});
				if (this.activeList.length == this.list.length) {
					this.active = true
				} else {
					this.active = false
				}
				this.cartUpdate(obj.id,this.list[index].number,this.list[index].is_check_bool)
			},
			// 全选
			all() {
				this.active = !this.active
				if (this.active) {
					this.activeList = this.list
					this.total = 0
					this.list.filter(item => {
						item.is_check_bool = true
						var a = item.sku?item.sku.price:item.goods.price
						this.total += item.number * a
						this.cartUpdate(item.id,item.number,item.is_check_bool)
					});
				} else {
					this.activeList = []
					this.list.filter(item => {
						item.is_check_bool = false
						this.cartUpdate(item.id,item.number,item.is_check_bool)
					});
					this.total = 0
				}
			},
			// 删除
			deleteCar() {
				
				if (this.activeList.length > 0) {
					var strr = []
					var activeList = this.activeList
					for (var i = 0; i < activeList.length; i++) {
						// console.log()
						// strr += activeList[i].id + ','
						strr.push(activeList[i].id)
					}
					this.$u.api.cartDel({
						cart_id:strr,
						from_type:0
					}).then(res=>{
						this.$tips(res.msg)
						
						this.getList()
					}).catch(err=>{
						this.$tips(err.data.msg)
					})
				} else {
					this.$tips('请选择要删除的商品')
				}
			},
			cartUpdate(id,number,is_check_bool){
				this.$u.api.cartUpdate({
					cart_id:id,
					is_check:is_check_bool?1:0,
					number:number
				}).then(res=>{
					console.log(res.msg)
					// this.$tips(res.msg)
				}).catch(err=>{
					console.log(err.data.msg)
					// this.$tips(err.data.msg)
				})
			},
			// 购买
			settlement() {
				if (this.activeList.length > 0) {
				if(this.vuex_user.id&&this.vuex_user.price_show>0){
					
					  var str = ''
					  var activeList = this.activeList
					  for (var i = 0; i < activeList.length; i++) {
					    str += activeList[i].id + '-' + activeList[i].number + ','
					  }
					  str = str.slice(0, -1)
						
						uni.navigateTo({
								url:'/pages/shop/submit_order/index?id='+ uni.getStorageSync('id')
							})
				}else{
					uni.showToast({
						title:'您的VIP体验版已到期，无法下单购买，请购买VIP',
						icon:'none'
					})
					return
				}
			  
				// console.log(str)
				
			  } else {
					this.$tips('请选择结算商品')
			  }
			},
			// 数量加减
			calculation(e, item,index,type) {
				
				console.log(e.target,item,index,type)
				
				

				var reduce = e.target.offsetLeft ;
				if ( type==1) {
					console.log('---')
					
						if (this.list[index].id == item.id && item.number > 1) {
							this.list[index].number -= 1
						} else {
							this.$tips('太少啦，不能再减了')
						}
					
					this.total = 0
					for (var i = 0; i < this.activeList.length; i++) {
						var a=this.activeList[i].sku?this.activeList[i].sku.price:this.activeList[i].goods.price
						this.total += this.activeList[i].number *100 * a / 100
					}
				} else {
					// if(item.sku.number<=this.list[index].number){
					// 	this.$tips('已达最大库存数量')
					// 	return
					// }
					for (let i = 0; i < this.list.length; i++) {
						if (this.list[i].id == item.id) {
							this.list[i].number += 1
						}
					}
					this.total = 0
					for (var i = 0; i < this.activeList.length; i++) {
						var a=this.activeList[i].sku?this.activeList[i].sku.price:this.activeList[i].goods.price
						this.total += this.activeList[i].number *100 * a / 100
					}
				}
				if(this.list[index].is_check_bool){
					this.cartUpdate(item.id,this.list[index].number,this.list[index].is_check_bool)
					}
				
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/css/shopping_cart.scss";
	.shopp_top{
		width: 100%;
		// height: 40rpx;
		padding-bottom: 20rpx;
		display: flex;
		justify-content: center;
		// align-items: center;
		background-color: #fff;
		.shopping_cart{
			font-size: 33rpx;
		}
		.carry_out{
			position: absolute;
			right: 30rpx;
			font-size: 28rpx;
		}
	}
</style>
