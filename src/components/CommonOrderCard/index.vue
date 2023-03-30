<template>
  <view class="order-card">
    <view class="order-card-header flex mb-10">
      <view class="business-name flex1">{{ orderData.business_name }}</view>
      <view class="state mr-10">{{ orderData.state }}</view>
      <u-icon name="trash" size="18"></u-icon>
    </view>
    <view class="order-card-content">
      <view
        class="order-card-content-item flex"
        v-for="item in orderData.shop_list || []"
        :key="item.id"
      >
        <u-image
          :src="item.order_image"
          width="120rpx"
          height="120rpx"
          radius="4"
          :lazy-load="true"
        ></u-image>
        <view class="shop-name">{{ item.shop_name }}</view>
        <view class="shop-number">
          <span class="price-color font-14 mr-10">¥{{ item.price }}</span>
          x{{ item.number }}
        </view>
      </view>
    </view>
    <view class="order-card-total-price font-14">
      {{ `共 ${orderData.shop_number} 件商品 总计：` }}
      <span class="price-color font-14">¥{{ orderData.total_price }}</span>
    </view>
    <view class="order-card-footer">
      <view class="order-card-footer-btn" v-if="orderData.state === '待支付'">
        <u-button type="primary" :plain="true" text="去支付" size="small"></u-button>
      </view>
      <view class="order-card-footer-btn" v-if="orderData.state === '未使用'">
        <u-button type="error" :plain="true" text="去使用" size="small"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "OrderCard",
  props: {
    orderData: { type: Object, default: () => {} },
  },
};
</script>

<style lang="scss" scoped>
.order-card {
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  &-header {
    .business-name {
      font-size: 28rpx;
    }
    .state {
      color: #aaa;
      font-size: 28rpx;
    }
  }
  &-content {
    background: #f1f1f1;
    padding: 20rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    &-item {
      margin-bottom: 15rpx;
      .shop-name {
        flex: 1;
        font-size: 28rpx;
        margin-left: 20rpx;
      }
      .shop-number {
        align-self: flex-end;
        font-size: 28rpx;
      }
    }
  }
  &-total-price {
    text-align: right;
    margin-bottom: 20rpx;
  }
  &-footer {
    display: flex;
    flex-direction: row-reverse;
    &-btn {
      width: 120rpx;
    }
  }
}
</style>
