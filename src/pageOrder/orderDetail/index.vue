<template>
  <CommonPage navBarTitle="订单详情">
    <view class="container">
      <view class="pay_state" v-if="payState">
        <view class="pay_state-residue" :style="{ width: residueWidth }">
          <view class="time-position">
            <u-count-down
              :time="residueTime * 1000"
              format="mm:ss"
              autoStart
              @change="onChange"
              @finish="onFinish"
            >
              <view class="time">
                <text class="time__item"
                  >{{ timeData.minutes < 10 ? 0 : ""
                  }}{{ timeData.minutes }}:</text
                >
                <text class="time__item"
                  >{{ timeData.seconds < 10 ? 0 : ""
                  }}{{ timeData.seconds }}</text
                >
              </view>
            </u-count-down>
          </view>
        </view>
      </view>
      <view class="room flex">
        <u-image
          :src="orderInfo.room_info && orderInfo.room_info.image"
          :lazy-load="true"
          width="150rpx"
          height="150rpx"
        ></u-image>
        <view class="room-info flex1">
          <view class="room-info-name">{{
            orderInfo.room_info && orderInfo.room_info.name
          }}</view>
          <view class="room-info-timer"
            >开始时间:{{ orderInfo.yuyue_date }}
            {{ orderInfo.room_price && orderInfo.room_price.start_time }}</view
          >
          <view class="room-info-timer"
            >结束时间:{{ orderInfo.yuyue_date }}
            {{ orderInfo.room_price && orderInfo.room_price.end_time }}</view
          >
        </view>
        <view class="room-other">
          <view class="room-other-pay_state">{{
            orderInfo.pay_state_text
          }}</view>
          <view class="room-other-pay_number"
            >支付：<span class="price-color"
              >¥{{ orderInfo.goods_price }}</span
            ></view
          >
        </view>
      </view>
      <view class="business flex">
        <u-image
          :src="orderInfo.shop && orderInfo.shop.logo"
          :lazy-load="true"
          width="50rpx"
          height="50rpx"
        ></u-image>
        <view class="business-name flex1">{{
          orderInfo.shop && orderInfo.shop.name
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
    <view v-if="orderEmpty">
      <u-empty mode="order" text="订单过期了"/>
    </view>
  </CommonPage>
</template>

<script>
import { getRoomOrderDetail } from "@/serve/api";
import { getResidueTime } from "@/utils";
export default {
  name: "orderDetail",
  async onLoad({ id }) {
    const data = await getRoomOrderDetail({ data: { id } });
    this.orderInfo = data;
    this.createTimer();
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
    createTimer() {
      this.residueTime = getResidueTime(this.orderInfo.create_time);
      if (this.residueTime > 0) this.payState = true;
    },
    onChange(e) {
      this.timeData = e;
    },
    onFinish() {
      this.payState = false;
      this.orderEmpty = true;
    },
    handleMobile() {
      uni.makePhoneCall({
        phoneNumber: this.orderInfo.shop.mobile, //仅为示例
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
</style>
<style>
page {
  background-color: #f1f1f1;
}
</style>
