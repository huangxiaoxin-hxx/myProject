<template>
	<view>
		<view class="common" v-for="(item,index) of List" :key="item.id">
			<view class="com_top">
				<image class="com_img" :src="item.thumb_photo"></image>
				<view class="com_right">
					<view class="com_title">{{item.name}}</view>
					<view class="com_way">价格：{{item.price}}</view>
					<view class="com_cun">库存：{{item.number}}</view>
				</view>
			</view>
			<view class="com_btn">
				当前状态：{{item.state?'上架中':'下架'}}
				<view class="com_right">
					<view class="btn" style="margin-right: 20rpx;" @click="$gonext('/pagesA/more/editGoods?id='+item.id)">修改</view>
					<view class="btn1" style="margin-right: 20rpx;" v-if="item.state!=1" @click="change(item,1)">上架</view>
					<view class="btn" style="margin-right: 20rpx;" v-else @click="change(item,0)">下架</view>
					<view class="btn" @click="$gonext('/pagesA/more/guige?id='+item.id)">规格</view>
				</view>
				<!-- <view class="btn">修改</view> -->
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		<view class="add" @click="$gonext('/pagesA/more/editGoods?type=1')">添加商品</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				List:[]
			}
		},
		// onLoad() {
		// 	this.getList()
		// },
		onShow() {
			this.getList()
		},
		methods:{
			change(item,i){
				this.$u.api.changeState({
					id:item.id,
					state:i
				}).then(res=>{
					console.log(res);
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.getList()
				}).catch(err=>{
					console.log(err);
					uni.showToast({
						title:err.data.msg,
						icon:'none'
					})
				})
			},
			getList(){
				this.$u.api.shopGoodsList().then(res=>{
					console.log(res);
					this.List = res.data
				}).catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.common{
		width: 690rpx;
		margin: 20rpx auto;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #f2f2f2;
		border-radius: 20rpx;
		.com_top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 20rpx;
			
			border-bottom: 1rpx solid #fff;
			.com_img{
				max-width: 160rpx;
				height: 160rpx;
				border-radius: 15rpx;
			}
			.com_right{
				width: 100%;
				margin-left: 20rpx;
				height: 160rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.com_title{
					width: 100%;
					display:-webkit-box;
					overflow:hidden;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2; //显示两行
					font-size: 30rpx;
					font-weight: bold;
				}
				.com_way{
					color: red;
					font-size: 26rpx;
				}
				.com_cun{
					color: lightseagreen;
					font-size: 26rpx;
				}
			}
		}
		.com_btn{
			margin-top: 20rpx;
			width: 100%;
			display: flex;
			align-items: center;
			// justify-content: flex-end;
			justify-content: space-between;
			color: red;
			.com_right{
				display: flex;
				
				.btn1,.btn{
				padding: 0 30rpx;
				height: 45rpx;
				border-radius: 12rpx;
				border: 1rpx solid tomato;
				font-size: 28rpx;
				// color: ;
				font-weight: bold;
				display: flex;
				align-items: center;
				justify-content: center;
				}
			}
			
		}
	}
	.add{
		position: fixed;
		bottom: 30rpx;
		left: 0;
		right: 0;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: bold;
		background: linear-gradient(90deg, rgb(255, 71, 77), rgb(254, 136, 58));
		width: 690rpx;
		height: 100rpx;
		border-radius: 15rpx;
	}
</style>