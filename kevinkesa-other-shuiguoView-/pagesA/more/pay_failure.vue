<template>
    <view>
        <view class="jgyqko"><image :src="hosts+'rectangle_3179vm_gjlvy1627004134633.png'" alt="" style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;"></image>
            <image @click="$back" :src="hosts+'return_igscp1627003662191.png'" class="cpukr"></image>
            <view class="nycbm">
                <image :src="hosts+'failure_bihes1627004149513.png'" class="uzkqt"></image>
                <view class="pay_failure">支付失败！</view>
            </view>
            <view class="insxae">
                <view class="rectangle_3189fu">
                    <view class="check_order">查看订单</view>
                </view>
                <view class="rectangle_3189fu">
                    <view class="check_order">重新支付</view>
                </view>
            </view>
        </view>
        <view class="cszqf"><image :src="hosts+'group_bwfzr1627004145051.png'" alt="" style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;"></image>
            <view class="rectangle_3187zs">
                <view class="no_records">暂无记录！</view>
            </view>
        </view>
        <view class="cbhpkq"></view>
	</view>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
        onLoad() {
            
        },
        onShow() {
            
        },
        methods: {
            
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/css/pay_failure.scss";
</style>
