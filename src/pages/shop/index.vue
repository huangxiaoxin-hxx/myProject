<template>
  <view class="container">
    <!-- 滚动区域 -->
    <view class="scroll-panel" id="scroll-panel">
      <view class="list-box">
        <view class="left">
          <scroll-view
            scroll-y="true"
            :style="{ height: scrollHeight + 'px' }"
            :scroll-into-view="leftIntoView"
            :scroll-with-animation="false"
          >
            <view
              class="item"
              v-for="(item, index) in leftArray"
              :key="index"
              :class="{ active: index == leftIndex }"
              :id="'left-' + index"
              :data-index="index"
              @tap="leftTap"
              >{{ item.name }}</view
            >
          </scroll-view>
        </view>
        <view class="main">
          <scroll-view
            scroll-y="true"
            :style="{ height: scrollHeight + 'px' }"
            @scroll="mainScroll"
            :scroll-into-view="scrollInto"
            :scroll-with-animation="false"
          >
            <view
              class="item main-item"
              v-for="(item, index) in mainArray"
              :key="index"
              :id="'item-' + index"
            >
              <view class="title">
                <view>{{ item.title }}</view>
              </view>
              <view
                class="goods"
                v-for="(item2, index2) in item.list"
                :key="index2"
              >
                <u-image
                  :src="item2.thumb_photo"
                  width="120rpx"
                  height="120rpx"
                  radius="4"
                  :lazy-load="true"
                ></u-image>
                <view class="flex1 ml-15">
                  <view class="mb-20">{{ item2.name }}</view>
                  <!-- <view class="describe">第{{index2+1}}个商品的描述内容</view> -->
                  <view class="money">¥{{ item2.price }}</view>
                </view>
                <view class="number-box">
                  <CommonNumberBox
                    :data="item2"
                    :productionKey="item.key"
                    @handleNumberChange="handleNumberChange"
                    ref="commonNumberBox"
                  />
                </view>
              </view>
            </view>
            <view
              class="fill-last"
              :style="{ height: fillHeight + 'px' }"
            ></view>
          </scroll-view>
        </view>
      </view>
    </view>
    <!-- 底部面板 -->
    <view class="bottom-panel">
      <!-- 底部面板，可添加所需要放在页面底部的内容代码。比如购物车栏目 -->
      <!-- <view style="background-color: #ffaa00;text-align: center;font-size: 28rpx;padding: 10px 0;color: #fff;">
				<view>这里底部内容占位区域，不需要则删除</view>
				<view>可添加需放在页面底部的内容，比如购物车栏目</view>
			</view> -->
      <CommonShopCart :shopList="selectList" @handleOrder="handleOrder" />
    </view>
    <view class="picker">
      <u-picker
        title="请选择需要送达的房间"
        ref="uPicker"
        :show="showPicker"
        :columns="[roomList]"
        keyName="name"
        @confirm="handleSelectRoom"
        @cancel="showPicker = false"
      ></u-picker>
    </view>
  </view>
</template>

<script>
import { getGoodsList, postCartInstallAll, createOrder, postPayOrder } from "@/serve/api";
import { getStorage } from "@/utils";
import { mapState } from "vuex";
import { weixinPay } from '@/utils/pay.js'
export default {
  data() {
    return {
      scrollHeight: 400,
      scrollTopSize: 0,
      fillHeight: 0, // 填充高度，用于最后一项低于滚动区域时使用
      leftArray: [],
      mainArray: [],
      topArr: [],
      leftIndex: 0,
      scrollInto: "",
      selectList: [],
      showPicker: false,
      columns: [],
    };
  },
  computed: {
    ...mapState("home", ["roomList"]),
    /* 计算左侧滚动位置定位 */
    leftIntoView() {
      return `left-${this.leftIndex > 3 ? this.leftIndex - 3 : 0}`;
    },
  },
  onReady() {
    /* 在非H5平台，nextTick回调后有概率获取到错误的元素高度，则添加200ms的延迟来减少BUG的产生 */
    setTimeout(() => {
      /* 等待滚动区域初始化完成 */
      this.initScrollView().then(() => {
        /* 获取列表数据，你的代码从此处开始 */
        this.getListData();
      });
    }, 100);
  },
  methods: {
    /* 初始化滚动区域 */
    initScrollView() {
      return new Promise((resolve, reject) => {
        let view = uni.createSelectorQuery().select("#scroll-panel");
        view
          .boundingClientRect((res) => {
            this.scrollTopSize = res.top;
            this.scrollHeight = res.height;
            setTimeout(() => {
              resolve();
            }, 100);
          })
          .exec();
      });
    },
    /* 获取列表数据 */
    getListData() {
      // Promise 为 ES6 新增的API ，有疑问的请自行学习该方法的使用。
      new Promise(async (resolve, reject) => {
        /* 因无真实数据，当前方法模拟数据。正式项目中将此处替换为 数据请求即可 */
        uni.showLoading();

        // 模拟数据
        let mockData = async () => {
          const shop_id = getStorage("business_id");
          const data = (await getGoodsList({ data: { shop_id } })) || [];
          let [left, main] = [[], []];
          data.map((item, index) => {
            left.push({
              name: item.name,
              key: "production" + index,
            });
            main.push({
              title: `${item.name}商品`,
              list: item.goods_list,
              key: "production" + index,
            });
          });

          return {
            left,
            main,
          };
        };
        let res = await mockData();
        let { left, main } = res;
        // 将请求接口返回的数据传递给 Promise 对象的 then 函数。
        resolve({ left, main });
      }).then((res) => {
        uni.hideLoading();
        this.leftArray = res.left;
        this.mainArray = res.main;

        // DOM 挂载后 再调用 getElementTop 获取高度的方法。
        setTimeout(() => {
          this.getElementTop();
        }, 100);
      });
    },
    /* 获取元素顶部信息 */
    getElementTop() {
      new Promise((resolve, reject) => {
        let view = uni.createSelectorQuery().selectAll(".main-item");
        view
          .boundingClientRect((data) => {
            resolve(data);
          })
          .exec();
      }).then((res) => {
        let topArr = res.map((item) => {
          return item.top - this.scrollTopSize; /* 减去滚动容器距离顶部的距离 */
        });
        this.topArr = topArr;

        /* 获取最后一项的高度，设置填充高度。判断和填充时做了 +-20 的操作，是为了滚动时更好的定位 */
        let last = res[res.length - 1].height;
        if (last - 20 < this.scrollHeight) {
          this.fillHeight = this.scrollHeight - last + 20;
        }
      });
    },
    /* 主区域滚动监听 */
    mainScroll(e) {
      // 节流方法
      // clearTimeout(this.mainThrottle);
      // this.mainThrottle = setTimeout(()=>{
      // 	scrollFn();
      // },10);

      let scrollFn = () => {
        let top = e.detail.scrollTop;
        let index = 0;
        /* 查找当前滚动距离 */
        for (let i = this.topArr.length - 1; i >= 0; i--) {
          /* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
          if (top + 2 >= this.topArr[i]) {
            index = i;
            break;
          }
        }
        this.leftIndex = index < 0 ? 0 : index;
      };
      scrollFn();
    },
    /* 左侧导航点击 */
    leftTap(e) {
      let index = e.currentTarget.dataset.index;
      this.scrollInto = `item-${index}`;
    },
    handleNumberChange(data) {
      if (this.selectList.length === 0) {
        this.selectList = [data];
      } else {
        const list = this.selectList.filter((item) => item.id !== data.id);
        this.selectList = data.number !== 0 ? [...list, data] : list;
      }
    },
    async handleOrder() {
      this.showPicker = true;
    },
    async handleSelectRoom(e) {
      const room_id = e.value[0].id
      this.showPicker = false
      const data = this.selectList.map(item => ({
        goods_id: item.id,
        num: item.number,
        is_check: 1
      }))
      uni.showLoading({title: '订单生成中', mask: true})
      try {
        await postCartInstallAll({list: data})
        this.selectList = []
        const order = await createOrder({ room_id })
        this.$refs.commonNumberBox.map(item => {
          if(item.value != 0) {
            item.handleResetValue()
          }
        })
        const res = await postPayOrder({ order_sn: order.order_sn })
        const success = (res) => {
          this.handleMessage({title: '支付成功'})
        }
        const { nonceStr, package: packageId, timeStamp, paySign, signType} = res
        weixinPay({
          timeStamp, nonceStr, packageId, signType, paySign, success
        })
      } finally {
        uni.hideLoading()
      }
    }
  },
};
</script>

<style lang="scss">
page {
  height: 100vh;
}
.container {
  height: 100%;
}
/* 容器 */
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  & > view {
    width: 100%;
  }

  .scroll-panel {
    flex-grow: 1;
    height: 0;
    overflow: hidden;
  }

  .bottom-panel {
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.list-box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  font-size: 28rpx;

  .left {
    width: 200rpx;
    background-color: #f6f6f6;
    line-height: normal;
    box-sizing: border-box;
    font-size: 32rpx;

    .item {
      padding: 30rpx;
      position: relative;

      & + .item {
        margin-top: 1px;

        &::after {
          content: "";
          display: block;
          height: 0;
          border-top: #d6d6d6 solid 1px;
          width: 620upx;
          position: absolute;
          top: -1px;
          right: 0;
          transform: scaleY(0.5); /* 1px像素 */
        }
      }

      &.active {
        color: #00bfff;
        background-color: #fff;
        position: relative;

        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          border-left: #00bfff solid 4px;
          height: 100%;
          width: 0;
        }
      }
    }

    .fill-last {
      height: 0;
      width: 100%;
      background: none;
    }
  }
  .main {
    background-color: #fff;
    padding-left: 20rpx;
    width: 0;
    flex-grow: 1;
    box-sizing: border-box;

    .title {
      line-height: normal;
      padding: 30rpx 0;
      font-size: 24rpx;
      font-weight: bold;
      color: #666;
      background-color: #fff;
      position: sticky;
      top: 0;
      z-index: 19;
    }

    .item {
      padding-bottom: 16rpx;
      border-bottom: #eee solid 1px;
    }

    .goods {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      align-content: center;

      & + .goods {
        margin-top: 16rpx;
      }

      & > image {
        width: 120rpx;
        height: 120rpx;
        margin-right: 16rpx;
        margin-left: 2px;
      }

      .describe {
        font-size: 24rpx;
        color: #999;
      }

      .money {
        font-size: 24rpx;
        color: $uni-color-error;
      }
    }
    .number-box {
      width: 150rpx;
      margin-right: 10rpx;
    }
  }
}
// .picker {
//   position: absolute;
//   bottom: 0;
// }
</style>
