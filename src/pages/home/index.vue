<template>
  <CommonPage :isNavBar="false" :isFixed="true" :loading="loading">
    <view class="container">
      <!-- 店铺信息 -->
      <view class="shop-info">
        <view class="shop-info-name"> {{ homeInfo.name }} </view>
        <view class="flex">
          <view class="shop-info-address flex1">
            <view
              >营业时间:
              {{ homeInfo.extend && homeInfo.extend.business_time }}</view
            >
            <view>{{ homeInfo.extend && homeInfo.extend.address }}</view>
          </view>
          <view class="navigation" @click="handleNavigation">
            <u-icon
              label="导航"
              labelPos="bottom"
              labelSize="12"
              size="20"
              name="map-fill"
            ></u-icon>
          </view>
          <view class="telephone" @click="handleMobile">
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
          :list="homeInfo.extend.image_arr"
          previousMargin="50"
          nextMargin="50"
          circular
          :autoplay="false"
          radius="5"
          bgColor="#fff"
        ></u-swiper>
      </view>
      <!-- 通知信息 -->
      <view class="mb-20">
        <u-notice-bar
          :text="notice.title"
          speed="30"
          bgColor="#F0F8FF"
          color="#00BFFF"
        ></u-notice-bar>
      </view>
      <!-- 店铺列表 -->
      <view class="shop-list">
        <view class="shop-list-title">请选择包间</view>
        <view
          v-for="item in roomList"
          :key="item.id"
          class="mb-20"
          @click="handleRoomCard(item)"
        >
          <RoomCard
            :roomId="item.id"
            :image="item.image"
            :name="item.name"
            :desc="item.label"
            :isUse="item.room_use_state"
          />
        </view>
      </view>
      <!-- 底部底线 -->
      <view class="no-more" v-if="!loading">
        <u-loadmore status="nomore" :line="true" />
      </view>
    </view>
    <template slot="gRTArea">
      <view
        class="shop-switch"
        @click="handleNavTo({ url: '/pages/selectBusiness/index' })"
      >
        <p>切换</p>
        <p>店铺</p>
      </view>
    </template>
  </CommonPage>
</template>

<script>
import CommonPage from "@/components/CommonPage";
import RoomCard from "@/components/RoomCard";
import { getHomeData } from "@/serve/api";
import { getStorage, setStorage } from "@/common";
export default {
  name: "home",
  components: {
    CommonPage,
    RoomCard,
  },
  data() {
    return {
      homeInfo: {},
      roomList: [],
      loading: false,
      notice: [],
    };
  },
  methods: {
    handleRoomCard(item) {
      this.handleNavTo({
        url: `/pages/roomReservation/index?roomName=${item.name}&roomId=${item.id}`,
      });
    },
    handleMobile() {
      uni.makePhoneCall({
        phoneNumber: this.homeInfo.mobile, //仅为示例
      });
    },
    handleNavigation() {
      uni.openLocation({
			latitude: parseFloat(this.homeInfo.extend.lat),
			longitude: parseFloat(this.homeInfo.extend.lng),
			success: function () {
				console.log('success');
			}
		});
    }
  },
  async onLoad({ id }) {
    if (id) {
      setStorage("business_id", id);
      this.loading = true;
      try {
        const data = await getHomeData({ data: { id } });
        this.homeInfo = data.shop_info;
        this.roomList = data.room_list;
        this.notice = data.article;
      } finally {
        this.loading = false;
      }
    }
  },
  async onShow() {
    const id = getStorage("business_id");
    if (!id) {
      this.handleNavTo({ url: "/pages/selectBusiness/index" });
      return;
    }
    try {
      const data = await getHomeData({ data: { id } });
      this.homeInfo = data.shop_info;
      this.roomList = data.room_list;
      this.notice = data.article;
    } finally {
      this.loading = false;
    }
  },
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
.no-more {
  height: 100rpx;
  display: flex;
  align-items: center;
}
</style>
