<template>
	<view class="pay_bodys">
		<view style="height: 1rpx;" ></view>
		<view class="pay_common" v-for="(item,index) in list" :key="item.id">
			<view class="pay_top">
				<text class="pay_top_left" :style="item.num>0?'color:#41a863;':''">{{item.num+item.name_text}}</text>
				<text class="pay_top_right">{{item.create_time}}</text>
			</view>
			<view class="pay_bottom">
				<text class="pay_bottom_left">{{item.msg}}</text>
				<text class="pay_bottom_right"></text>
			</view>
		</view>
		<loadding v-if="page==last_page"></loadding>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				last_page:1,
				list:[],
				goList:false
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList(){
				this.$u.api.pointsLog({
					points_type:'user_money',
					limit:20,
					page:this.page
				}).then(res=>{
					this.last_page = res.data.last_page
					if(this.goList){
						this.list.push({...res.data.data})
						this.goList = false
					}else{
						this.list = res.data.data
					}
					console.log(res,'yaohao')
				}).catch(err=>{
					console.log(err)
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
				this.getList()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.pay_bodys{
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
		.pay_common{
			width: 690rpx;
			margin: 20rpx auto;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 15rpx;
			display: flex;
			flex-direction: column;
			.pay_top,.pay_bottom{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;
			}
			.pay_top{
				
				.pay_top_left{
					color: red;
				}
				.pay_top_right{
					font-size: 26rpx;
					color: silver;
				}
			}
			.pay_bottom{
				margin-top: 10rpx;
				.pay_bottom_left{
					width: 100%;
				color: gray;
				display:-webkit-box;
				overflow:hidden;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:1; //显示两行
				}
				.pay_bottom_right{
					// width: 500rpx;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
</style>