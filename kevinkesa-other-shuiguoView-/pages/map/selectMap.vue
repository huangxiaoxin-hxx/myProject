<template>
  <view class="select_map">
    <map style="width: 100%; height: 70%;" scale="10" :latitude="latitude" :longitude="longitude" @regionchange="regionchange">
      <cover-image class="position" src="/static/position.png" />
    </map>
	<!-- <view class="search flex flex_center">
      <span style="margin-right: 10rpx;">搜索地址</span>
			<input type="text" v-model="searchValue" @input="searchPosition" class="search_input" placeholder="请输入需要查找的地址" />
    </view> -->
    <view class="select_list">		
      <view class="header">
        请选择店铺所在位置
        <view class="confirm" @click="confirmPosition">确认</view>
      </view>
      <view class="tips">可以移动地图缩放灵活选点</view>
      <view class="scroll">
        <view class="select_item flex flex_center" @click="selectPositionFun(addressList)">
          <view :class="'select'"></view>
          <view class="address">
            <view class="name">{{`${addressList.city.province+addressList.city.city+addressList.city.district}`}}</view>
            <view class="detail">{{`${addressList.address}`}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
const markerConfig = {
  iconPath: '/static/position.png',
  width: 30,
  height: 30
}
import { EventBus } from '@/common/event-bus.js'
const util = require("@/utils/util.js")
const savePosition = {
  latitude: 27.111699,
	longitude: 114.986373,
}
export default {
  name: "selectMap",
  data() {
    return {
			keyword:'',
      latitude: 27.111699,
			longitude: 114.986373,
      type: null,
      addressList: {
				address:'江西省吉安市吉州区',
				city:{
					province:'江西省',
					city:'吉安市',
					district:'吉州区',
					street_number:''
				},
				location:{
					lat:27.111699,
					lng:114.986373
				}
			},
      selectPosition: {},
      searchValue: null
    }
  },
  methods: {
    regionchange(e) {
			console.log(e)
      if(e.detail.type === 'begin') {
        return
      }
      const {latitude, longitude} = e.detail.centerLocation
      savePosition.latitude = latitude
      savePosition.longitude = longitude
      console.log(this.searchValue)
      this.searchValue = null
      this.changePosition(latitude, longitude)
    },
    changePosition(latitude, longitude) {
      this.getAddress(latitude, longitude)
    },
    confirmPosition() {
      // if(JSON.stringify(this.selectPosition) === '{}') {
      //   uni.showToast({title: '请选择地点',icon:'none'})
      //   return
      // }
			uni.setStorageSync('address',JSON.stringify(this.addressList))
      EventBus.$emit('confirmPosition', {
        ...this.selectPosition,
        type: this.type,
        position: {
          latitude: this.selectPosition.lat,
	        longitude: this.selectPosition.lng
        }
      })
      uni.navigateBack({
      	
      }) },
    async getAddress(latitude, longitude) {
      // this.showLoading({title: '加载中'})
      try {
        const {data} = await this.$u.api.searchAddress({
          lat:latitude,
          lng:longitude
        })
        this.addressList = data
      } catch (error) {
				uni.showToast({title: '请求失败',icon:'none'})
      } finally {
        // uni.hideLoading()
      }
    },
    selectPositionFun(data) {
      this.selectPosition = data
    },
    searchPosition(e) {
      const keyword = e.detail.value
      if(keyword) {
        this.searchPositionDebounce(keyword)
      } else {
        setTimeout(() => {
          this.getAddress(savePosition.latitude, savePosition.longitude)
        }, 1000);
      }
    },
  },
  onLoad({type}) {
    this.type = type
    // uni.getLocation({
    //   type: 'gcj02',
    //   success: (res) => {
    //     this.latitude = res.latitude
    //     this.longitude = res.longitude
    //     savePosition.latitude = res.latitude
    //     savePosition.longitude = res.longitude
    //     this.changePosition(res.latitude, res.longitude)
    //   }
    // });
  },
  created() {
		console.log('chenggong')
    this.searchPositionDebounce = util.debounce( async (keyword) => {
			console.log('chenggong')
      try {
        const {data} = await this.$u.api.getPositionByKeyword({
          keyword
        })
        this.addressList = data
      } catch (error) {
				console.log('chenggong1')
				uni.showToast({
					title:'请求失败',
					icon:'none'
				})
      } finally {
				console.log('chenggong2')
        // uni.hideLoading()
      }
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.select_map {
  width: 100%;
  height: 100vh;
  background-color: #000;
  position: relative;
  .position {
    width: 64rpx;
    height: 64rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .select_list {
    width: 100%;
    height: 40vh;
    background-color:  rgba(255,255,255, 1);
    position: fixed;
    bottom: 0;
    border-radius: 40rpx 40rpx 0 0;
    padding: 0 30rpx;
    box-sizing: border-box;
    padding-top: 88rpx;
    .header {
      width: 100%;
      height: 68rpx;
      line-height: 68rpx;
      position: absolute;
      font-size: 30rpx;
      font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
      font-weight: 400;
      color: #2B2B2B;
      text-align: center;
      top: 0;
      left: 0;
      .confirm {
        width: 130rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
        font-weight: 400;
        color: #fff;
        text-align: center;
        position: absolute;
        top: 16rpx;
        right: 30rpx;
        background-color: #219c79;
        border-radius: 10rpx;
      }
    }
    .tips {
      text-align: center;
      font-size: 24rpx;
      color: rgba(0,0,0,0.4);
      position: absolute;
      top: 68rpx;
      width: 100%;
      left: 0;
    }
    .scroll {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: calc(100% - 128rpx);
      overflow: scroll;
    }
    .select_item {
      height: auto;
      border-bottom: 1px solid #EFEFEF;
      .checkbox {
        width: 28rpx;
        height: 28rpx;
        border: 2rpx solid #9A9A9A;
        border-radius: 50%;
        margin-right: 30rpx;
      }
      .select {
        width: 40rpx;
        height: 40rpx;
        background-image: url("/static/position.png");
        background-repeat: no-repeat;
        background-size: contain;
        margin-right: 22rpx;
      }
      .name {
        width: 600rpx;
        min-height: 36rpx;
        font-size: 30rpx;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #2B2B2B;
        line-height: 36rpx;
        margin-bottom: 16rpx;
        padding-top: 30rpx;
      }
      .detail {
        // height: 30rpx;
        font-size: 26rpx;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #595959;
        line-height: 30rpx;
        width: 600rpx;
        padding-bottom: 30rpx;
      }
    }
  }
  .search {
    position: fixed;
    top: 0;
    width: 100%;
    height: 88rpx;
    background-color: #fff;
    padding: 0 40rpx;
    box-sizing: border-box;
    .search_input {
      border-radius: 50rpx;
      border: 1px solid rgba(0,0,0,0.4);
      height: 68rpx;
      width: 70%;
      padding: 0 30rpx;
      box-sizing: border-box;
    }
  }
}
</style>