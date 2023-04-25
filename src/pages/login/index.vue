<template>
  <CommonPage navBarTitle="登录" :loading="loading">
    <view class="container">
      <image src="@/static/logo.jpeg" class="logo"></image>
      <view class="login-button">
        <u-button
        text="立即登录"
        shape="circle"
        color="linear-gradient(to right, rgb(66, 83, 216), #87CEFA)"
        @click="handleUserInfo"
      ></u-button>
      </view>
    </view>
  </CommonPage>
</template>

<script>
import { mapMutations } from 'vuex'
import { postLogin, postUserProfile } from '@/serve/api'
import { setStorage } from '@/utils'
export default {
  provider: 'weixin',
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapMutations('user', ['setUserInfo', 'setToken']),
    handleUserInfo() {
      this.loading = true
      uni.login({
        provider: "weixin",
        onlyAuthorize: true,
         success: async (res) => {
          // todo 将code值传给后端
          const { openid } = await postLogin({code: res.code})
          uni.getUserInfo({
            provider: 'weixin',
            success: async (infoRes) => {
              const { encryptedData, iv } = infoRes
              const userInfo = await postUserProfile({
                openid,
                encryptedData,
                iv
              })
              setStorage('token', userInfo.token)
              this.setToken(userInfo.token)
              this.setUserInfo(userInfo.user)
              this.loading = false
              if(!userInfo.mobile) {
                this.handleNavTo({ url: '/pageUser/inputUserInfo/index' })
              } else {
                this.handleNavBack();
              }
              
            },
            fail: (err) => {
              console.log(err)
            }
          });
        },
        fail: async (err) => {
          this.handleNavBack();
        },
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  .logo {
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
    margin-top: 200rpx;
    margin-bottom: 150rpx;
  }
  .login-button {
    width: 80%;
    height: 88rpx;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
