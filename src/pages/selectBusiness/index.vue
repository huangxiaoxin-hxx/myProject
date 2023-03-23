<template>
  <CommonPage navBarTitle="切换店铺">
    <view class="bg_color">
      <view class="search">
        <input
          type="text"
          class="search-input"
          placeholder="请输入店铺关键字"
          placeholder-style="color: rgba(255,255,255,0.7)"
          @input="searchBusiness"
        />
      </view>
    </view>
  </CommonPage>
</template>

<script>
import { getBusinessList } from '@/serve/api'
export default {
  name: "SelectBusiness",
  data() {
    return {
      businessList: []
    }
  },
  methods: {
    searchBusiness(e) {
      let fetch = async (keyword) => {
        this.businessList = await getBusinessList({data:{ keyword }})
      }
      uni.$u.debounce(fetch(e.detail.value), 500)
    },

  }
};
</script>

<style lang="scss" scoped>
.bg_color {
  background: $uni-color-object;
  height: 112rpx;
  position: fixed;
  width: 100%;
  z-index: 100;
}
.search {
  width: 100%;
  background-color: transparent;
  border-radius: 30rpx 30rpx 0 0;
  height: 112rpx;
  z-index: 100;
  padding: 20rpx 40rpx 0;
  box-sizing: border-box;
  &-input {
    border-radius: 10rpx;
    border: 1px solid #fff;
    height: 68rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    color: #fff;
  }
}
</style>
