<template>
  <CommonPage :navBarTitle="`${roomName}预约`">
    <view class="container">
      <view class="room">
        <view class="room-info flex">
          <u-image
            width="180rpx"
            height="180rpx"
            :src="roomInfo.image"
            :lazy-load="true"
            radius="5"
          ></u-image>
          <view class="ml-15">
            <view class="flex">
              <view class="room-name">{{ roomInfo.name }}</view>
              
            </view>
          </view>
        </view>
      </view>
    </view>
  </CommonPage>
</template>

<script>
import { getRoomInfo } from "@/serve/api";
export default {
  name: "RoomReservation",
  data() {
    return {
      roomName: null,
      roomInfo: null,
    };
  },
  async onLoad({ roomName, roomId }) {
    this.roomName = roomName;
    // todo 请求room预约数据
    const data = await getRoomInfo({ data: { room_id: roomId } });
    this.roomInfo = data.room;
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
    }
  }
}
</style>
