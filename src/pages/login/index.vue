<template>
  <CommonPage navBarTitle="登录">
    <view class="container">
      <image src="@/static/logo.jpeg" class="logo"></image>
      <u-button
        text="立即登录"
        shape="circle"
        class="login-button"
        color="linear-gradient(to right, rgb(66, 83, 216), #87CEFA)"
        @click="handleUserInfo"
      ></u-button>
    </view>
  </CommonPage>
</template>

<script>
import { postLogin, postUserProfile } from '@/serve/api'
export default {
  provider: 'weixin',
  methods: {
    handleUserInfo() {
      uni.login({
        provider: "weixin",
        onlyAuthorize: true,
         success: async (res) => {
          // todo 将code值传给后端
          const { openid } = await postLogin({code: res.code})
          console.log(openid)
          uni.getUserInfo({
            provider: 'weixin',
            success: async (infoRes) => {
              console.log('用户昵称为：' + JSON.stringify(infoRes));
              const { encryptedData, iv } = infoRes
              const userInfo = await postUserProfile({
                openid,
                encryptedData,
                iv
              })
              console.log(userInfo)
              this.handleNavBack();
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
  }
}
</style>
