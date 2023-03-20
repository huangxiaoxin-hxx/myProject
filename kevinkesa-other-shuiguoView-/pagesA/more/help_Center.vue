<template>
	<view class="help_body">
		<view class="helps" v-for="(item,index) of list" :key="index">
			<view class="helps_title">{{item.title}}</view>
			<view class="helps_content">
				<rich-text :nodes="item.content"></rich-text>
			</view>
			<view class="helps_time">{{item.create_time}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				this.$u.api.noticeList({
					cate_id: 2
				}).then(res => {
					this.list = res.data.data
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.help_body {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
		padding-top: 1rpx;
		.helps {
			margin:20rpx auto;
			width: 710rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 15rpx;
			.helps_title {
				font-size: 30rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
			}

			.helps_content {
				
			}

			.helps_time {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				font-size: 24rpx;
				margin-top: 10rpx;
				color: darkgray;
			}
		}


	}
</style>
