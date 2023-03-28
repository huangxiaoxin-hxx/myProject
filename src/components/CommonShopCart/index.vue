<template>
  <view class="shop-cart flex">
    <view class="font-12"
      >总价
      <span class="price"
        ><span class="font-12">¥</span
        >{{ totalPrice || 0 }}</span
      >
    </view>
    <view class="order" @click="handleOrder">下单</view>
  </view>
</template>

<script>
export default {
  name: "ShopCart",
  props: {
    shopList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    totalPrice() {
      let total = 0
      this.shopList.forEach(item => {
        total += item.price * item.number
      });
      console.log(this.shopList)
      return total
    }
  },
  methods: {
    handleOrder() {
      // todo 下单
      console.log(this.shopList)
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-cart {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 20rpx;
  justify-content: space-between;
  align-items: center;
  height: 120rpx;
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
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
}
</style>
