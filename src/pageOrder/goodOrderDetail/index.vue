<template>
  <CommonPage navBarTitle="订单详情">
    <view class="container">
      <view class="goods"></view>
    </view>
  </CommonPage>
</template>

<script>
import { getOrderDetail } from '@/serve/api'
export default {
  name: "orderDetail",
  async onLoad({ id }) {
    console.log(id)
    const data = await getOrderDetail({ data: { id } })
    console.log(data)
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20rpx;
  .goods {
    min-height: 100rpx;
    width: 100%;
    background-color: #fff;
  }
}
</style>
<style>
page {
  background-color: #f1f1f1;
}
</style>