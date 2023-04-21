<template>
  <CommonPage navBarTitle="成为商家">
    <view class="container">
      <view class="title">填写表单，立即开店</view>
      <u-form
        labelPosition="left"
        :model="formData"
        :rules="rules"
        ref="uForm"
        errorType="border-bottom"
      >
        <u-form-item label="姓名" prop="realName" borderBottom ref="realName">
          <u-input
            v-model="formData.realName"
            border="none"
            placeholder="请输入您的姓名"
            placeholderClass="input_placeholder"
          />
        </u-form-item>
        <u-form-item
          label="电话"
          prop="phoneNumber"
          borderBottom
          ref="phoneNumber"
        >
          <u-input
            v-model="formData.phoneNumber"
            border="none"
            placeholder="请输入您的电话"
            placeholderClass="input_placeholder"
          />
        </u-form-item>
        <u-form-item
          label="性别"
          prop="areaList"
          borderBottom
          @click="showArea = true"
          ref="areaList"
        >
          <u-input
            v-model="formData.areaList"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择地区"
            border="none"
          />
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </u-form>
      <view class="agreement">
        <u-checkbox-group @change="handleAgree">
          <u-checkbox shape="circle" name="agree" :checked="isAgree" activeColor="#87CEFA"></u-checkbox>
        </u-checkbox-group>
        <view class="agreement-text">
          勾选表示已阅读<span class="price-color" @click="handleAgreementText">《个人信息授权》</span
          >
        </view>
      </view>
      <view class="btn">
        <u-button
          @click="submit"
          type="error"
          size="small"
          text="我要开店"
          :disabled="!isAgree"
        ></u-button>
      </view>
    </view>
    <AddressPicker
      :show="showArea"
      title="选择地区"
      @confirm="selectArea"
      @cancel="showArea = false"
    />
    <u-modal :show="showAgree" @confirm="confirmAgree" ref="uModal" showCancelButton @cancel="showAgree = false">
      请你输入正确的信息，该数据将用于联系您，后台审核人员会尽快给您回电！
    </u-modal>
  </CommonPage>
</template>

<script>
import AddressPicker from "@/components/address-picker/components/address-picker/address-picker.vue";
export default {
  name: "RegisterBusiness",
  components: {
    AddressPicker,
  },
  data() {
    return {
      formData: {
        realName: null,
        phoneNumber: null,
        areaList: null,
      },
      showArea: false,
      rules: {
        realName: {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        phoneNumber: {
          type: "string",
          max: 11,
          min: 11,
          required: true,
          message: "请输入手机号码",
          trigger: ["blur", "change"],
        },
        areaList: {
          type: "string",
          required: true,
          message: "请选择地区",
          trigger: ["blur", "change"],
        },
      },
      isAgree: false,
      showAgree: false
    };
  },
  methods: {
    selectArea(data) {
      this.formData.areaList = data.value.join("、");
      this.showArea = false;
      console.log(this.formData);
    },
    submit() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          // uni.$u.toast('校验通过')
          // todo 对接注册商家接口
        })
        .catch((errors) => {
          uni.$u.toast("请填写注册信息");
        });
    },
    handleAgree(e) {
      if(e.length > 0) this.isAgree = true
      else this.isAgree = false
    },
    handleAgreementText() {
      this.showAgree = true
    },
    confirmAgree() {
      this.isAgree = true
      this.showAgree = false
    }
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 10rpx;
  background: #fff;
  padding: 40rpx 20rpx 40rpx;
  box-sizing: border-box;
  .title {
    text-align: center;
    font-size: 32rpx;
    margin-bottom: 20rpx;
    font-weight: 500;
  }
  .btn {
    margin-top: 50rpx;
  }
  .agreement {
    display: flex;
    align-items: center;
    margin-top: 30rpx;
  }
}
</style>

<style>
page {
  background: #f1f1f1;
}
.input_placeholder {
  font-size: 28rpx;
}
</style>
