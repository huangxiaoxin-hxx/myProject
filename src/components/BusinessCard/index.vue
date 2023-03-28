<template>
  <view class="business_card">
    <view class="flex">
      <image :src="image" class="image" />
      <view class="info flex1">
        <view class="name">{{ name }}</view>
        <view class="flex"
          ><u-icon size="14" name="map-fill"></u-icon><span class="ml-10">{{ distance }}</span></view
        >
        <view class="timer">营业时间：{{ timer }}</view>
        <view class="timer">地址：{{ address }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "BusinessCard",
  props: {
    name: { type: String, default: null },
    image: { type: String, default: null },
    distance: { type: String, default: null },
    timer: { type: String, default: null },
    address: { type: String, default: null },
    business_id: { type: String | Number, default: null },
  },
};
</script>

<style lang="scss" scoped>
.business_card {
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx;
  border-radius: 10rpx;
  min-height: 280rpx;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  image {
    width: 220rpx;
    height: 220rpx;
  }
  .info {
    margin-left: 20rpx;
    .name {
      font-weight: 600;
      font-size: 32rpx;
      margin-bottom: 5rpx;
    }
    .timer {
      font-size: 28rpx;
      margin-bottom: 10rpx;
    }
  }
}
</style>
