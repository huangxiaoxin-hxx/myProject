<template>
  <view class="reservation-card">
    <u-tabs
      :list="cardList"
      lineWidth="0"
      :activeStyle="{
        color: '#fff',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
        display: 'block',
        width: '100%',
        height: '100%',
        background:'#87CEFA',
        textAlign: 'center',
        lineHeight: '88rpx'
      }"
      :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)',
        display: 'block'
      }"
      itemStyle="padding-left: 0px; padding-right: 0px; height: 88rpx;width:150rpx;"
      @click="handleSelectReservation"
    >
    </u-tabs>
    <view class="reservation-card-comment">
      <view class="reservation-card-comment-item" v-for="item in selectDateList" :key="item.id">
        {{ item.title }}
      </view>
    </view>
  </view>
</template>

<script>
import { haveMonthDate } from '@/utils'
export default {
  name: "ReservationCard",
  props: {
    reservationList: { type: Array, default: () => [] },
  },
  data() {
    return {
      selectDateList: []
    }
  },
  computed: {
    cardList() {
      return this.reservationList.map((item, index) => {
        return {
          name: index === 0 ? '今日' : index === 1 ? '明日' : haveMonthDate(item.date),
          comment: item.room_yuyue
        }
      })
    },
  },
  methods: {
    handleSelectReservation(item) {
      this.selectDateList = item.comment
    }
  },
  created() {
    this.selectDateList = this.reservationList[0].room_yuyue
  }
};
</script>

<style>
.{
  text-align: center;
}
</style>
