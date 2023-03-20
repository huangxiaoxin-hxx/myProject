<template>
  <view id="poster">
   <!-- 状态栏高度 -->
   <view :style="'height:'+wHeight+'rpx;'"></view>
   <view>
   	<image :src="hosts+'qtxoe1627006586707.png'" @click="back" class="group_2566ku" ></image>
      <view class="zadkh">
        <view class="cxfgsu">
          <view class="bpqwgy">
            <image
              :src="hosts+'oval_2551pa_wgaup1627003882450.png'"
              class="reicn"
            ></image>
            <view class="your_invitation">你的邀请码</view>
            <image
              :src="hosts+'oval_gjtvr1627003881311.png'"
              class="tojfx"
            ></image>
          </view>
          <view class="rectangle"></view>
        </view>
        <view class="kgtpzc"></view>
        <view class="jkoc">{{ vuex_user.clone_id }}</view>
        <view class="code">
          <tki-qrcode
            cid="qrcode2"
            ref="qrcode2"
            :val="val"
            :size="size"
            :onval="onval"
            :loadMake="loadMake"
            :usingComponents="true"
          />
        </view>
        <!-- <image :src="hosts+'screenshot_dxjop1627003879352.png'" class="tuxdfw"></image> -->
        <view class="xameiw">
          <image
            :src="hosts+'group_fvxde1627003877688.png'"
            alt=""
            style="
              position: absolute;
              z-index: -1;
              left: 0px;
              top: 0px;
              width: 100%;
              height: 100%;
            "
          ></image>
          <view
            class="rectangle_2546szd"
            style="
              height: 41px;
              line-height: 45px;
              text-align: center;
              margin-bottom: 10px;
            "
            @click="confirm(code)"
          >
            复制邀请码
            <!-- <view class="rectangle_2547bq">
			                <view class="immediate_invitatio">立即邀请</view>
			            </view> -->
          </view>
          <view
            class="rectangle_2546szd"
            style="height: 41px; line-height: 45px; text-align: center"
            @click="confirm(val)"
          >
            复制链接
            <!-- <view class="rectangle_2547bq">
			                <view class="immediate_invitatio">立即邀请</view>
			            </view> -->
          </view>
        </view>
      </view>
      <!-- <image :src="hosts+'invite_friends_ubong1627003884712.png'" class="ykaqtf"></image> -->
    </view>
    <u-modal
      v-model="show"
      :content="content"
      :show-cancel-button="true"
      @confirm="confirm"
    ></u-modal>
  </view>
</template>
<script>
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
import html2canvas from "html2canvas";
import {$config} from '@/config.js'
export default {
  components: {
    tkiQrcode,
  },
  data() {
    return {
      code: '',
			// 
      val:
        $config.api.baseUrl +
        "/h5/#/?dl=false&id=",
      size: 248, // 二维码大小
      unit: "rpx", // 单位
      onval: true, // val值变化时自动重新生成二维码
      loadMake: true, // 组件加载完成后自动生成二维码
      show: false,
      content: "即将打开微信，分享给您的好友",
      base64: "",
      img: "",
			wHeight:'',
			shu:'' //页面层数
    };
  },
  onLoad() {
		this.code = this.vuex_user.clone_id
		this.val += this.vuex_user.clone_id
	},
  onShow() {},
	mounted(){
		// #ifdef APP-PLUS
			this.wHeight = plus.navigator.getStatusbarHeight();
		// #endif
		
		//防止刷新后不能返回-->将直接回首页
		var pages = getCurrentPages();
		this.shu = pages.length
	},
  methods: {
		back(){
			if(this.shu>1){
				uni.navigateBack({})
			}else{
				uni.switchTab({
					url:'/pages/homepage_is_not'
				})
			}
		},
    share() {
      // 使页面滑到顶部，避免顶部出现白边
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      });
      var dom = document.querySelector("#poster"); // 获取dom元素
      html2canvas(dom, {
        width: dom.clientWidth, //dom 原始宽度
        height: dom.clientHeight,
        scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
        scrollX: 0,
        useCORS: true, //支持跨域，但好像没什么用
      }).then((canvas) => {
        // 将生产的canvas转为base64图片
        this.base64 = canvas.toDataURL("image/png");
      });
      this.show = true;
      console.log("分享");
    },
    confirm(str) {
      uni.setClipboardData({
        data: str,
        success: () => {
          //   this.handleToast({
          //     title: "复制成功",
          //   });
        },
      });
      return;

      const base64Data = this.base64;
      var jsBridge = pay.default;
      if (/LT-APP/.test(navigator.userAgent)) {
        jsBridge.wxAppInstalled(function (yes) {
          if (yes) {
            jsBridge.shareImage({
              //0 微信朋友圈
              //1 微信好友
              //2 QQ好友
              to: 1,
              imgUrl: base64Data,
            });
          } else {
            alert("未安装微信");
          }
        });
      } else {
        alert("不在APP内");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../css/invite_friends.scss";
</style>
