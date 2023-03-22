import Vue from "vue";

Vue.mixin({
  methods: {
    // 跳转封装
    handleNavTo({ url, type = "navigateTo", animation = true }) {
      uni[type]({
        url,
        ...(animation === true
          ? { animationType: "pop-in", animationDuration: 100 }
          : animation)
      });
    },
    makeLoading(options) {
      uni.showLoading(options);
    },
    handleNavLogin() {
      this.handleNavTo({
        url: "/pages/auth/login",
        type: "reLaunch"
      });
      // #ifdef H5
      location.reload(); // h5 reLanch不会消除tabbar
      // #endif
    },
    // 全局返回跳转
    handleNavBack({ animation = true } = {}) {
      uni.navigateBack({
        ...(animation === true
          ? { delta: 1, animationType: "pop-out", animationDuration: 100 }
          : animation)
      });
    },
    // 拷贝封装
    handleCopy({ content, successText = "复制成功" }) {
      uni.setClipboardData({
        data: content,
        success: () => {
          this.makeToast({
            title: successText
          });
        }
      });
    }
  }
});
