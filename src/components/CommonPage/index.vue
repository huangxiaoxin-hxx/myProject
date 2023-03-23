<template>
  <view class="page-container default-font-family" :style="{ paddingTop: statusBarHeight + 'rpx' }">
    <view class="no-navbar-top" v-if="!isNavBar" :style="{ height: statusBarHeight + 'rpx' }"></view>
    <view v-if="isNavBar">
      <u-navbar
        :title="navBarTitle"
        :autoBack="isAutoBack"
        :fixed="fixed"
        :placeholder="true"
        :bgColor="bgColor"
        :titleStyle="{ color: titleColor }"
        :leftIconColor="titleColor"
      >
      </u-navbar>
    </view>
    <slot></slot>
    <view
      v-if="isFixed"
      class="fixed"
      :style="{
        right: rbRight + 'rpx',
        bottom: rbBottom + 'rpx',
        width: rbWidth + 'rpx',
        zIndex: rbIndex
      }"
    >
      <slot name="gRTArea"></slot>
    </view>
    <view class="loading" v-if="loading">
      <loading-bounce />
    </view>
  </view>
</template>

<script>
// import LoadingSun from '../Loading/loading-sun.vue'
export default {
  name: "CommonPage",
    // LoadingSun
  data() {
    return {
      statusBarHeight: 0
    }
  },
  props: {
    isNavBar: { type: Boolean, default: true },
    navBarTitle: { type: String, default: '' },
    isAutoBack: { type: Boolean, default: true },
    bgColor: {type: String, default: '#87CEFA'},
    titleColor: {type: String, default: '#ffffff'},
    fixed: { type: Boolean, default: true },
    isFixed: { type: Boolean, default: false },
    rbWidth: { type: Number, default: 100 },
    rbBottom: { type: Number, default: 200 },
    rbRight: { type: Number, default: 20 },
    rbIndex: { type: Number, default: 1 },
    loading: { type: Boolean, default: false },
  },
  created() {
    uni.getSystemInfo({
      success: (data) => {
        this.statusBarHeight = (data.statusBarHeight || 0) * 2
      }
    })
  }
}
</script>

<style>
.page-container {
  width: 100%;
}
.fixed {
  position: fixed;
}
.loading {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
.no-navbar-top {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  background: #fff;
}
</style>