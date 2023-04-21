<template>
  <view class="payBox flex">
    <view class="font-12 flex1"
      >总价
      <span class="price"
        ><span class="font-12">¥</span>{{ totalPrice || 0 }}</span
      >
    </view>
    <view class="order" @click="handleOrder">下单</view>
  </view>
</template>

<script>
import { postPayOrder } from '@/serve/api'
import { weixinPay } from '@/utils/pay'
export default {
  name: "CommonPay",
  props: {
    totalPrice: { type: Number | String, default: 0 },
    order_sn: {type: String, default: null}
  },
  methods: {
    async handleOrder() {
      uni.showLoading({title: '支付加载中'})
      try {
        const res = await postPayOrder({ order_sn: this.order_sn })
        const success = (res) => {
          this.handleMessage({title: '支付成功'})
        }
        const { nonceStr, package: packageId, timeStamp, paySign, signType} = res
        weixinPay({
          timeStamp, nonceStr, packageId, signType, paySign, success
        })
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.payBox {
  justify-content: space-around;
  padding: 0 20rpx;
  align-items: center;
  height: 100%;
  .price {
    color: $uni-color-error;
    font-size: 48rpx;
    font-weight: 600;
    margin-left: 10rpx;
  }
  .order {
    margin: 0;
    height: 68rpx;
    width: 150rpx;
    background: $uni-color-error;
    text-align: center;
    line-height: 68rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #fff;
    border-radius: 20rpx;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
}
</style>
