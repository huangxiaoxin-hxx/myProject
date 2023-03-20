<template>
	<view class="main">

		<view class="tmgjku">
			<!-- 状态栏高度 -->
			<view :style="'height:'+wHeight+'rpx;'"></view>
			<image :src="hosts+'return_gshtb1627003647791.png'" @click="back" class="enhrst" style="margin-top: -5rpx;">
			</image>
		</view>
		<view class="epmnxy">
			<swiper autoplay="true" circular="true" interval="3000" duration="500" :indicator-dots="true"
				indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in info.image_arr">
					<image :src="item" mode="heightFix"></image>
				</swiper-item>
			</swiper>
			<view class="pcqxo"></view>
		</view>
		<view class="rectangle_2735hj">
			<view class="estee_lan_division">{{info.title}}</view>
			<view class="genuine_guarantee">正品保障·急速发货</view>
			<view class="ya2712zph">￥{{info.price}}</view>
		</view>
		<view class="rectangle_2734mo" @click="show1 = true">
			<view class="scguzt" v-if="details1!=''">
				<view class="selected">已选</view>
				<view class="face_cream_ml">{{details1}}</view>
			</view>
			<view v-else class="margin-l10">请选择你需要的规格</view>
			<image :src="hosts+'xamlos.png'" class="spnxg"></image>
		</view>
		<view class="product_details">-商品详情-</view>

		<!-- <view class="wechat_screensho" v-html="info.content"></view> -->

		<u-parse :html="info.details"></u-parse>

		<view class="kdtqy"></view>
		<view class="rectangle_2711eh">
			<view class="dyjab" @click="$gonext('../shopCart/shopping_cart')">
				<u-icon label="购物车" label-pos="bottom" size="40" name="shopping-cart"></u-icon>
				<!-- <view class="customer_servic">购物车</view> -->
			</view>
			<view class="kuolp">
				<view class="rectangle_2709jnb" @click="addShop(false)">
					<view class="add_to_shopping">加入购物车</view>
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
						<image :src="hosts+'shut_down_heipw1627003989791.png'" class="uvhfd" @click="show1 = !show1">
						</image>
						<view class="zlgxp">
							<view class="dc2772kv">￥{{price?price:info.price}}</view>
							<view class="selected_cream_m" v-if="details1">{{details1}}</view>
							<!-- <view class="selected_cream_m" v-else-if="title2">{{title2}}</view> -->
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
							<image :src="hosts+'group_2745dp_bhcuv1627003977774.png'" alt=""
								style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;">
							</image>
							<view class="ev2746qn" @click='changeNum(0)'>-</view>
						</view>
						<view class="sg2753ar">{{form.number}}</view>
						<view class="pbygxh">
							<image :src="hosts+'group_2743os_drzpl1627003976321.png'" alt=""
								style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;">
							</image>
							<view class="cq2744jx" @click='changeNum(1)'>+</view>
						</view>
					</view>
				</view>
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
					number: '1'
				},
				info: {},
				speclist: [],
				show1: false,
				price: 0,
				wHeight: '',
				details: [], //详情数据
				details1: '', //详情数据字符串
				img: ''
			}
		},
		onLoad(op) {
			this.form.goods_id = op.id
			// console.log('op', this.host)
			// this.form.goodsid = op.id

			this.huoqu()

			// this.$request("/index/Shop/goodsDetail", "POST", {
			// 		goodsid: op.id
			// 	})
			// 	.then(res => {
			// 		console.log(res)
			// 		if (res.code == 0) {
			// 			this.info = res.info
			// 			this.speclist = res.info.speclist
			// 		}
			// 	}).catch(err=>{
			// 		console.log(err)
			// 	})
			// #ifdef APP-PLUS
			this.wHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		onShow() {

		},
		methods: {
			huoqu(){
				this.$u.api.goodsInfo({
					id: this.form.goods_id
				}).then(res => {
					console.log('taoge', res)
					this.info = res.data
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: err.msg
					})
				})
			},
			//加入购物车
			addShop(type) {
				this.form.sku_id?this.form.sku_id:this.form.sku_id=0
				console.log('look',this.form)
				this.$u.api.cartAdd({
					...this.form
				}).then(res => {
					console.log('taoge', res)
					this.form.number = 1
					this.$tips(res.msg)
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
				uni.navigateBack({})
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
					this.form.number < this.info.number ? this.form.number++: this.$tips("已达最大库存")
				} else {
					this.form.number == 1 ? this.$tips('不能在减少了') : this.form.number--
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/css/product_details.scss";
</style>
