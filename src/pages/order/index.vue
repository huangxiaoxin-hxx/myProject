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
const orderList = [
  {
    business_name: '张三棋牌室',
    state: '已完成',
    id: 1,
    shop_list: [
      {
        order_image: 'https://cdn.uviewui.com/uview/album/1.jpg',
        shop_name: 'xx牌香烟',
        price: '18.00',
        id: 1,
        number: 1
      },
      {
        order_image: 'https://cdn.uviewui.com/uview/album/1.jpg',
        shop_name: 'xx牌香烟',
        price: '20.00',
        id: 2,
        number: 1
      },
    ],
    shop_number: 2,
    total_price: '38.00'
  },
  {
    business_name: '张三棋牌室',
    state: '待支付',
    id: 2,
    shop_list: [
      {
        order_image: 'https://cdn.uviewui.com/uview/album/1.jpg',
        shop_name: 'xx牌香烟',
        price: '18.00',
        number: 1,
        id: 1
      },
      {
        order_image: 'https://cdn.uviewui.com/uview/album/1.jpg',
        shop_name: 'xx牌香烟',
        price: '20.00',
        number: 1,
        id: 2
      },
    ],
    shop_number: 2,
    total_price: '38.00'
  },
  {
    business_name: '张三棋牌室',
    state: '待使用',
    id: 3,
    shop_list: [
      {
        order_image: 'https://cdn.uviewui.com/uview/album/1.jpg',
        shop_name: 'xx牌香烟',
        price: '18.00',
        number: 1,
        id: 1
      },
      {
        order_image: 'https://cdn.uviewui.com/uview/album/1.jpg',
        shop_name: 'xx牌香烟',
        price: '20.00',
        number: 1,
        id: 2
      },
    ],
    shop_number: 2,
    total_price: '38.00'
  },
  {
    business_name: '张三棋牌室',
    state: '使用中',
    id: 4,
    shop_list: [
      {
        order_image: 'https://cdn.uviewui.com/uview/album/1.jpg',
        shop_name: '豪华包间3号',
        price: '50.00',
        number: 1,
        id: 1
      },
      {
        order_image: 'https://cdn.uviewui.com/uview/album/1.jpg',
        shop_name: '豪华包间1号',
        price: '30.00',
        number: 1,
        id: 2
      },
    ],
    shop_number: 2,
    total_price: '38.00'
  },
]
export default {
  name: "Order",
  data() {
    return {
      list1: [
        {
          name: "全部",
          id: 1,
        },
        {
          name: "未使用",
          id: 2,
        },
        {
          name: "已完成",
          id: 3,
        },
        {
          name: "使用中",
          id: 4,
        },
        {
          name: "待支付",
          id: 5
        }
      ],
      orderList: orderList
    };
  },
  methods: {
    handleOrderType(item) {
      console.log(item)
    }
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
