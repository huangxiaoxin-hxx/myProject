<template>
    <view>
        <view class="ejgxp"><image :src="hosts+'rectangle_3179vm_gjlvy1627004134633.png'" alt="" style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;"></image>
            <image @click="$back" :src="hosts+'return_igscp1627003662191.png'" class="qpbfxi"></image>
            <view class="yfqzl">
                <view class="jaute">
                    <image :src="hosts+'success_vocdb1627004131193.png'" class="bpanz"></image>
                    <view class="payment_successfu">支付成功！</view>
                </view>
                <view class="havsop">
                    <view class="rectangle_3160rq" @click="$gonext('mall_order')">
                        <view class="check_order">查看订单</view>
                    </view>
                    <view class="rectangle_3159ua" @click="$gonext('homepage_is_not')">
                        <view class="check_order">返回首页</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="wulqa"><image :src="hosts+'group_rvngc1627004121013.png'" alt="" style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;"></image>
            <view class="rectangle_3158mf">
                <view class="ytlzi">
                    <view class="actual_payment">实际支付</view>
                    <view class="mi3148gj">￥{{info.total}}</view>
                </view>
                <view class="tcouw">
                    <view class="actual_payment">订单编号</view>
                    <view class="mi3148gj">{{info.ordersn}}</view>
                </view>
                <view class="tcouw">
                    <view class="actual_payment">下单时间</view>
                    <view class="mi3148gj">{{info.createtime}}</view>
                </view>
                <view class="delivery_informatio">收货信息</view>
<!--                <view class="wooden_wood">{{info.address.name}} {{info.address.mobile.slice(0,3)}}****{{info.address.mobile.slice(-4)}}</view>
                <view class="room_a_guangfa_bank">{{info.address.province}}{{info.address.city}}{{info.address.area}}{{info.address.address}}</view> -->
            </view>
        </view>
        <view class="rkuxjq"></view>
	</view>
</template>
<script>
    export default {
        data() {
            return {
                info:{}
            }
        },
        onLoad(op) {
            this.$request("/index/shop/orderDetail", "POST", {
            	orderid: op.orderid
            }).then(res => {
            	if (res.code == 0) {
            		this.info=res.info
            	}
            })
        },
        onShow() {
            
        },
        methods: {
            
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/css/payment_successfu.scss";
</style>
