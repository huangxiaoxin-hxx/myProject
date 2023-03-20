<template>
	<view>
		<topInfo text="忘记密码"></topInfo>
		<view class="gmuel">
			<image :src="hosts+'group_8xah_kejbr1627003315397.png'" class="group_81pd"></image>
			<input placeholder="请输入手机号码" class="please_enter_the" type="number" v-model="form.logmobile">
		</view>
		<view class="rectangle_91sj"></view>
		<view class="ynsgxt">
			<image :src="hosts+'group_36qb_nhqey1627003319681.png'" class="group"></image>
			<input placeholder="请输入验证码" class="please_enter_verification" type="number" v-model="form.code">
			<view class="send_the_verification" @click='setcode'>{{code_text}}</view>
		</view>
		<view class="rectangle_90su"></view>
		<view class="crisp">
			<image :src="hosts+'group_7uqs_lfcae1627003315179.png'" class="group_81pd"></image>
			<input placeholder="请重置登录密码" class="please_enter_the" type="password" v-model="form.password">
		</view>
		<view class="rectangle_90su"></view>
		<view class="crisp">
			<image :src="hosts+'group_7uqs_lfcae1627003315179.png'" class="group_81pd"></image>
			<input placeholder="请确认登录密码" class="please_enter_the" type="password" v-model="form.re_password">
		</view>
		<view class="rectangle_90su"></view>
		<view class="rectangle" @click='sure'>
			<view class="confirm">确认</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				form: {},
				code_text: '发送验证码',
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			sure(){
				
					this.$request('/index/Publics/forget', 'POST', {
							mobile: this.form.logmobile,
							password: this.form.password,
							re_password:this.form.re_password,
							code:this.form.code
						})
						.then(res => {
							console.log(res, ' 看看')
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
							if (res.code == 0) {
								setTimeout(()=>{
									history.back()
								},1000)
							}
						})
				
			},
			setcode() {

				var self = this;
				if (!self.form.logmobile) return uni.showToast({
					icon: "none",
					title: '请输入手机号码'
				})
				if (self.disabled) return
				this.$request("/index/publics/send", "POST", {
						mobile: self.form.logmobile
					})
					.then(res => {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						if (res.code == 0) {
							self.disabled = true;
							var times = 60;
							self.code_text = times + 's';
							var timeover = setInterval(function() {
								times -= 1;
								self.code_text = times + 's';
								if (times <= 0) {
									self.disabled = false;
									self.code_text = '获取验证码';
									clearInterval(timeover);
								}
							}, 1000);
						} else {
							self.disabled = false;
						}
					})

			},
		}
	}
</script>
<style lang="scss" scoped>
	@import "../css/forgot_password.scss";
</style>
