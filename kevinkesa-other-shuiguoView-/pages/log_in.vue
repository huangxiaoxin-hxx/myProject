<template>
  <view class="container" >
    <!-- <view class="title">style="background: url(https://appapi.xiaozhuan.net.cn/static/mini/log_in_33zgo_lqetj1627003318342.png);"注册卡车侠，免费发货找货</view>-->
		<view style="width: 100%;display: flex;justify-content: center;margin-bottom: 30rpx;">
			<image :src="pstt+'img/index/xiong.png'" class="login_img" >
		</view>
    <button v-if="show" open-type="getUserInfo" @click="login" class="login_btn">同意协议并使用账号一键登录</button>
		<button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="login_btn">手机号授权登录</button>
    <u-checkbox-group @change="agreeChange" >
      <view class="flex flex_start mb20" @click="checkboxChange">
        <u-checkbox active-color="#daa96f" v-model="agrees" shape="circle" color="#daa96f" scaleRatio="1"
          borderColor="#daa96f" >
        </u-checkbox>
        <view class="tui-text">
          <!-- 首次登录自动注册卡车侠账号，且已阅读并 同意 -->
          <text class="protocol" @click="viewProtocol('1')">《用户服务协议》</text>
          <text class="protocol" @click="viewProtocol('2')">《个人信息保护政策》</text>
          <!-- <text class="protocol" @click="viewProtocol('3')">《账号关联协议》</text> -->
        </view>
      </view>
      <!-- <view class="flex flex_start">
        <tui-checkbox value="agree2" color="#3d78ee" scaleRatio="1"
          borderColor="#999">
        </tui-checkbox>
        <view class="tui-text">
          已同意并阅读
          <text class="protocol" @click="viewProtocol('4')">《第三方合作清单》</text>
        </view>
      </view> -->
    </u-checkbox-group>
		
		<!--居中消息-->
		<tui-tips  ref="toast" position="center"></tui-tips>
		
  </view>
</template>

<script>
// import tuiLabel from '../../../components/thorui/tui-label/tui-label.vue'
export default {
  name: "login",
  data() {
    return {
      agree: [],
			types:0   ,//会员选择的类型：0待选择1货主2车主
			show:true,
			pstt:'',
			agrees:true
    }
  },
	beforeMount() {
		
		console.log('进入登录页面')
		if(this.vuex_user.header){
			if(this.vuex_user.mobile==''){
				this.show = false
			}
		}
		
		
	},
	onLoad() {
		this.pstt = this.hosts
	},
  methods: {
		checkboxChange(){
			console.log('taoge')
			this.agrees = !this.agrees
		},
		popup(e){
			console.log(e)
		},
		getPhoneNumber(e) {
			if(!this.agrees) {
			  uni.showToast({
			  	icon:"none",
			  	title: '请勾选用户注册/登录协议'
			  })
			  return
			}
			console.log(e,'lliufdosjf中国人')
			this.$u.api.getPhoneNumber({
				code: e.detail.code,
				openid: this.vuex_user.mini_openid
			}).then(res => {
				this.$u.vuex('vuex_user', res.data);
				this.getinfo()
				uni.navigateBack({})
			})
		},
    async login() {
      if(!this.agrees) {
        uni.showToast({
					icon:"none",
        	title: '请勾选用户注册/登录协议'
        })
        return
      }
      const userLogin = new Promise((resolve, reject) => {
        uni.login({
          success (res) {
						console.log('调起login success',res)
            resolve(res.code)
          },
          fail (err) {
						console.log('调起login fail',res)
            reject(err)
          }
        })
      })
      const UserProfile = new Promise((resolve, reject) => {
        uni.getUserProfile({
          lang: 'zh_CN',
          desc: '注册用户信息使用',
          success: (res) => {
						console.log('调起getUserProfile success',res)
            resolve(res)
          },
          // 失败回调
          fail: (err) => {
						console.log('调起getUserProfile fail',res)
            reject(err)
          }
        })
      })
      userLogin.then(async (loginRes) => {
				console.log('look me',loginRes)
        const { data } = await this.$u.api.getOpenId({code: loginRes})
        this.$u.vuex('vuex_token', data.openid)
        UserProfile.then(async (res) => {
					console.log('--------->')
					console.log(res)
          const result = await this.$u.api.getUserProfile({
            encryptedData: res.encryptedData,
            iv: res.iv,
            openid: data.openid,
						//user_type:this.types   ,//会员选择的类型：0待选择1货主2车主
						//推荐人id
						parent_id:uni.getStorageSync('shareId')?uni.getStorageSync('shareId'):'',
						//活动id
						active_id:uni.getStorageSync('shareActiveId')?uni.getStorageSync('shareActiveId'):'',
          })
          return result.data
        }).then(data => {
          console.log(data)
          this.$u.vuex('vuex_user', data);
					this.getinfo()
					if(this.vuex_user.mobile==''){
						this.show = false
					}else{
						uni.navigateBack({
							
						})
					}
          
        }).catch(err=>{
					console.log(err,'err')
					uni.showToast({
						title:'授权失败'
					})
					// this.showTips('授权失败')
				})
      })
    },
		getinfo(){
			this.$u.api.getInfo().then(res=>{
				console.log(res,'个人信息')
				this.$u.vuex('vuex_user',res.data)
			}).catch(err=>{
				console.log(err)
			})
		},
    viewProtocol(data) {
      console.log('???', data)
				uni.navigateTo({
					url:'/pagesA/more/userAgree?types=' + data
				})
      // this.handleNavTo({url: ''})
    },
    agreeChange(e) {
      this.agree = e.detail.value
    },
		//uni-app 方法调用
		showTips: function(e) {
			let options = {
				msg: e,
				duration: 2000
			};
			this.$refs.toast.showTips(options);
		}
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
	// height: 100vh;
  padding: 66rpx 30rpx 0;
  .title {
    height: 44rpx;
    font-size: 36rpx;
    font-family: Roboto-Condensed Regular, Roboto;
    font-weight: normal;
    color: #595959;
    line-height: 44rpx;
    text-align: center;
  }
  .login_img {
    width: 200rpx;
    height: 200rpx;
    // margin-bottom: 50rpx;
		margin: auto;
  }
  .login_btn {
    width: 690rpx;
    height: 66rpx;
    background: #daa96f;
    font-size: 30rpx;
    font-family: Roboto-Condensed Regular, Roboto;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 88rpx;
    // margin-bottom: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30rpx;
  }
  .tui-text {
		margin-top: 30rpx;
    font-size: 28rpx;
    font-family: Roboto-Condensed Regular, Roboto;
    font-weight: normal;
    color: #595959;
    line-height: 40rpx;
    position: relative;
    top: -6rpx;
    padding-left: 20rpx;
    box-sizing: border-box;
  }
  .protocol {
    color: #daa96f;
  }
}
</style>