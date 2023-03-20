<script>
	export default {
		onLaunch: function(res) {
			
			console.log(res,'米国人')
			if(res.query.shareId){
				uni.setStorageSync('shareId',res.query.shareId)
			}
			// setInterval(()=>{
				// var isLog=uni.getStorageSync('isLog')
			// 	if(isLog){
			// 		this.$request("/index/up/uplevel", "POST").then(res => {
			// 			if (res.code == 0) {
			// 				console.log('加载')
			// 			}
			// 		})
			// 	}else{
			// 		console.log('未登录')
			// 	}
			// },60000)
			
			// #ifdef APP-PLUS
			    var req = {
			      appid: plus.runtime.appid,
			      version: plus.runtime.version
			    };
			
			    this.$u.api.checkVersion(req).then((res) => {
			      console.log('看看ba',res);
			      if (res.code == 200) {
			        let android = res.data[1];
			        // uni.setStorageSync("appUrl", android.url);
							
			        if (android.state == 1) {
			          // uni.showModal({
			          //   //提醒用户更新
			          //   title: "Upgrade tips",
			          //   content: android.update_msg,
			          //   success: (res) => {
			          //     plus.runtime.openURL(android.url);
			          //   },
			          // });
			          uni.showModal({
			            title: android.update_msg,
			            content: android.update_msg,
			            showCancel: false,
			            // cancelText: "Cancel",
			            // cancelColor: "#555",
			            confirmColor: "#5677fc",
			            confirmText: '确定',
			            success(res) {
			              if (res.confirm) {
			                plus.runtime.openURL(android.url);
			              } else {
			                //callback && callback(false)
			              }
			            },
			          });
			        }
			      }
			    });
			
			    // #endif
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onLoad() {
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";


// /deep/.tabbar__icon__diff {
		// 	width: 68%!important;
		// 	height: 46px!important;
		// 	margin-top: 7%;

		// }
		uni-input{color: #000!important;}
	uni-image {
		width: auto;
		height: auto;
	}

	uni-image>img {
		height: auto;
		position: relative;
		opacity: 1;
		display: block;
	}

	uni-image>div {
		display: none;
	}
</style>
