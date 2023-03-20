<template>
	<view>
		<topInfo text="设置中心"></topInfo>
		<view class="rectangle_887hu">
			<view class="lfpwth" @click="$gonext('../../pagesA/setting/personal_setting')">
				<view class="nickname" >个人信息</view>
				<!-- <view class="i_am_sleeping"><input type="text" v-model="nick_name"></view> -->
			</view>
			<view class="rectangle_875cvg" ></view>
			<view class="nygcft" @click="$gonext('../../pagesA/more/security_center')">
				<view class="nickname" >安全中心</view>
				<!-- <view class="nickname">{{vuex_user.id}}</view> -->
			</view>
			<view class="rectangle_875cvg"></view>
			<view class="dculrt" @click="$gonext('../shipping_addres')">
				<view class="nickname" >收货地址</view>
			</view>
<!-- 			<view class="rectangle_875cvg"></view>
			<view class="nygcft" @click="go">
				<view class="nickname">实名认证</view>
			</view> -->
			<view class="rectangle_875cvg"></view>
			<view class="dculrt" @click="$gonext('../../pagesA/more/online_service')">
				<view class="nickname" >在线客服</view>
			</view>
		</view>
		<view class="rectangle" @click="logout()">
			<view class="sign_out" >退出登录</view>
		</view>
		<view class="agqnd"></view>
	</view>
</template>

<script>
	export default {
		methods: {
			go() {
				var ts = this
				// uni.navigateTo({
				// 	url: 'real_name_certification29'
				// })
				// 0未实名 1待审核 2已实名 3实名未通过
				if (this.vuex_user.auth_state == 0) {
					uni.navigateTo({
						url: '/pages/real_name_certification29'
					})
				} else {
					// 成功或失败
					uni.navigateTo({
						url: '/pages/real_name_certification42'
					})
				}
			},
			logout() {
				this.$u.vuex('vuex_token', '')
				this.$u.vuex('vuex_user', '')
				uni.redirectTo({
					url: '../log_in'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../css/personal_setting.scss";

	.lfpwth {
		margin: 30rpx 0 0 20rpx;
	}

	.nickname {
		font-size: 36rpx;
	}
</style>
