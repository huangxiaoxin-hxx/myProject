<template>
	<view class="main">

		<view class="epmnxy">
			<swiper autoplay="true" circular="true" style="height: 600rpx;" interval="3000" duration="500" :indicator-dots="true"
				indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in info.image_arr" :key="index" style="height: 600rpx;">
					<img :src="item" style="height: 600rpx;width: 100%;" mode="scaleToFill"></img>
				</swiper-item>
			</swiper>
			<view class="pcqxo"></view>
		</view>
		<view class="rectangle_2735hj">
			<view class="estee_lan_division">{{info.title}}</view>
			<view class="genuine_guarantee">正品保障·急速发货</view>
			<view class="ya2712zph">{{vuex_user.id&&vuex_user.price_show>0?'￥'+info.price:'******'}}</view>
		</view>
		<view class="rectangle_2734mo" @click="show1 = true">
			<view class="scguzt" v-if="details1!=''">
				<view class="selected">已选</view>
				<view class="face_cream_ml">{{details1}}</view>
			</view>
			<view v-else class="margin-l10">请选择你需要的规格</view>
			<image v-if="pstt" :src="pstt+'xamlos.png'" class="spnxg"></image>
		</view>
		<view class="product_details">-商品详情-</view>

		<view class="wechat_screensho" v-html="info.details"></view>
		<view style="height: 150rpx;"></view>


		<view class="kdtqy"></view>
		<view class="rectangle_2711eh">
			<view class="dyjab" style="display: flex;align-items: center;" >
				<u-icon label="店铺" label-size="24" label-pos="bottom" size="40" name="home" @click="gos(shop.id)"></u-icon>
				<view style="width: 30rpx;z-index: 1;background-color: #fff;height: 100%;"></view>
				<button open-type="share" class="btn_everys">
					<u-icon label="分享" label-size="24" label-pos="bottom" size="40" name="zhuanfa"></u-icon>
				</button>
				<view style="width: 30rpx;z-index: 1;background-color: #fff;height: 100%;"></view>
				<u-icon label="收藏" label-size="24" label-pos="bottom" :color="isShow?'red':''" size="43" name="star" @click="collect()"></u-icon>

			</view>
			<view class="kuolp">
				<view class="rectangle_2709jnb" @click="addShop(true)">
					<view class="add_to_shopping">购物车</view>
				</view>
				<view class="rectangle1" @click="addShop(false)">
					<view class="buy_now">立即购买</view>
				</view>
			</view>
		</view>
		<u-popup mode="bottom" v-model="show1" @open="open">

			<view class="rectangle_2773qu">
				<view class="iyfgzn">

					<image v-if="show1" :src="img?img:info.thumb_photo" class="cgzsyv"></image>

					<view class="zkwsc">
						<image v-if="pstt" :src="pstt+'shut_down_heipw1627003989791.png'" class="uvhfd" @click="show1 = !show1">
						</image>
						<view class="zlgxp">
							<view class="dc2772kv">{{vuex_user.id&&vuex_user.price_show>0?'￥'+info.price:'******'}}</view>
							<view class="selected_cream_m" v-if="details1">{{details1}}</view>
							<view class="selected_cream_m" v-else>请选择你需要的规格</view>
						</view>
					</view>
				</view>
				<view class="rectangle_2767ge"></view>
				<view v-for="(item,index1) of info.attr" :key="index1">
					<view class="types_of">{{item.attr_name}}</view>
					<view class="budjtm">
						<view class="rectangle_2766hqp" v-for="(items,index) in item.attr_value" :key="index"
							@click="tab(index1,items)" :class="details[index1]==items?'active':''">
							<view class="eye_cream" :class="details[index1]==items?'activetext':''">
								{{items}}
							</view>
						</view>
					</view>
				</view>
				<view class="ivgzf">
					<view class="quantity">数量</view>
					<view class="rectangle_2747ar">
						<view class="guwqt">
							<image v-if="pstt" :src="pstt+'group_2745dp_bhcuv1627003977774.png'" alt=""
								style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;">
							</image>
							<view class="ev2746qn" @click='changeNum(0)'>-</view>
						</view>
						<view class="sg2753ar">{{form.number?form.number:1}}</view>
						<view class="pbygxh">
							<image v-if="pstt" :src="pstt+'group_2743os_drzpl1627003976321.png'" alt=""
								style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;">
							</image>
							<view class="cq2744jx" @click='changeNum(1)'>+</view>
						</view>
					</view>
				</view>
				<view class="pro_input"><text>输入要选择的数量</text><u-input :border="true" v-model="form.number" @input="input" :type="number" placeholder="请输入数量"/></view>
				<view class="rectangle">
					<view class="determine" @click="guige">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					goods_id: '',
					sku_id: '',
					from_type: 0,
					number: '1',
					shop_id:''
				},
				info: {},
				speclist: [],
				show1: false,
				price: 0,
				details: [], //详情数据
				details1: '', //详情数据字符串
				img: '',
				shop:{},
				shu:'' ,//页面层数
				pstt:'',
				isShow:false
			}
		},
		onLoad(op) {
			this.pstt = this.hosts
			this.form.goods_id = op.id
			this.huoqu()
			//防止刷新后不能返回-->将直接回首页
			var pages = getCurrentPages();
			this.shu = pages.length
		},
		onShow() {
			console.log('kanwozaizhong')
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
		      title: this.info.name,
		      path: 'pages/shop/goods/product_details?id='+this.form.goods_id +'&shareId=' + this.vuex_user.id,
					imageUrl: this.info.image_arr[0]
		    }
		  },
			onShareTimeline(res) {
				// console.log(this.vuex_user.id)
				return {
					title: this.info.name,
					query: 'id='+this.form.goods_id +'&shareId=' + this.vuex_user.id,
					imageUrl: this.info.image_arr[0]
				}
			},
		methods: {
			input(e){
				console.log(e)
				// if(e=='')
				if(e<0){
					setTimeout(()=>{
						this.form.number = this.form.number * -1
					},30)
				}
				setTimeout(()=>{
					this.form.number = parseInt(this.form.number)
				},30)
			},
			gos(id){
				uni.setStorageSync('id',id)
				uni.switchTab({
					url:'/pages/tabbar/mallMenu/index'
				})
			},
			collect(){
				this.$u.api.goodsCollect({
					state:1,
					goods_id:this.info.id
				}).then(res=>{
					console.log(res)
					this.isShow = true
					uni.showToast({
						icon:'none',
						title:'收藏成功'
					})
				}).catch(err=>{
					uni.showToast({
						icon:'none',
						title:err.data.msg
					})
					console.log(err)
				})
			},
			shops(id){
				this.$u.api.shopInfo({
					id:id
				}).then(res=>{
					console.log(res)
					this.shop = res.data
				}).catch(err=>{
					console.log(err)
				})
			},
			huoqu() {
				this.$u.api.goodsInfo({
					id: this.form.goods_id
				}).then(res => {
					console.log('taoge', res)
					this.info = res.data
					
					this.shops(res.data.shop_id)
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: err.msg
					})
				})
			},
			//加入购物车
			addShop(type) {
				// if(type){
				// 	this.$tips('敬请期待')
				// 	return
				// }
				if(!this.form.number){
					this.form.number =1
				}
				if(!this.vuex_user.id||this.vuex_user.price_show==0){
					uni.showToast({
						icon:"none",
						title:'请购买会员后再购买'
					})
					// return
				}
				this.form.shop_id = this.info.shop_id
				this.form.sku_id ? this.form.sku_id : this.form.sku_id = 0
				console.log('look', this.form)
				this.$u.api.cartAdd({
					
					...this.form
				}).then(res => {
					console.log('taoge', res)
					this.form.number = 1
					if(!type){
						uni.navigateTo({
							url:'/pages/shop/submit_order/index?id=' + this.info.shop_id
						})
					}else{
						this.$tips(res.msg)
					}
					
				}).catch(err => {
					this.$tips(err.data.msg)
				})
				
			},
			open(e) {
				console.log('涛哥', e)
			},
			guige() {
				// for(var i=0)
				for (var i = 0; i < this.info.attr.length; i++) {
					if (!this.details[i] || !this.details) {
						this.$tips("请选择好规格后再确定")
						return
					}
				}
				// this.addShop(true)
				this.show1 = !this.show1
				console.log(this.show1)
			},
			back() {
				if(this.shu>1){
					uni.navigateBack({})
				}else{
					uni.switchTab({
						url:'/pages/homepage_is_not'
					})
				}
			},

			tab(index, items) {
				this.details[index] = items
				this.details1 = ''
				for (var i = 0; i < this.details.length; i++) {
					if (i < this.details.length - 1) {
						this.details1 += this.details[i] + ','

					} else {
						this.details1 += this.details[i]
					}
				}
				var reg = RegExp("(" + this.details1 + ")")
				for (var i = 0; i < this.info.attr_value.length; i++) {
					if (reg.test(this.info.attr_value[i].suk)) {
						this.price = this.info.attr_value[i].price
						this.img = this.info.attr_value[i].photo
						this.form.sku_id = this.info.attr_value[i].id
					}
				}
				console.log(this.details1, this.price, this.img)

			},
			changeNum(type) {
				if (type) {
					this.form.number < this.info.number ? this.form.number++ : this.$tips("已达最大库存")
				} else {
					this.form.number == 1 ? this.$tips('不能在减少了') : this.form.number--
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/css/product_details.scss";

	.kuolp {
		margin-right: 32rpx;
		width: fit-content;
		display: flex;
	}

	.rectangle_2709jnb {
		
		border-radius: 80rpx 0rpx 0rpx 80rpx;
		background: linear-gradient(90deg, rgb(248, 172, 42), rgb(255, 133, 10));
		width: 200rpx;
		display: flex;
		justify-content: center;
	}

	.add_to_shopping {
		font-size: 28rpx;
		color: rgb(255, 255, 255);
		padding: 18rpx 18rpx 20rpx 34rpx;
		// font-size: 35rpx;
	}

	.rectangle1 {
		border-radius: 0rpx 80rpx 80rpx 0rpx;
		background: linear-gradient(90deg, rgb(251, 81, 82), rgb(251, 27, 28));
		// margin-left: 2rpx;
		padding: 0rpx 42rpx;
	}

	.buy_now {
		font-size: 28rpx;
		color: rgb(255, 255, 255);
		padding-top: 18rpx;
		padding-bottom: 20rpx;
		text-align: center;
	}

	.shop_info {
		margin-top: 15rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background-color: #fff;
		border-radius: 15rpx;
		padding: 20rpx 0 20rpx 30rpx;

		.shop_top {
			width: 690rpx;
			display: flex;
			align-items: flex-start;

			// margin: 0 auto;
			.shop_top_img {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}

			.shop_top_center {
				margin-left: 20rpx;
				height: 90rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.shop_top_centers {
					display: flex;
					align-items: center;

					.shop_top_auth {
						padding: 0 10rpx 0 10rpx;
						border-radius: 10rpx;
						display: flex;
						background-color: red;
						font-size: 24rpx;
						color: #fff;
					}

					.shop_top_text2 {
						margin-left: 10rpx;
						font-size: 24rpx;
						color: #978095;
					}
				}

				.shop_top_text1 {
					font-size: 33rpx;
					font-weight: bold;
				}
			}

		}

		.shop_center {
			margin-top: 20rpx;
			width: 690rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;

			.shop_center_text1 {
				color: #978095;
			}

			.shop_center_xu {
				margin-left: 10rpx;
				height: 20rpx;
				border-left: 1rpx solid #978095;
			}

			.shop_center_text2 {
				margin-left: 10rpx;
				color: #978095;
			}

			.shop_center_common {
				margin-left: 8rpx;
				color: red;
			}
		}

		.shop_bottom {
			margin-top: 30rpx;
			width: 690rpx;
			border-top: 1rpx solid #f3f3f3;
			padding: 20rpx 0 20rpx 0;

			.shop_bottom_top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.shop_bottom_top1 {
					width: 210rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.shop_bottom_img {
						width: 210rpx;
						height: 210rpx;
					}

					.shop_bottom_text {
						margin-top: 10rpx;
						width: 200rpx;
						height: 76rpx;
						display: -webkit-box;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2; //显示两行
					}

					.shop_bottom_text2 {
						width: 100%;
						padding-left: 20rpx;
						margin-top: 10rpx;
						margin-left: -10rpx;
						font-size: 24rpx;
						color: red;
					}
				}
			}
		}
		.shop_fly{
			position: absolute;
			right: 30rpx;
			.shop_btn1,.shop_btn2{
				width: 140rpx;
				height: 50rpx;
				border: 1rpx solid red;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				color: red;
			}
			.shop_btn2{
				margin-top: 10rpx;
			}
		}
	}
	.btn_everys{
		width: 80rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		background-color: #fff;
		border-radius: 25rpx;
	}
	.btn_everys::after{
		border: none;
	}
	.pro_input{
		width: 690rpx;
		margin: 20rpx auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
