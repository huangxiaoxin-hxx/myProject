<template>
	<view>
		<view class="ktwde">
			<image v-if="pstt" :src="pstt+'cbfecbbbcbbddcrwmttf_zfgtn1627003864090.png'" alt=""
				style="position: absolute;z-index: -1;left: 0px;top: 0px;width: 100%;height: 100%;"></image>					<!-- 状态栏高度 -->
			<view class="my_team_top" :style="'margin-top:'+wHeight+'rpx;'">
					<image  v-if="pstt":src="pstt+'qtxoe1627006586707.png'" @click="back" class="group_2388cqu"></image>
				<view class="my_team">我的团队</view>
				<!-- <view class="team_rule" @click="$gonext('team_rule')" >团队规则</view> -->					</view>
				
		</view>
		<view class="rectangle_2385qzc">
			<view class="rezcb">
				<view class="xvedzn">
					<view class="hsu2378oka">{{user.sonNum}}</view>
					<view class="total_people">直推人数</view>
				</view>
				<view class="xvedzn">
					<view class="hsu2378oka">{{user.reward}}</view>
					<view class="total_people">推荐奖励</view>
				</view>
			</view>
		</view>
		<view class="rectangle_2360ugj">
			<view class="iavqhl">
				<view class="nickname">会员名</view>
				<view class="types_of">类型</view>
			</view>
			<view class="caqurf">
				<view class="rectangle_2359lp" v-for="(item,i) of list" :key="i">
					<view class="headers">
						<image class="headers_img" :src="item.header"></image>
					</view>
					<view class="reverse">{{item.user_name}}</view>
					<view class="direct_push_2335anu">{{item.level_text}}</view>
				</view>
			</view>
		</view>
		<view class="xucjni"></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: {},
				list: [],
				level: [this.hosts+'v0.png', this.hosts+'v1.png', this.hosts+'v2.png', this.hosts+'v3.png', this.hosts+'v4.png',
					this.hosts+'v5.png'
				],
				wHeight: '',
				last_page:1,
				page:1,
				limit:20,
				pstt:''
			}
		},
		onLoad() {
			this.pstt= this.hosts
			// #ifdef APP-PLUS
			this.wHeight = plus.navigator.getStatusbarHeight();
			// #endif
			//#ifdef MP-WEIXIN
			this.wHeight = 80
			//#endif
		},
		onShow() {
			this.teamList()
			this.getList()
		},
		methods: {
			teamList() {
				this.$u.api.shareTotal().then(res => {
					console.log(res)
					this.user = res.data
				}).catch(err => {
					uni.showToast({
						icon: "none",
						title: err.data.msg
					})
					console.log(err)
				})
			},				back() {
				uni.navigateBack({

				})					},			 getList(type) {
				this.$u.api.userSonList({
					page: this.page,
					limit: this.limit
				}).then(res => {
					this.last_page = res.data.last_page
					if(type){
						this.list.push(...res.data.data)
					}else{
						this.list = res.data.data
					}
					console.log('look', res)
				}).catch(err => {
					console.log(err)
				})
				// this.$request("/index/Member/myTeam", "POST",{limit:30,page:1})
				// 	.then(res => {
				// 		if (res.code == 0) {
				// 			this.user=res.info.user
				// 			this.list=res.info.list
				// 		}
				// 	})
			}
		},
		onReachBottom:function(){
			if(this.last_page>this.page){
				this.page ++
				this.getList(true)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/css/my_team.scss";

	.my_team_top {
		padding: 0;
		position: absolute;
		// left: -20rpx;
		width: 750rpx;
		display: flex;
		align-items: center;

			// justify-content: center;
			.group_2388cqu {
					position: absolute;				left: 20rpx;
			}

			.my_team {
				margin: 0 auto;
				}
				
				}
			.team_rule {
				position: absolute;				right: 30rpx;
			}
			.rectangle_2360ugj{
				// padding: 0;
				// margin: 0;
			}
		.reverse{
			display:-webkit-box;
			overflow:hidden;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:1; //显示两行
		}
		.iavqhl{
			width: 100%;
			display: flex;
			justify-content: flex-end;
			margin: 0;
			padding: 0;
			.nickname,.types_of{
				width: 40%;
				display: flex;
				justify-content: center;
				align-content: center;
				padding: 0;
				margin: 0;
				margin-top: 20rpx;
				
			}
		}
		.rectangle_2359lp{
			
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.headers{
				width: 20%;
				display: flex;
				justify-content: center;
				align-items: center;
				.headers_img{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
				}
			}
			.reverse,.direct_push_2335anu{
				padding: 0;
				margin: 0;
				width: 40%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
</style>
