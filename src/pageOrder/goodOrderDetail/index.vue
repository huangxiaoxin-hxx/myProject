<template>
  <CommonPage navBarTitle="订单详情">
    <view class="container">
      <view class="order-card-content">
        <view
          class="order-card-content-item flex"
          v-for="item in orderInfo.orderGoods || []"
          :key="item.id"
        >
          <u-image
            :src="item.photo"
            width="120rpx"
            height="120rpx"
            radius="4"
            :lazy-load="true"
          ></u-image>
          <view class="shop-name">{{ item.goods.name }}</view>
          <view class="shop-number">
            <span class="price-color font-14 mr-10">¥{{ item.price }}</span>
            x{{ item.number }}
          </view>
        </view>
      </view>
      <view class="order-card-total-price font-14">
        <!-- {{ `共 ${orderData.shop_number} 件商品 总计：` }} -->
        总计：
        <span class="price-color font-14">¥{{ orderInfo.order_total }}</span>
      </view>

      <view class="business flex">
        <u-image
          :src="orderInfo.shop_info && orderInfo.shop_info.logo"
          :lazy-load="true"
          width="50rpx"
          height="50rpx"
        ></u-image>
        <view class="business-name flex1">{{
          orderInfo.shop_info && orderInfo.shop_info.name
        }}</view>
        <view class="telephone" @click="handleMobile">
          <u-icon
            labelPos="bottom"
            labelSize="12"
            size="20"
            name="phone-fill"
          ></u-icon>
        </view>
      </view>
      <view class="order">
        <view class="order-title">订单信息</view>
        <view
          class="order-item flex"
          v-for="item in orderList"
          :key="item.name"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </view>
      </view>
    </view>
    <view class="pay" v-if="payState">
      <CommonPay
        :totalPrice="orderInfo.goods_price"
        :order_sn="orderInfo.order_sn"
      />
    </view>
  </CommonPage>
</template>

<script>
import { getOrderDetail } from "@/serve/api";
import { getResidueTime } from "@/utils";
export default {
  name: "orderDetail",
  async onLoad({ id }) {
    const data = await getOrderDetail({ data: { id } });
    this.orderInfo = data;
    if(this.orderInfo.pay_state === 0) this.payState = true
  },
  data() {
    return {
      orderInfo: {},
      residueTime: null,
      timeData: {},
      payState: false,
      orderEmpty: false,
    };
  },
  methods: {
    onChange(e) {
      this.timeData = e;
    },
    onFinish() {
      this.payState = false;
      this.orderEmpty = true;
    },
    handleMobile() {
      uni.makePhoneCall({
        phoneNumber: this.orderInfo.shop_info.mobile, //仅为示例
      });
    },
  },
  computed: {
    residueWidth() {
      const residue_time = this.timeData.minutes * 60 + this.timeData.seconds;
      return `${parseFloat(residue_time / 600).toFixed(2) * 100}%`;
    },
    orderList() {
      return [
        {
          name: "订单号",
          value: this.orderInfo.order_sn,
        },
        {
          name: "订单状态",
          value: this.orderInfo.order_state_text,
        },
        {
          name: "订单创建时间",
          value: this.orderInfo.create_time,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  box-sizing: border-box;
  padding-bottom: 100rpx;
  .pay_state {
    height: 100rpx;
    margin-bottom: 20rpx;
    background: #f0f8ff;
    position: relative;
    &-residue {
      background: $uni-color-object;
      height: 100%;
      .time-position {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .time {
        &__item {
          font-size: 32rpx;
          font-weight: 500;
          color: #000;
        }
      }
    }
  }
  .room {
    min-height: 100rpx;
    width: 100%;
    background-color: #fff;
    padding: 20rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    &-info {
      margin-left: 20rpx;
      &-name {
        font-size: 28rpx;
        font-weight: 500;
        margin-bottom: 10rpx;
      }
      &-timer {
        font-size: 24rpx;
        margin-bottom: 10rpx;
        font-weight: 400;
      }
    }
    &-other {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: end;
      &-pay_state {
        font-size: 24rpx;
      }
      &-pay_number {
        font-size: 24rpx;
      }
    }
  }
  .business {
    min-height: 100rpx;
    width: 100%;
    background-color: #fff;
    padding: 20rpx;
    box-sizing: border-box;
    align-items: center;
    margin-bottom: 20rpx;
    &-name {
      font-size: 28rpx;
      font-weight: 500;
      margin-left: 20rpx;
    }
  }
  .order {
    min-height: 100rpx;
    width: 100%;
    background-color: #fff;
    padding: 20rpx;
    box-sizing: border-box;
    &-title {
      font-size: 32rpx;
      font-weight: 500;
      margin-bottom: 40rpx;
    }
    &-item {
      justify-content: space-between;
      height: 80rpx;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      font-size: 26rpx;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.pay {
  width: 100%;
  height: 100rpx;
  background-color: #fff;
  position: fixed;
  bottom: 0;
}
.order-card-content {
    background: #fff;
    padding: 20rpx;
    box-sizing: border-box;
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
  .order-card-total-price {
    text-align: right;
    background: #fff;
    padding: 0 20rpx 20rpx;
    margin-bottom: 20rpx;
    
  }
</style>
<style>
page {
  background-color: #f1f1f1;
}
</style>
