<template>
  <u-modal
    :show="show"
    title="修改昵称"
    @confirm="confirm"
    @cancel="cancel"
    showCancelButton
  >
    <view class="slot-content">
      <input
        type="nickname"
        placeholder="请输入昵称"
        v-model="nickname"
        maxlength="16"
        minlength="1"
        class="nickname"
        @blur="getNickname"
      />
    </view>
  </u-modal>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
  },
  data() {
    return {
      nickname: null,
    };
  },
  methods: {
    confirm() {
      console.log(this.nickname);
      this.$emit('confirm', this.nickname)
    },
    cancel() {
      this.$emit("cancel");
    },
    getNickname(e) {
      this.nickname = e.detail.value
    },
  },
};
</script>

<style></style>
