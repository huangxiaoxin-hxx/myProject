<template>
  <CommonPage navBarTitle="账号管理" :loading="loading">
    <view class="list">
      <view class="avatar list-item" v-for="item in listData" :key="item.key">
        <view class="name flex1">{{ item.name }}</view>
        <view class="context" v-if="item.key === 'header'">
          <button
            @chooseavatar="chooseAvatar"
            open-type="chooseAvatar"
            class="choose-avatar"
            :style="
               {
                backgroundImage: `url(${userInfo[item.key]}) `
              }
            "
          ></button>
          <!-- <image :src="userInfo[item.key]" /> -->
        </view>
        <view class="context" v-else>
          {{ userInfo[item.key] }}
        </view>
        <u-icon name="arrow-right" color="#000" size="12"></u-icon>
      </view>
    </view>
  </CommonPage>
</template>

<script>
import { mapState } from "vuex";
import { saveUserInfo } from '@/serve/api'
const listData = [
  {
    name: "头像",
    key: "header",
    button: "获取微信头像",
  },
  {
    name: "名字",
    key: "user_name",
    button: "获取微信名子",
  },
  {
    name: "手机号",
    key: "mobile",
    button: "获取手机号",
  },
];
export default {
  data() {
    return {
      listData: listData,
      loading: false,
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    async chooseAvatar(data) {
      console.log(data.detail);
      this.loading = true
      await saveUserInfo({ header: data.detail.avatarUrl });
      this.loading = false
    },
  },
};
</script>

<style>
page {
  background: #f1f1f1;
}
</style>
<style lang="scss" scoped>
.list {
  padding-top: 20rpx;
  padding-left: 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  .list-item {
    display: flex;
    min-height: 80rpx;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    align-items: center;
    padding-right: 20rpx;
    box-sizing: border-box;
    .name {
      font-size: 28rpx;
    }
  }
  .context {
    width: 200rpx;
    padding-right: 20rpx;
    box-sizing: border-box;
    text-align: right;
    font-size: 26rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    .choose-avatar {
      width: 150rpx;
      height: 150rpx;
      padding: 0;
      background: inherit;
      border: none !important;
      background-size: contain;
    }
    .avatar {
      height: 150rpx;
      width: 150rpx;
      border-radius: 10rpx;
    }
  }
}
</style>
