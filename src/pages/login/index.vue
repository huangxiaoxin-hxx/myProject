<template>
  <CommonPage navBarTitle="登录">
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
  methods: {
    ...mapMutations('user', ['setUserInfo', 'setToken']),
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
              setStorage('token', userInfo.token)
              this.setToken(userInfo.token)
              this.setUserInfo(userInfo.user)
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
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
