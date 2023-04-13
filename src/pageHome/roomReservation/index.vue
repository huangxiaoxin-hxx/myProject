<template>
  <CommonPage :navBarTitle="`${roomName}预约`">
    <view class="container">
      <view class="room">
        <view class="room-info flex mb-50">
          <u-image
            width="180rpx"
            height="180rpx"
            :src="roomInfo.image"
            :lazy-load="true"
            radius="5"
          ></u-image>
          <view class="ml-15 flex1">
            <view class="flex al-center">
              <view class="room-name">{{ roomInfo.name }}</view>
              <view
                class="room-use"
                :class="
                  roomInfo.state === 1 ? 'room-use__false' : 'room-use__true'
                "
                >{{ roomInfo.state === 1 ? "空闲中" : "使用中" }}</view
              >
            </view>
            <view class="price-list">
              <view
                class="price-list-item flex al-center"
                v-for="item in roomPrice"
                :key="item.id"
              >
                <view class="mr-10 w-100">{{ item.title }}</view>
                <span>价格:</span>
                <view class="flex1 tar price-color">¥{{ item.price }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="room-reservation">
          <ReservationCard
            :reservationList="reservationList"
            @handlePickTime="handlePickTime"
          />
        </view>
        <view class="room-order" v-if="pickTime.length">
          <view class="room-order-title">订单列表</view>
          <view class="room-order-item flex" v-for="item in pickTime" :key="item.id">
            <view class="room-order-item-comment">{{ item.title }} {{ item.start_time | getDate }}：</view>
            <view class="room-order-item-timer flex1"
              >{{ item.start_time | delSecond }}-{{
                item.end_time | delSecond
              }}</view
            >
            <view class="room-order-item-price price-color">¥{{ item.price }}</view>
          </view>
          <view class="room-order-totalPrice flex">
            <span>总价：</span>
            <span class="price-color">¥{{ totalPrice }}</span>
          </view>
        </view>
      </view>
    </view>
    <view class="footer flex">
      
      <view class="flex1">
        <span class="fong-24">总价：</span>
        <span class="price-color">¥<span class="font-24">{{ totalPrice }}</span></span>
      </view>
      <view class="order" :class="pickTime.length === 0 && 'order-disable'" @click="handleOrder">下单</view>
    </view>
  </CommonPage>
</template>

<script>
import ReservationCard from "@/components/ReservationCard";
import { getRoomInfo } from "@/serve/api";
export default {
  name: "RoomReservation",
  components: {
    ReservationCard,
  },
  data() {
    return {
      roomName: null,
      roomInfo: null,
      roomPrice: [],
      reservationList: [],
      pickTime: [],
    };
  },
  methods: {
    handlePickTime(list) {
      this.pickTime = list;
    },
    handleOrder() {
      if(this.pickTime.length === 0) {
        return
      }
    }
  },
  async onLoad({ roomName, roomId }) {
    this.roomName = roomName;
    // todo 请求room预约数据
    const data = await getRoomInfo({ data: { room_id: roomId } });
    this.roomInfo = data.room;
    this.roomPrice = data.yuYueList[0].room_yuyue;
    this.reservationList = data.yuYueList;
  },
  computed: {
    totalPrice() {
      let total = 0
      this.pickTime.map(item => {
        total += parseFloat(item.price)
      })
      return total
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $uni-color-object;
  padding-top: 40rpx;
  .room {
    background: #f1f1f1;
    border-radius: 20rpx 20rpx 0 0;
    padding: 20rpx 20rpx 100rpx;

    &-name {
      font-size: 28rpx;
      margin-right: 10rpx;
      height: 40rpx;
    }
    &-use {
      font-size: 24rpx;
      width: 100rpx;
      height: 40rpx;
      line-height: 40rpx;
      border-radius: 10rpx;
      &__false {
        text-align: center;
        color: #87cefa;
        background: #f0f8ff;
      }
      &__true {
        text-align: center;
        color: #ff7300;
        background: rgba(#ff7300, 0.1);
      }
    }
    .price-list {
      font-size: 24rpx;
      width: 100%;
      &-item {
        margin: 10rpx;
      }
    }
    &-reservation {
      width: 100%;
      border-radius: 10rpx 10rpx 0 0;
      background: #fff;
      overflow: hidden;
      min-height: 200rpx;
      margin-bottom: 20rpx;
    }
    &-order {
      width: 100%;
      border-radius: 10rpx 10rpx 0 0;
      background: #fff;
      margin-bottom: 20rpx;
      padding: 20rpx;
      box-sizing: border-box;
      &-title {
        font-size: 28rpx;
        margin-bottom: 40rpx;
      }
      &-item {
        font-size: 28rpx;
        margin-bottom: 20rpx;
      }
      &-totalPrice{
        justify-content: flex-end;
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  height: 120rpx;
  background-color: #fff;
  width: 100%;
  font-size: 28rpx;
  align-items: end;
  padding: 30rpx 0;
  box-sizing: border-box;
  padding-left: 40rpx;
  padding-right: 30rpx;
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
    &-disable {
      background-color: #aaa;
    }
  }
}
</style>
<style>
page {
  background: #f1f1f1;
}
</style>
