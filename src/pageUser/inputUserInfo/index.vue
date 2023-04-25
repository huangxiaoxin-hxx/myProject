<template>
  <view class="container">
    <view class="backHome" v-if="isMobile" @click="handleNavTo({ type: 'switchTab', url: '/pages/home/index'})">回到主页</view>
    <view class="title">微信授权登录 获取全面服务</view>
    <view class="dsc">授权后可预约房间等服务</view>
    <view class="card">
      <view class="label">01</view>
      <u-icon name="account" color="#000" size="36"></u-icon>
      <view class="flex1 ml-20">授权头像信息</view>
      <button class="empower" @click="empowerAvatar" open-type="chooseAvatar" v-if="!isAvatar">
        去授权
      </button>
      <view class="empower-text" v-else>已授权</view>
    </view>
    <view class="card">
      <view class="label">02</view>
      <u-icon name="edit-pen" color="#000" size="36"></u-icon>
      <view class="flex1 ml-20">授权昵称信息</view>
      <button class="empower" @click="showNickname = true" v-if="!isNickName">去授权</button>
      <view class="empower-text" v-else>已授权</view>
    </view>
    <view class="card">
      <view class="label">03</view>
      <u-icon name="phone" color="#000" size="36"></u-icon>
      <view class="flex1 ml-20">授权手机号信息</view>
      <button class="empower" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" v-if="!isMobile">去授权</button>
      <view class="empower-text" v-else>已授权</view>
    </view>
    <CommonInputName :show="showNickname" @cancel="handleNicknameCancel" @confirm="handleSaveNickname"/>
  </view>
</template>

<script>
import { getUserPhone } from "@/serve/api";
import { mapState, mapActions } from 'vuex';
export default {
  name: "InputUserInfo",
  data() {
    return {
      showNickname: false,
      isAvatar: false,
      isNickName: false,
      isMobile: false,
    }
  },
  methods: {
    ...mapActions("user", ["updateUserInfo"]),
    async empowerAvatar(data) {
      uni.showLoading({title: '提交中'})
      await this.updateUserInfo({ header: data.detail.avatarUrl });
      this.isAvatar = true
      uni.hideLoading()
    },
    async handleSaveNickname(nickname) {
      this.showNickname = false
      uni.showLoading({title: '提交中'})
      await this.updateUserInfo({ nick_name: nickname });
      this.isNickName = true
      uni.hideLoading()
    },
    async onGetPhoneNumber(e){  
      if(e.detail.errMsg=="getPhoneNumber:fail user deny"){       //用户决绝授权  
          //拒绝授权后弹出一些提示  
        this.handleMessage({title: "您拒绝了授权"})
        return;
      }
      console.log(e)
      const data = await getUserPhone({ code: e.detail.code, openid: this.userInfo.mini_openid });
      console.log(data.mobile)
      uni.showLoading({title: '提交中'})
      await this.updateUserInfo({ mobile: data.mobile });
      this.isMobile = true
      uni.hideLoading()
    },
    handleNicknameCancel() {
      this.showNickname = false
    },
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  onShow() {
    if(this.userInfo.nick_name !== '微信用户' && this.userInfo.nick_name) {
      this.isNickName = true
    } 
    if(this.userInfo.mobile !== "") {
      this.isMobile = true
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  padding-top: 200rpx;
  .backHome {
    position: absolute;
    top: 100rpx;
    height: 48rpx;
    width: 140rpx;
    background: #87cefa;
    color: #fff;
    border-radius: 50rpx;
    text-align: center;
    line-height: 48rpx;
    font-size: 28rpx;
    left: 40rpx;
  }
  .title {
    font-size: 40rpx;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20rpx;
  }
  .dsc {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    text-align: center;
    margin-bottom: 200rpx;
  }
  .card {
    width: 90%;
    height: 200rpx;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    left: 5%;
    display: flex;
    padding: 0 40rpx;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    .label {
      position: absolute;
      left: 0;
      top: 6rpx;
      width: 80rpx;
      height: 40rpx;
      background: rgba(#87cefa, 0.2);
      color: #87cefa;
      text-align: center;
      line-height: 40rpx;
      font-size: 24rpx;
      font-weight: 500;
    }
    .empower {
      width: 150rpx;
      height: 68rpx;
      background: #87cefa;
      color: #fff;
      border-radius: 50px;
      font-size: 28rpx;
    }
    .empower-text {
      color: #87cefa;
      font-size: 28rpx;
      font-weight: normal;
    }
  }
}
</style>
