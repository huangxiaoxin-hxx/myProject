const config = {
  provider: 'wxpay',
}

export const weixinPay = ({timeStamp, nonceStr, packageId, signType, paySign, success}) => {
  uni.requestPayment({
    provider: config.provider, 
    nonceStr, // 随机字符串
    package: packageId,        // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx
    paySign,      // 签名
    signType,     // 签名算法，应与后台下单时的值一致
    timeStamp,    // 时间戳（单位：秒）
    success(res) {
      success(res)
    },
    fail(e) {
      console.log(e)
      throw new Error(e)
    }
  })
}

