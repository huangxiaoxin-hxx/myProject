<template>
	<block>
		<view class="body">
		<view class="xuanze">
			<u-icon name="search" size="36"></u-icon>
			<view class="xuanze_input">
				<u-input v-model="value" type="text"  :border="false" />
			</view>
		</view>
		<text class="texts" @click="search()">搜索</text>
	</view>
	
	<view class="lat" v-for="(item,index) of list" :key="item.id" @click="go(item.id)">
		<view class="lat_top">{{item.name}}</view>
		<view class="lat_bottom">{{item.extend.address}}</view>
	</view>
	
	<loadding v-if="page==last_page&&isTrue"></loadding>
	</block>
	
</template>

<script>
	export default{
		data(){
			return{
				value:'',
				list:'',
				page:1,
				last_page:1,
				isTrue:false
			}
		},
		methods:{
			search(){
				this.$u.api.shopList({
					page:this.page,
					limit:20,
					keyword:this.value
				}).then(res=>{
					this.isTrue = true
					this.last_page = res.data.last_page
					if(this.goList){
						this.list.push({...res.data.data})
						this.goList = false
					}else{
						this.list = res.data.data
					}
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			go(e){
				uni.setStorageSync('id',e)
				uni.switchTab({
					url:'/pages/tabbar/mallMenu/index'
				})
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: async function() {
			if (!this.pullUpOn) return;
		
			if (this.page >= this.last_page) {
				this.pullUpOn = false
			} else {
				this.goList = true
				this.page = this.page + 1;
				this.search()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.body{
		display: flex;
		align-items: center;
		.xuanze{
		width: 620rpx;
		padding-left: 30rpx;
		margin-left: 30rpx;
		display: flex;
		align-items: center;
		border-radius: 30rpx;
		background-color: #f6f6f6;
		.xuanze_input{
			width: 100%;
			margin-left: 30rpx;
			padding-right: 30rpx;
		}
	}
	.texts{
		font-size: 28rpx;
		color: #888888;
		margin-left: 20rpx;
	}
	}
	.lat{
		width: 690rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #d5d8db;
		margin: auto;
		.lat_top{
			
		}
		.lat_bottom{
			margin-top: 10rpx;
			font-size: 24rpx;
			color: silver;
		}
	}
</style>