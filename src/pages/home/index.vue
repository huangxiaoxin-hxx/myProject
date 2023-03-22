<template>
  <CommonPage :isNavBar="false" :isFixed="true">
    <view class="container">
      <!-- 店铺信息 -->
      <view class="shop-info">
        <view class="shop-info-name"> 喜来発 </view>
        <view class="flex">
          <view class="shop-info-address flex1">
            <view>营业时间: 24h</view>
            <view>江西省抚州市南丰县</view>
          </view>
          <view class="navigation">
            <u-icon
              label="导航"
              labelPos="bottom"
              labelSize="12"
              size="20"
              name="map-fill"
            ></u-icon>
          </view>
          <view class="telephone">
            <u-icon
              label="电话"
              labelPos="bottom"
              labelSize="12"
              size="20"
              name="phone-fill"
            ></u-icon>
          </view>
        </view>
      </view>
      <!-- 轮播图 -->
      <view class="mb-20">
        <u-swiper
          :list="list1"
          previousMargin="50"
          nextMargin="50"
          circular
          :autoplay="false"
          radius="5"
          bgColor="#f1f1f1"
        ></u-swiper>
      </view>
      <!-- 通知信息 -->
      <view class="mb-20">
        <u-notice-bar
          :text="text1"
          speed="30"
          bgColor="#F0F8FF"
          color="#00BFFF"
        ></u-notice-bar>
      </view>
      <!-- 店铺列表 -->
      <view class="shop-list">
        <view class="shop-list-title">请选择包间</view>
        <view v-for="item in roomList" :key="item.id" class="mb-20" @click="handleRoomCard(item)">
          <RoomCard
            :image="item.image"
            :name="item.name"
            :desc="item.desc"
            :isUse="item.isUse"
          />
        </view>
      </view>
    </view>
    <template slot="gRTArea">
      <view class="shop-switch">
        <p>切换</p>
        <p>店铺</p>
      </view>
    </template>
  </CommonPage>
</template>

<script>
import CommonPage from "@/components/CommonPage";
import RoomCard from "@/components/RoomCard";
export default {
  name: "home",
  components: {
    CommonPage,
    RoomCard,
  },
  data() {
    return {
      list1: [
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
      ],
      text1:
        "uView UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用",
      roomList: [
        {
          id: 1,
          image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
          name: "1号包间",
          desc: ["超大空间", "旋翼麻将机", "新风系统", "饮水机"],
          isUse: false,
        },
        {
          id: 2,
          image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
          name: "2号包间",
          desc: ["超大空间", "旋翼麻将机", "新风系统", "饮水机"],
          isUse: true,
        },
        {
          id: 3,
          image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
          name: "3号包间",
          desc: ["超大空间", "旋翼麻将机", "新风系统", "饮水机"],
          isUse: false,
        },
        {
          id: 4,
          image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
          name: "4号包间",
          desc: ["超大空间", "旋翼麻将机", "新风系统", "饮水机"],
          isUse: true,
        },
      ],
    };
  },
  methods: {
    handleRoomCard(item) {
      this.handleNavTo({ url: `/pages/roomReservation/index?roomName=${item.name}&roomId=${item.id}` })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-top: 40rpx;
  .shop-info {
    padding: 0 44rpx;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    &-name {
      font-size: 44rpx;
      font-weight: 500;
      margin-bottom: 10rpx;
    }
    &-address {
      font-size: 28rpx;
    }
  }
  .navigation {
    position: relative;
    margin-right: 40rpx;
    &::after {
      content: "";
      width: 1px;
      height: 40rpx;
      background: #000;
      position: absolute;
      right: -20rpx;
      top: 50%;
      transform: translateY(-65%);
    }
  }
}
.shop-switch {
  height: 100rpx;
  width: 100rpx;
  background: #00bfff;
  border-radius: 50%;
  font-size: 24rpx;
  text-align: center;
  color: #fff;
  padding-top: 20rpx;
  box-sizing: border-box;
  filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
}
.shop-list {
  width: 100%;
  padding: 0 44rpx;
  box-sizing: border-box;
  &-title {
    font-weight: 500;
    font-size: 32rpx;
    margin-bottom: 30rpx;
  }
}
</style>
