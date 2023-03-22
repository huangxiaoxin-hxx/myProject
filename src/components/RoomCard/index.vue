<template>
  <view class="shop-card">
    <view class="flex">
      <image :src="image" class="shop-card-image" />
      <view class="flex1">
        <view class="shop-card-name">{{ name }}</view>
        <view class="shop-card-desc">
          <span v-for="item in desc" :key="item">{{ item }}</span>
        </view>
        <view :class="isUse ? `shop-card-isUse__true` : 'shop-card-isUse__false'">
          {{ isUse ? "消费中" : "空闲中" }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "RoomCard",
  props: {
    image: { type: String, default: '' },
    name: { type: String, default: '' },
    desc: { type: Array, default: () => [] },
    isUse: { type: Boolean, default: false },
  }
}
</script>

<style lang="scss" scoped>
.shop-card {
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx;
  border-radius: 10rpx;
  min-height: 350rpx;
  // box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  overflow: hidden;
  &-image {
    width: 200rpx;
    height: 200rpx;
    margin-right: 20rpx;
  }
  &-name {
    font-size: 32rpx;
    font-weight: 500;
    margin-bottom: 10rpx;
  }
  &-desc {
    width: 100%;
    height: 90rpx;
    overflow: hidden;
    margin-bottom: 10rpx;
    span {
      display: inline-block;
      font-size: 24rpx;
      border-radius: 50rpx;
      border: 1px solid #87CEFA;
      color: #87CEFA;
      padding: 0 10rpx;
      margin-right: 10rpx;
    }
  }
  &-isUse__false {
    width: 150rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    border: 2px solid #87CEFA;
    color: #87CEFA;
    border-radius: 10rpx;
    background: #F0F8FF;
    font-size: 28rpx;
    font-weight: 500;
  }
  &-isUse__true {
    width: 150rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    border: 2px solid #FF7300;
    color: #FF7300;
    border-radius: 10rpx;
    background: rgba(#FF7300, 0.1);
    font-size: 28rpx;
    font-weight: 500;
  }
}
</style>