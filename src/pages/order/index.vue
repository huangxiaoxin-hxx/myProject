<template>
  <view class="container">
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="list1"
        @click="handleOrderType"
        :itemStyle="{ width: '100rpx', height: '80rpx' }"
        lineWidth="30"
      ></u-tabs>
    </u-sticky>
    <view class="order-list">
      <view class="order-list-item" v-for="item in orderList" :key="item.id">
        <CommonOrderCard :orderData="item" />
      </view>
    </view>
    <view class="pb-20">
      <u-loadmore :status="status" />
    </view>
  </view>
</template>

<script>
import { getOrderList } from "@/serve/api";
export default {
  name: "Order",
  data() {
    return {
      list1: [
        {
          name: "全部",
          id: 1,
          type: "all",
        },
        {
          name: "未使用",
          id: 2,
          type: "wait_use",
        },
        {
          name: "已完成",
          id: 3,
          type: "complete",
        },
        {
          name: "使用中",
          id: 4,
          type: "using",
        },
        {
          name: "待支付",
          id: 5,
          type: "wait_pay",
        },
      ],
      orderList: [],
      type: "all",
      pageInfo: {
        page: 1,
        limit: 10,
      },
      total: 0,
      status: 'nomore'
    };
  },
  methods: {
    async handleOrderType(item) {
      this.type = item.type;
      await this.resetOrderList()
    },
    async fetchOrderList() {
      // this.loading = true;
      this.status = 'loading'
      const res = await getOrderList({
        data: { type: this.type, ...this.pageInfo },
      });
      this.loading = false;
      this.total = res.total;
      if (this.pageInfo.page === 1) {
        this.orderList = res.data;
      } else {
        this.orderList = [...this.orderList, ...res.data];
      }
      if(this.total <= this.pageInfo.page * this.pageInfo.limit) {
        this.status = 'nomore'
      } else {
        this.status = 'loadmore'
      }
    },
    async resetOrderList() {
      this.pageInfo = {
        page: 1,
        limit: 10,
      };
      uni.showLoading({title: '加载中'})
      try {
        await this.fetchOrderList();
      } finally {
        uni.hideLoading()
      }
      
    }
  },
  computed: {

  },
  async onReachBottom() {
    if(this.pageInfo.page * this.pageInfo.limit >= this.total) { return }
    this.pageInfo.page += 1
    await this.fetchOrderList()
  },
  async onShow() {
    await this.resetOrderList()
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
