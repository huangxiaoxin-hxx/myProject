/* export const setMyStorage = (value, key = ACCESS_TOKEN) => {
  const params = {
    date: new Date().getTime(),
    value
  };
  uni.setStorageSync(key, JSON.stringify(params));
}


export const getMyStorage = (day = 0.5, key = ACCESS_TOKEN) => {
  let obj = uni.getStorageSync(key);
  if (!obj) return null;
  obj = JSON.parse(obj);
  const date = new Date().getTime();
  if (date - obj.date > 86400000 * day) return null;
  return obj.value;
}

export const removeMyStorage = (key = ACCESS_TOKEN) => {
  uni.removeStorageSync(key);
} */

//缓存,默认有效期28天 
export const myCache = (key, value, seconds) => {

	var timestamp = Date.parse(new Date()) / 1000
	console.log(timestamp + "==ddd=" + key)
	/* if (key && value === null) {
		//删除缓存
		//获取缓存
		var val = uni.getStorageSync(key);
		var tmp = val.split("|")
		if (!tmp[1] || timestamp >= tmp[1]) {
			console.log("key已失效")
			uni.removeStorageSync(key)
			return ""
		} else {
			console.log("key未失效")
			return tmp[0]
		}
	} else if (key && value) {
		//设置缓存
		if (!seconds) {
			var expire = timestamp + (600) //10分钟
		} else {
			var expire = timestamp + seconds
		}
		value = value + "|" + expire
		uni.setStorageSync(key, value);
	} else {
		console.log("key不能空")
	} */
}

