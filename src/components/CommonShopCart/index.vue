<template>
  <view>
    <view class="shop-cart flex">
      <view
        class="order-icon"
        :style="{ background: totalNumber > 0 ? '#f0ad4e' : '#aaa' }"
      >
        <u-icon
          name="order"
          color="#fff"
          size="28"
          @click="handleOrderList"
        ></u-icon>
        <view class="badge">
          <u-badge max="99" :value="totalNumber"></u-badge>
        </view>
      </view>
      <view class="font-12 flex1"
        >总价
        <span class="price"
          ><span class="font-12">¥</span>{{ totalPrice || 0 }}</span
        >
      </view>
      <view class="order" @click="handleOrder">下单</view>
    </view>
    <u-popup
      :show="show"
      mode="bottom"
      @close="show = false"
      :round="10"
      closeable
    >
      <view class="order-list-title"> 已选商品 </view>
      <view class="order-list">
        <view class="goods" v-for="(item, index) in shopList" :key="index">
          <image src="/static/logo.jpeg" mode=""></image>
          <view class="flex1">
            <view class="mb-20">{{ item.name }}</view>
            <!-- <view class="describe">第{{index2+1}}个商品的描述内容</view> -->
            <view class="money">¥{{ item.price }}</view>
          </view>
          <view class="number-box"> x{{ item.number }} </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>

export default {
  name: "ShopCart",
  data() {
    return {
      show: false,
    };
  },
  props: {
    shopList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.shopList.forEach((item) => {
        total += item.price * 100 * item.number;
      });
      return total / 100;
    },
    totalNumber() {
      let total = 0;
      this.shopList.forEach((item) => {
        total += item.number;
      });
      return total;
    },
  },
  methods: {
    async handleOrder() {
      // todo 下单
      if(this.shopList.length === 0) {
        uni.showToast({title: '请选择需要购买的商品', icon: 'none'})
        return
      }
      // console.log(this.shopList);
      // await postCartInstallAll(this.shopList)
      this.$emit('handleOrder')
    },
    handleOrderList() {
      if (this.totalNumber > 0) {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-cart {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 20rpx;
  justify-content: space-between;
  align-items: center;
  height: 120rpx;
  position: relative;
  .order-icon {
    margin-right: 20rpx;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .badge {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .price {
    color: $uni-color-error;
    font-size: 48rpx;
    font-weight: 600;
    margin-left: 10rpx;
  }
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
  }
}
.order-list-title {
  text-align: center;
  height: 100rpx;
  font-size: 30rpx;
  font-weight: 400;
  line-height: 100rpx;
}
.order-list {
  max-height: 50vh;
  padding: 0rpx 40rpx 40rpx;
  box-sizing: border-box;
  overflow: scroll;
  .goods {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    & + .goods {
      margin-top: 16rpx;
    }

    & > image {
      width: 120rpx;
      height: 120rpx;
      margin-right: 16rpx;
      margin-left: 2px;
    }

    .describe {
      font-size: 24rpx;
      color: #999;
    }

    .money {
      font-size: 24rpx;
      color: $uni-color-error;
    }
  }
}
</style>
