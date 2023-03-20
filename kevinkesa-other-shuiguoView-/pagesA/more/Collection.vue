<template>
	<view class="bodys">
		<view class="top">
			<view class="top_common" @click="select(1)" :style="isShow?'color:red;':''">
				商品
				<view class="top_bott" v-if="isShow"></view>
			</view>
			<view class="top_common" @click="select(0)" :style="!isShow?'color:red;':''">
				店铺
				<view class="top_bott" v-if="!isShow"></view>
			</view>
		</view>
		<view class="center">
			<view class="center_left">共<text class="center_text">{{list.length}}</text>件{{isShow?'商品':'店铺'}}</view>
			<view class="center_right" v-if="!show" @click="show=true">编辑</view>
			<view class="center_right" v-else @click="show=false">取消</view>
		</view>
		<u-checkbox-group @change="checkboxGroupChange" shape="circle" active-color="red">
		<view class="goods_common" v-for="(item,index) in list" :key="index">
			<view class="goods_common_img">
				<image class="goods_img" :src="isShow?item.goods.thumb_photo:item.shop.logo"></image>
				<view class="chakan" @click="go(item)">点击查看</view>
			</view>
			<view class="goods_right">
				<view class="goods_title">{{isShow?item.goods.name:item.shop.name}}</view>
				<!-- <view>{{isShow?}}</view> -->
				<view class="goods_pricest" v-if="!isShow">{{isShow?'':item.shop.mobile}}</view>
				<view class="goods_pricest" v-if="!isShow">{{isShow?'':item.shop.extend.address}}</view>
				<view class="goods_price">
				
				<text class="goods_prices">{{isShow?vuex_user.id&&vuex_user.price_show>0?'￥:'+item.goods.price:'******':'热度:'+item.shop.popularity}}</text>
				<view class="goods_btn" v-show="show">
					<u-checkbox 
									@change="checkboxChange" 
									v-model="item.checked" 
									:name="index"
								></u-checkbox>
				</view>
				</view>
			</view>
		</view>
		
		</u-checkbox-group>
		<loadding v-if="page==last_page"></loadding>
		
		<u-checkbox-group shape="circle" active-color="red" v-show="show">
		<view class="goods_not" v-show="show">
			<u-checkbox
							@change="checkboxChanges" 
							v-model="shuzhi.checked" 
							:name="shuzhi.name"
						>全选</u-checkbox>
			<view class="goods_not_btn" @click="deleteCollect">取消收藏</view>
		</view>
		</u-checkbox-group>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				isShow:true,
				list:[],
				goodList:[],
				shopList:[],
				shuzhi:{
					checked:false,
					name:'all'
				},
				trues:false,
				show:false,
				ns:0,
				page:1,
				last_page:1,
				goList:false,
			}
		},
		onLoad() {
			this.getGoodsList()
			this.getShopList()
		},
		computed:{
			all(){
				console.log(this.list)
				this.list.filter(item=>{
					if(!item.checked){
						return false
					}
				})
				return true
			}
		},
		methods:{
			async deleteCollect(){
				var a = ''
				if(this.isShow){
					await this.list.filter(item=>{
						if(item.checked){
							a += item.goods_id+',';
						}
					})
					this.$u.api.goodsCollect({
						goods_id:a,
						state:0
					}).then(res=>{
						console.log(res)
						this.getGoodsList()
						uni.showToast({
							icon:"none",
							title:res.msg
						})
					}).catch(err=>{
						console.log(err)
						this.getShopList()
						uni.showToast({
							icon:"none",
							title:err.data.msg
						})
					})
					console.log(a)
				}else{
					await this.list.filter(item=>{
						if(item.checked){
							a += item.shop_id+',';
						}
					})
					this.$u.api.shopcollect({
						shop_id:a,
						state:0
					}).then(res=>{
						console.log(res)
						uni.showToast({
							icon:"none",
							title:res.msg
						})
					}).catch(err=>{
						console.log(err)
						uni.showToast({
							icon:"none",
							title:err.data.msg
						})
					})
				}
			},
			go(item){
				console.log(item,'这是什么')
				if(!this.isShow){
					uni.setStorageSync('id',item.shop_id)
					uni.switchTab({
						url:'/pages/tabbar/mallMenu/index'
					})
					return
				}else{
					uni.setStorageSync('id',item.goods.shop_id)
					uni.switchTab({
						url:'/pages/tabbar/mallMenu/index'
					})
					return
				}
			},
			checkboxChanges(e){
				console.log('全选',e)
				
					this.list.filter(item=>{
						if(e.value){
							item.checked = true
						}else{
							item.checked = false
						}
					})
				
			},
			checkboxGroupChange(e){
				console.log('crjal',e)
				// if(e.length>=this.list.length){
				// 	this.shuzhi.checked = true
				// }else{
				// 	this.shuzhi.checked = false
				// }
			},
			async checkboxChange(e){
				this.ns = await 0
				console.log(e,'wo',this.list)
				var lists = await this.list
				await lists.filter(item=>{
					console.log(item,'这')
					if(item.checked){
						this.ns++
					}
				})
				console.log(this.ns,'那')
				setTimeout(()=>{
					if(this.ns>=this.list.length){
						this.shuzhi.checked = true
					}else{
						this.shuzhi.checked = false
					}
				},100)
				
			},
			getGoodsList(){
					this.$u.api.collectGoodsList().then(res=>{
						console.log(res,'goods')
						if(this.goList){
							this.goodList.push({...res.data.data})
							this.goList = false
						}else{
							this.goodList = res.data.data
						}
						this.list = this.goodList
					}).catch(err=>{
						console.log(err)
					})
			},
			getShopList(){
					this.$u.api.collectShopList().then(res=>{
						console.log(res,'collect')
						if(this.goList){
							this.shopList.push({...res.data.data})
							this.goList = false
						}else{
							this.shopList = res.data.data
						}
					}).catch(err=>{
						console.log(err)
					})
			},
			select(type){
				if(type==this.isShow){
					return
				}
				this.page = 1
				
				this.show = false
				this.shuzhi.checked = false
				console.log(type)
				this.list = []
				if(type){
					this.isShow = true
					this.list = this.goodList
				}else{
					this.isShow = false
					this.list = this.shopList
				}
				this.list.filter(item=>{
					item.checked = false
				})
				console.log(this.list)
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: async function() {
			if (this.page >= this.last_page) {
				return
			} else {
				this.goList = true
				this.page = this.page + 1;
				if(this.isShow){
					this.getGoodsList()
				}else{
					this.getShopList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bodys{
		width: 100%;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
.top{
	background-color: #fff;
	width: 100%;
	height: 60rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #f5f5f5;
	.top_common{
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.top_bott{
			width: 60rpx;
			height: 4rpx;
			background-color: red;
		}
	}
}
.center{
	width: 100%;
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
	font-size: 22rpx;
	.center_left{
		
		.center_text{
			margin-left: 10rpx;
			margin-right: 10rpx;
			color: red;
		}
	}
	.center_right{
		font-size: 24rpx;
		color: red;
	}
}
.goods_common{
	margin-top: 10rpx;
	width: 100%;
	padding: 15rpx 20rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.goods_common_img{
		width: 160rpx;
		height: 220rpx;
		.goods_img{
			width: 160rpx;
			height: 160rpx;
			background-color: red;
		}
		.chakan{
			margin: auto;
			font-size: 24rpx;
			width: 120rpx;
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #5281c8;
			border: 1rpx solid #5281c8;
			border-radius: 10rpx;
		}
	}
	
	.goods_right{
		width: 540rpx;
		height: 220rpx;
		// background-color: green;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods_title{
			font-weight: bold;
			font-size: 28rpx;
			display:-webkit-box;
			overflow:hidden;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2; //显示两行
			// height: 70rpx;
		}
		.goods_price{
			font-size: 32rpx;
			// margin-top: 80rpx;	
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: red;
			
		}
		.goods_pricest{
			// margin-top: 10rpx;
			// color: ;
			font-size: 26rpx;
			color: darkgray;
			display:-webkit-box;
			overflow:hidden;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:1; //显示两行
		}
	}
}
.goods_not{
	padding: 0 20rpx;
	position: fixed;
	background-color: rgba(255, 255, 255, 0.5);
	width: 100%;
	height: 100rpx;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.goods_not_btn{
		width: 160rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: red;
		color: #fff;
		border-radius: 5rpx;
		
	}
}
</style>
