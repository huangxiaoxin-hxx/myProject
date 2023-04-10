<template>
  <view class="container">
    <u-sticky bgColor="#fff">
      <u-tabs :list="list1" @click="handleOrderType" :itemStyle="{width: '100rpx',height: '80rpx'}" lineWidth="30"></u-tabs>
    </u-sticky>
    <view class="order-list">
      <view class="order-list-item" v-for="item in orderList" :key="item.id">
        <CommonOrderCard :orderData="item" />
      </view>
    </view>
  </view>
</template>

<script>
import { getOrderList } from '@/serve/api'
export default {
  name: "Order",
  data() {
    return {
      list1: [
        {
          name: "全部",
          id: 1,
          type: 'all'
        },
        {
          name: "未使用",
          id: 2,
          type: 'wait_use'
        },
        {
          name: "已完成",
          id: 3,
          type: 'complete'
        },
        {
          name: "使用中",
          id: 4,
          type: 'using'
        },
        {
          name: "待支付",
          id: 5,
          type: 'wait_pay'
        }
      ],
      orderList: [],
      type: 'all',
      pageInfo: {
        page: 1,
        limit: 10
      },
      total: 0
    };
  },
  methods: {
    handleOrderType(item) {
      this.type = item.type
    },
    async fetchBusinessList() {
      this.loading = true;
      const res = await getOrderList({
        data: { type: this.type, ...this.pageInfo },
      });
      this.loading = false;
      this.total = res.total;
      if (this.pageInfo.page === 1) {
        this.businessList = res.data;
      } else {
        this.businessList = [...this.businessList, ...res.data];
      }
    },
  },
  async onShow() {
    console.log('res')
    const res = await getOrderList({data: {type: this.type}})
    console.log(res)
  }
};
</script>

<style lang="scss" scoped>
.container {
  .order-list {
    padding: 20rpx;
    box-sizing: border-box;
    &-item {
      margin-bottom: 30rpx;
    }
  }
}
</style>
