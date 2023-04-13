<template>
  <CommonPage navBarTitle="选择店铺">
    <view class="bg_color">
      <view class="search">
        <input
          type="text"
          class="search-input"
          placeholder="请输入店铺关键字"
          placeholder-style="color: rgba(255,255,255,0.7)"
          @input="searchBusiness"
          v-model="keyword"
        />
      </view>
    </view>
    <view class="position_height"></view>
    <view class="business-list">
      <view
        class="business-list-item"
        v-for="item in businessList"
        :key="item.id"
        @click="handleBusiness(item.id)"
      >
        <BusinessCard
          :name="item.name"
          :image="item.logo"
          :distance="item.distance"
          :timer="item.timer"
          :address="item.address"
          :business_id="item.id"
        />
      </view>
    </view>
    <u-loadmore
      :status="loading ? 'loading' : isMoreLoad ? 'loadmore' : 'nomore'" height="40"
    />
  </CommonPage>
</template>

<script>
import BusinessCard from "@/components/BusinessCard";
import { getBusinessList } from "@/serve/api";
import { setStorage } from '@/common'
export default {
  name: "SelectBusiness",
  components: {
    BusinessCard,
  },
  data() {
    return {
      businessList: [],
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      keyword: null,
      loading: false,
      loadStatus: "nomore",
    };
  },
  methods: {
    searchBusiness(e) {
      this.keyword = e.detail.value;
      this.pageInfo.page = 1;
      uni.$u.debounce(() => this.fetchBusinessList(), 500);
    },
    async fetchBusinessList() {
      this.loading = true;
      const res = await getBusinessList({
        data: { keyword: this.keyword, ...this.pageInfo },
      });
      this.loading = false;
      this.pageInfo.total = res.total;
      if (this.pageInfo.page === 1) {
        this.businessList = res.data;
      } else {
        this.businessList = [...this.businessList, ...res.data];
      }
    },
    handleBusiness(id) {
      setStorage('business_id', id)
      this.handleNavTo({ type: 'switchTab', url: '/pages/home/index' })
    }
  },
  created() {
    this.fetchBusinessList({ data: this.pageInfo });
  },
  onReachBottom() {
    if (!this.loading && this.isMoreLoad) {
      this.pageInfo.page += 1;
      this.fetchBusinessList();
    }
  },
  computed: {
    isMoreLoad() {
      return this.pageInfo.page * this.pageInfo.pageSize < this.pageInfo.total;
    },
  },
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
.position_height {
  height: 132rpx;
}
.business-list {
  padding: 40rpx 20rpx 0;
  box-sizing: border-box;
  &-item {
    margin-bottom: 30rpx;
  }
}
</style>
