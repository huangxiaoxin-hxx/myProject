<template>
  <view class="order-card">
    <view class="order-card-header flex mb-10">
      <view class="business-name flex1">{{ orderData.shop.name }}</view>
      <view class="state mr-10">{{ orderData.pay_state_text }}</view>
      <u-icon name="trash" size="18"></u-icon>
    </view>
    <view class="order-card-content">
      <view class="order-card-content-item flex">
        <u-image
          :src="orderData.room_info && orderData.room_info.image"
          width="120rpx"
          height="120rpx"
          radius="4"
          :lazy-load="true"
        ></u-image>
        <view class="shop-name">{{
          orderData.room_info && orderData.room_info.name
        }}</view>
      </view>
    </view>
    <view class="order-card-total-price font-14">
      <!-- {{ `共 ${orderData.shop_number} 件商品 总计：` }} -->
      总计：
      <span class="price-color font-14">¥{{ orderData.order_total }}</span>
    </view>
    <view class="order-card-footer">
      <view class="order-card-footer-btn ml-20">
        <u-button
          type="primary"
          :plain="true"
          text="查看详情"
          size="small"
          @click="
            handleNavTo({
              url: '/pageOrder/orderDetail/index?id=' + orderData.id,
            })
          "
        ></u-button>
      </view>
      <view class="order-card-footer-btn" v-if="orderData.pay_state === 0">
        <u-button
          type="primary"
          :plain="true"
          text="去支付"
          size="small"
          @click="handlePay"
        ></u-button>
      </view>
      <view class="order-card-footer-btn" v-if="orderData.pay_state === 2 && orderData.order_state === 0 ">
        <u-button
          type="error"
          :plain="true"
          text="退款"
          size="small"
          @click="handleRefund"
        ></u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { postPayOrder, refundRoomOrder } from "@/serve/api";
import { weixinPay } from "@/utils/pay";
export default {
  name: "OrderCard",
  props: {
    orderData: { type: Object, default: () => {} },
  },
  methods: {
    async handlePay() {
      uni.showLoading({ title: "支付加载中" });
      try {
        const res = await postPayOrder({ order_sn: this.orderData.order_sn });
        const success = (res) => {
          this.handleMessage({ title: "支付成功" });
          this.$emit("changeOrder");
        };
        const {
          nonceStr,
          package: packageId,
          timeStamp,
          paySign,
          signType,
        } = res;
        weixinPay({
          timeStamp,
          nonceStr,
          packageId,
          signType,
          paySign,
          success,
        });
      } catch (error) {
        console.log(error);
      } finally {
        uni.hideLoading();
      }
    },
    handleRefund() {
      uni.showModal({
        content: "退款需要扣除20%的手续费，是否要退款",
        success: async (data) => {
          if (data.cancel) {
            return;
          } else {
            uni.showLoading({ title: "退款中" });
            console.log("???");
            try {
              await refundRoomOrder({ id: this.orderData.id });
              this.handleMessage({ title: "退款成功" });
              this.$emit("changeOrder");
            } finally {
              uni.hideLoading();
            }
          }
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
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
