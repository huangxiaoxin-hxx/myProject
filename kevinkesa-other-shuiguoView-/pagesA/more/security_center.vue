<template>
	<view>
		<view class="rectangle_2141nwz">
			<topInfo text="安全中心"></topInfo>
			<view class="wezus">
				<view class="wdtvjq" @click="dl=true,tab(1)">
					<view class="login_password" :class="{act:nav==1}">登录密码</view>
					<view class="rectangle_2120jc"></view>
				</view>
				<view class="wdtvjq" @click="dl=false,tab(2)">
					<view class="login_password" :class="{act:nav==2}">资金密码</view>
					<view class="rectangle_2120jc"></view>
				</view>
			</view>
		</view>
		<view class="rectangle_2123ta" v-if="dl">
			<view class="new_password">新密码</view>
			<input placeholder="输入新登录密码" class="enter_new_login" type="password" v-model="form.new">
			<view class="rectangle_2112bnk"></view>
			<view class="confirm_passwor">确认密码</view>
			<input placeholder="确认新登录密码" class="enter_new_login" type="password" v-model="form.next">
			<view class="rectangle_2112bnk"></view>
			<view class="confirm_passwor">验证码</view>
			<view class="lbytcu">
				<input placeholder="输入验证码" class="enter_confirmation" type="number" v-model="form.code">
				<view class="send_the_verification" @click="setcode">{{code_text}}</view>
			</view>
		</view>
		<view class="rectangle_2123ta" v-if="!dl">
			<view class="new_password">新密码</view>
			<input placeholder="输入新资金密码" class="enter_new_login" type="password" v-model="form.new2">
			<view class="rectangle_2112bnk"></view>
			<view class="confirm_passwor">确认密码</view>
			<input placeholder="确认新资金密码" class="enter_new_login" type="password" v-model="form.next2">
			<view class="rectangle_2112bnk"></view>
			<view class="confirm_passwor">验证码</view>
			<view class="lbytcu">
				<input placeholder="输入验证码" class="enter_confirmation" type="number" v-model="form.code2">
				<view class="send_the_verification" @click="setcode">{{code_text}}</view>
			</view>
		</view>
		<view class="kmhvf"></view>
		<view class="rectangle" v-if="!dl" @click='sure'>
			<view class="confirm">确认</view>
		</view>
		<view class="rectangle" v-else @click='sures'>
			<view class="confirm">确认</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				dl: true,
				nav: 1,
				form: {},
				userInfo: '',
				code_text: '发送验证码',
				timeover: '',
				disabled: false
			}
		},
		onLoad() {
		},
		onShow() {

		},
		onUnload() {
			clearInterval(this.timeover);
		},
		methods: {
			payModify() {
				this.$u.api.resetPayPassword({
					new_password: this.form.new,
					// next:this.form.next,
					code: this.form.code
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			passModify() {
				this.$u.api.modify({
					new_password: this.form.new,
					// next:this.form.next,
					code: this.form.code

				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			sure() {
				if(this.form.new2!=this.form.next2){
					uni.showToast({
						icon:'none',
						title:'两次密码不同，请检查后再提交'
					})
					return
				}
				this.$u.api.payPasswordByCode({
					new_password:this.form.new2,
					code:this.form.code2
				}).then(res => {
					console.log('pay',res)
					uni.showToast({
						icon:"none",
						title:res.msg
					})
				}).catch(err => {
					uni.showToast({
						icon:"none",
						title:err.data.msg
					})
					console.log('err',err)
				})
			},
			sures() {
				if(this.form.new!=this.form.next){
					uni.showToast({
						icon:'none',
						title:'两次密码不同，请检查后再提交'
					})
					return
				}
				this.$u.api.passwordByCode({
					new_password: this.form.new,
					code: this.form.code
				}).then(res => {
					console.log('pass',res)
					this.$u.vuex('vuex_token', '')
					this.$u.vuex('vuex_user', '')
					uni.setStorageSync('password', '')
					uni.showToast({
						icon:"none",
						title:res.msg
					})
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pages/log_in'
						})
					},1500)
				}).catch(err => {
					uni.showToast({
						icon:"none",
						title:err.data.msg
					})
					console.log('err',err)
				})
			},
			tab(u) {
				this.nav = u
			},
			setcode() {
				if (!this.disabled) {
						
						this.$u.api.sendCodeWith().then(res=>{
							console.log(res)
							uni.showToast({
								icon:"none",
								title:res.msg
							})
							if (res.code == 200) {
								this.disabled = true;
								var times = 60;
								this.code_text = times + 's';
								this.timeover = setInterval(() => {
									times -= 1;
									this.code_text = times + 's';
									console.log(times)
									if (times <= 0) {
										this.disabled = false;
										this.code_text = '获取验证码';
										clearInterval(this.timeover);
									}
								}, 1000);
							} else {
								this.disabled = false;
							}
						}).catch(err=>{
							console.log(err)
							uni.showToast({
								icon:"none",
								title:err.data.msg
							})
						})
						
				} else {
					uni.showToast({
						icon: 'none',
						title: '请勿频繁操作'
					});
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/css/security_center.scss";
</style>
