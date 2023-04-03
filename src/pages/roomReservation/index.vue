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
              <view class="price-list-item flex al-center" v-for="item in roomPrice" :key="item.id">
                <view class="mr-10 w-100">{{ item.title }}</view>
                <span>价格:</span>
                <view class="flex1 tar price-color">¥{{ item.price }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="room-reservation">
          <ReservationCard :reservationList="reservationList" />
        </view>
      </view>
    </view>
  </CommonPage>
</template>

<script>
import ReservationCard from "@/components/ReservationCard"
import { getRoomInfo } from "@/serve/api";
export default {
  name: "RoomReservation",
  components: {
    ReservationCard
  },
  data() {
    return {
      roomName: null,
      roomInfo: null,
      roomPrice: [],
      reservationList: []
    };
  },
  async onLoad({ roomName, roomId }) {
    this.roomName = roomName;
    // todo 请求room预约数据
    const data = await getRoomInfo({ data: { room_id: roomId } });
    this.roomInfo = data.room;
    // this.roomPrice = data.room_price;
    this.reservationList = data.yuYueList;

  },
  computed: {},
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
    }
  }
}
</style>
