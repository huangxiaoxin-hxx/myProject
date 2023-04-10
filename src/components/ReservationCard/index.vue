<template>
  <view class="reservation-card">
    <u-tabs
      :list="cardList"
      lineWidth="0"
      :activeStyle="{
        color: '#fff',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        background: '#87CEFA',
        textAlign: 'center',
        lineHeight: '88rpx',
      }"
      :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)',
        display: 'block',
      }"
      itemStyle="padding-left: 0px; padding-right: 0px; height: 88rpx;width:150rpx;"
      @click="handleSelectReservation"
    >
    </u-tabs>
    <view class="reservation-card-comment">
      <view
        class="reservation-card-comment-item"
        :class="isSelect(item) && 'reservation-card-comment-item__selected'"
        v-for="(item) in firstReservationList"
        :key="item.id"
        @click="handlePickTime(item)"
      >
        <view class="state">{{ item.yuyue_state_text }}</view>
        <view class="title">{{ item.title }}</view>
        <view class="timer"
          >{{ item.start_time | getTimeHHMM }}-{{
            item.end_time | getTimeHHMM
          }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { haveMonthDate } from "@/utils";
export default {
  name: "ReservationCard",
  props: {
    reservationList: { type: Array, default: () => [] },
  },
  data() {
    return {
      selectDateList: null,
      pickTime: [],
    };
  },
  computed: {
    cardList() {
      return this.reservationList.map((item, index) => {
        return {
          name:
            index === 0
              ? "今日"
              : index === 1
              ? "明日"
              : haveMonthDate(item.date),
          comment: item.room_yuyue,
        };
      });
    },
    firstReservationList() {
      return (
        this.selectDateList || (this.reservationList.length > 0 && this.reservationList[0].room_yuyue) || []
      );
    },
  },
  methods: {
    handleSelectReservation(data) {
      this.selectDateList = data.comment;
    },
    handlePickTime(data) {
      if (data.yuyue_state === 1) {
        uni.showToast({ title: "抱歉，该场次已被预约", icon: "none" });
        return;
      }
      const index = this.pickTime.indexOf(data)
      if(index !== -1) {
        this.pickTime.splice(index, 1)
      } else {
        this.pickTime.push(data)
      }
      this.$emit('handlePickTime', this.pickTime)
    },
    isSelect(data) {
      if(this.pickTime.includes(data)) {
        return true
      }
      return false
    }
  },
};
</script>

<style lang="scss" scoped>
.reservation-card {
  width: 100%;
  &-comment {
    padding: 40rpx 20rpx;
    box-sizing: border-box;
    &-item {
      width: 210rpx;
      display: inline-block;
      margin-right: 20rpx;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5rpx;
      padding: 10rpx;
      box-sizing: border-box;
      text-align: center;
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
      &__selected {
        border: 1px solid #87CEFA;
        background-color: #87CEFA;
        color: #fff;
      }
      .title {
        font-size: 28rpx;
        margin-bottom: 5rpx;
      }
      .timer {
        font-size: 24rpx;
      }
      .state {
        font-size: 24rpx;
      }
    }
  }
}
</style>
