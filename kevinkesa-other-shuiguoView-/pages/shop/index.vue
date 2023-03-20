<template>
	<view style="background-color: #f6f6f6;" class="home_body">
		<tabbares :currentPage="0"></tabbares>
		<view class="ckgtx" style="height: auto;">
			
			<view class="topInfo" >
				<view :style="'height:'+wHeight+'px;width:100%;background: #f6f6f6;'">
				</view>
			<!-- <view class="chat" @click="$gonext('../mall_order')">购买记录</view> -->
			<!-- <image src="@/static/qtxoe1627006586707.png" @click="back" class="topInfo_img"></image> -->
			<view class="top_title">
				<image src="../../static/logo.png" style="width: 100rpx;height: 100rpx;position: absolute;left: 20rpx;"></image>
				<text style="font-size: 33rpx;">肖荣呈水果批发</text>
			</view>
			</view>
			<view :style="{height:(wHeight+40)+'px'}"></view>
			<view class="ibvqt">
				<view class="rectangle_2688le">
					<image src="/static/search.png" class="lyjdhn"></image>
					<input confirm-type="search" @confirm="listGet" placeholder="搜索店铺名称查找" class="search_product_name" v-model="keyword">
				</view>
			</view>
		</view>
		<view class="oqxzuw">
			<swiper autoplay="true" circular="true"  style="height: 280rpx;" interval="3000" duration="500" :indicator-dots="true"
				indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in banner" :key="index" style="width: 710rpx;height: 280rpx;" :indicator-dots="true">
					<image @click="$gonext('/'+item.url)" :src="item.data" style="width: 100%;height: 280rpx;"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- <swiper class="swiper" circular  :autoplay="false" :indicator-dots="true">
						<swiper-item v-for="(item1,index1) in swiper_length" :key="index1">
							<view class="swiper_body">
								<view class="classify" v-for="(item,index) of list.slice(index1*8,(index1+1)*8)" :key="index" @click="xuanze(index)">
								<view class="classify_one">
									<image class="classify_img" :src="item.image"></image>
									<text>{{item.name}}</text>
								</view>
							</view>
							</view>
							
						</swiper-item>
		</swiper> -->
		
		<view class="item-container" v-for="(item1,index1) of goods_list" :key="index1" @click="$gonext('/pages/shop/goods/product_details?id='+item1.id)">
									<!-- 之前的uview -->
		<!-- 							<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
										<image class="item-menu-image" :src="item1.icon" mode="scaleToFill"></image>
										<view class="item-menu-name">{{item1.name}}</view>
									</view> -->
									<!-- 之前的uview -->
									<image class="left_tu" :src="item1.thumb_photo"></image>
									<view class="right_content">
										<text class="right_top_text">{{item1.name}}</text>
										<text class="right_center_text">库存：{{item1.number}}</text>
										<view class="right_bottom">
											<text class="right_bottom_text">
												{{vuex_user.id&&vuex_user.price_show>0?'￥'+item1.price:'******'}}
												</text>
											<view class="right_bottom_btn" >选择</view>
										</view>
									</view>
								</view>
		
		
			<view class="everys"v-for="(item,index) of list" :key="item.id" v-if="item.goods.length!=0">
				<view class="every_customer" >
					<!-- <view class="select_btn">人气推荐</view> -->
					<image class="everys_img" :src="item.logo"></image>
					<view class="everys_btn" @click="selectShop(item)">进店查看</view>
				</view>
				<view class="every_right">
					<view class="every_title">{{item.name}}</view>
					<!-- <view class="every_text">距离：{{item.distance.range}}</view> -->
					<scroll-view class="every_swiper" :scroll-x="true">
						<view class="every_swipers" v-for="(item1,index1) in item.goods" :key="index1" @click="selectShop(item)">
							<image class="every_imgs" :src="item1.thumb_photo"></image>
							<view style="color: #000;font-weight: bold;">{{item1.name}}</view>
							<view style="color: red;">{{vuex_user.id&&vuex_user.price_show>0?'￥'+item1.price:'******'}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
		<loadding v-if="form.page==last_page"></loadding>
		<view  style="height: 110rpx;"></view>
		
	</view>
</template>
<script>
	// import tabbares from '@/components/tgs-tabbar.vue' //960商城的
	import tabbares from '@/components/shops.vue' //自定义需要的
	export default {
		data() {
			return {
				shopnum: '',
				banner: [],
				list: [],
				child:0,
				form:{
					cateid:'',
					page:'1',
					limit:'20'
				},
				cateid:'',
				goodsList:[],
				keyword:'',
				wHeight: '',
				//触发下拉刷新
				pullUpOn: true,
				indexs:-1,
				last_page:1,
				swiper_length:1,
				goList:false,
				goods_list:[]
			}
		},
		components: {
			tabbares
		},
		
		onLoad() {
			this.bannerGet()
			// this.listGet()
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			// this.getlocations()
			if(this.keyword){
				return
			}
			this.huoqu()
		},
		mounted() {
			
			uni.getSystemInfo({success: (res) => {
				this.wHeight = res.statusBarHeight
			}})
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
				wx.showShareMenu({
					withShareTicket: false,
					menus: ['shareAppMessage', 'shareTimeline']
				})
		    return {
		      title: '商城',
		      path: 'pages/shop/index?shareId=' + this.vuex_user.id
					// imageUrl: this.info.image_arr[0]
		    }
		  },
			onShareTimeline(res) {
				// console.log(this.vuex_user.id)
				return {
					title: '商城',
					query: 'shareId=' + this.vuex_user.id
					// imageUrl: this.info.image_arr[0]
				}
			},
		methods: {
			clicks(e){
				console.log(e)
				
			},
			selectShop(item){
				uni.setStorageSync('id',item.id)
				uni.switchTab({
					url:'/pages/tabbar/mallMenu/index?id='+item.id
				})
			},
			bannerGet(){
				this.$u.api.news_banner().then(res=>{
					console.log('bannerGet',res)
					this.banner = res.data
				}).catch(err=>{
					console.log('bannerGeterr',err)
				})
			},
			//获取地理位置
			// getlocations(){
			// 	uni.getLocation({
			// 		type: 'wgs84',
			// 		success:  (res)=> {
			// 			console.log('当前位置的经度：' + res.longitude);
			// 			console.log('当前位置的纬度：' + res.latitude);
			// 			setTimeout(()=>{
			// 				// console.log(this.latitude,this.longitude)
							
			// 				this.latitude = res.latitude
			// 				this.longitude = res.longitude
			// 				this.huoqu()
			// 			},50)
			// 		}
			// 	});
			// },
			huoqu(value){
				this.$u.api.shopList({
					page:this.form.page,
					limit:20,
					keyword:value?value:''
				}).then(async (res)=>{
					this.form.page = await res.data.current_page
					this.last_page =await res.data.last_page
					// this.list = res.data.data
					var lists = await res.data.data
					// var dis = await [{
					// 	x:this.longitude,
					// 	y:this.latitude
					// },{
					// 	x:0,
					// 	y:0
					// }]
					
					// console.log(this.list,'shuzu')
					// await lists.filter((item,index)=>{
					// 	if(item.extend){
					// 	dis[1].x = item.extend.lng
					// 	dis[1].y = item.extend.lat
					// 	item.distance = this.$distance(dis)
					// 	}
					// 	// if(!item.goods.length){
					// 	// 	this.list.splice(index,1)
					// 	// }
					// 	if(item.goods.length<=0){
					// 		lists.splice(index,1)
					// 	}
						
					// })
					// // console.log(lists,res.data)
					// await lists.filter((item,index)=>{
					// 		if(item.goods.length<=0){
					// 			lists.splice(index,1)
					// 		}
					// })
					if(this.goList){
					 await	lists.filter((item,index)=>{
							this.list.push(item)
						})
						this.goList =await false
					}else{
						this.list =await lists
					}
					
					console.log(lists,'looks')
					// this.list = lists
					// for(var i=1;i<this.list.length;i++){
					//     //内层循环：控制每轮比较次数  数组长度-i
					//     for(var j=0;j<this.list.length-i;j++){
					//     //如果当前的元素(j)大于下一个元素(j+1)，则交换位置
					// 					if(this.list[j].distance.to>this.list[j+1].distance.to){
					//             var t=this.list[j];
					//             this.list[j]=this.list[j+1];
					//             this.list[j+1]=t;
					// 				}
					//     }
					// }
					// if(!uni.getStorageSync('id')){
					// 	uni.setStorageSync('id',this.list[0].id)
					// }
					console.log(this.list,'huoqu')
				}).catch(err=>{
					console.log(err)
				})
			},
			getGoods(){
				this.$u.api.goodsList({
					page:this.form.page,
					limit:20,
					shop_id:0,
					keyword:this.keyword
				}).then(res=>{
					console.log(res);
					this.last_page = res.data.last_page
					this.goods_list = res.data.data
				}).catch(err=>{
					console.log(err);
				})
			},
			listGet(){
				console.log('taoge',this.keyword)
				this.form.page = 1
				if(this.keyword==''){
					this.goods_list = []
					this.huoqu(this.keyword)
					return
				}else{
					this.list=[]
					this.getGoods()
				}
			},
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: async function() {
			if (!this.pullUpOn) return;

			if (this.form.page >= this.last_page) {

				this.pullUpOn = false
			} else {
				this.goList = true
				this.form.page = this.form.page + 1;
				this.huoqu()

			}
		},
	}
</script>
<style lang="scss" scoped>
	@import "@/css/home.scss";
	.home_body{
		width: 100%;
		min-height: 100vh;
		background-color: #f6f6f6;
		// background-image: url('/static/home_background_somzy1627003947896.png');
	}
	.oqxzuw{
		
	}
	.kfolna{
		width: 320rpx;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		.xgh2671woz{
			display: flex;
			justify-content: space-between;
			padding-right: 15rpx;
			.shop_text{
				font-size: 22rpx;
				color: #99a6c3;
			}
		}
		
	}
	.tops_liu{
		//#ifdef H5
		height: 100rpx;
		//#endif
		//#ifdef MP-WEIXIN
		height: 140rpx;
		//#endif
	}
	.topInfo {
		top: 0;
		z-index: 10;
		background: #f6f6f6;
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		width: 100%;
		height: auto;
		.top_title{
			width: 100%;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			
		}
		.topInfo_img {
			position: absolute;
			left: 30rpx;
			width: 48rpx;
			height: 48rpx;
		}
	
		.chat{
			margin-top: 10rpx;
			position: absolute;
			// right: 0;
			left: 0;
			width: 140rpx;
			height: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1rpx solid red;
			border-right: 0;
			border-radius:0 20rpx 20rpx 0;
			background-color: red;
			color: #fff;
		}
		
	}
	.swiper{
		margin: 0 auto;
		width: 710rpx;
		height: 300rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin-top: 60rpx;
		.swiper_body{
			// margin: auto;
			width: 710rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			.classify{
			// width: 750rpx;
			margin-left: 7rpx;
			margin-top: 10rpx;
			.classify_one{
			width: 165rpx;
			height: 120rpx;
			float: left;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			.classify_img{
				width: 80rpx;
				height: 80rpx;
			}
		}
		}
		}
		
		
	}
	
	.everys{
		width: 710rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 15rpx;
		margin: 20rpx auto;
		display: flex;
		align-items: center;
		.every_customer{
			width: 180rpx;
			height: 300rpx;
			.select_btn{
				width: 100rpx;
				height: 40rpx;
				border-radius: 8rpx 8rpx 0 8rpx;
				background-color: red;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				// right: 40rpx;
				font-size: 22rpx;
				margin-top: 10rpx;
				margin-left: 85rpx;
				color: #fff;
			}
			.everys_img{
				width: 180rpx;
				height: 180rpx;
				border-radius: 14rpx;
			}
			.everys_btn{
				width: 120rpx;
				margin: 40rpx auto;
				height: 40rpx;
				border-radius: 10rpx;
				background-color: #faf3db;
				display: flex;
				font-size: 24rpx;
				color: #000;
				justify-content: center;
				align-items: center;
			}
		}
		.every_right{
			width: 470rpx;
			height: 300rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.every_title{
				font-size: 32rpx;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.every_text{
				// margin-top: 20rpx;
				font-size: 24rpx;
				color: #99a6c3;
			}
			.every_swiper{
				height: 220rpx;
				width: 470rpx;
				// display: flex;
				white-space: nowrap;
				.every_swipers{
					margin-right: 20rpx;
					display: inline-block;
					// display: flex;
					// flex-direction: column;
					
					
					// float: left;
					width: 180rpx;
					height: 240rpx;
					// background-color: red;
					.every_imgs{
						border-radius: 10rpx;
						width: 100%;
						height: 140rpx;
						
					}
					view{
						margin-top: 5rpx;
						font-size: 24rpx;
						width: 180rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					// border-radius: ;
				}
			}
			
		}
	}
	
	.item-container {
		// display: flex; //之前的uview
		// flex-wrap: wrap; //之前的uview
		width: 670rpx;
		height:  auto;
		margin: auto;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		.left_tu{
			width: 200rpx;
			height: 200rpx;
			border-radius: 16rpx;
		}
		.right_content{
			width: 450rpx;
			display: flex;
			flex-direction: column;
			
			.right_top_text{
				font-size: 30rpx;
				// font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.right_center_text{
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #aeaeae;
			}
			.right_bottom{
				margin-top: 28rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				.right_bottom_text{
					font-size: 28rpx;
					font-weight: bold;
				}
				.right_bottom_btn{
					width: 120rpx;
					height: 50rpx;
					border-radius: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #daa773;
					color: #fff;
				}
			}
		}
	}
</style>
