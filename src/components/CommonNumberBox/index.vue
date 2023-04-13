<template>
  <u-number-box v-model="value" :min="0" integer disabledInput @change="handleNumberChange">
    <view slot="minus" class="minus">
      <u-icon name="minus" size="12"></u-icon>
    </view>
    <text slot="input" style="width: 50px; text-align: center" class="input">{{
      value
    }}</text>
    <view slot="plus" class="plus">
      <u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
    </view>
  </u-number-box>
</template>

<script>
export default {
  name: "CommonNumberBox",
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    productionKey: ''
  },
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    handleNumberChange(e) {
      this.$emit('handleNumberChange', {...this.data, number: e.value, productionKey: this.productionKey})
    },
    handleResetValue() {
      this.value = 0
    }
  }
};
</script>

<style lang="scss">
.minus {
  width: 22px;
  height: 22px;
  border-width: 1px;
  border-color: #e6e6e6;
  border-style: solid;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  @include flex;
  justify-content: center;
  align-items: center;
}

.input {
  padding: 0 10px;
}

.plus {
  width: 22px;
  height: 22px;
  background-color: #ff0000;
  border-radius: 50%;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
}
</style>
