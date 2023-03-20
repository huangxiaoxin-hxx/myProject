<template>
	<view>
		<view class="selectArea_area">
			<view class="select_one" v-for="(item,index) of list" :key="index" @click="select(index)">
				<text class="select_one_text" :style="actions==index?'font-weight:bold;':''">{{item.name}}</text>
				<view v-if="actions==index?true:false" class="select_one_bottom"></view>
			</view>
		</view>
		<view :style="{width:'100%',height:screenHight+'px'}">
			<swiper :disable-touch="true" :current="actions" style="height: 100%;"  @touchmove.stop="stopmove()">
				<swiper-item style="height: 100%;" @touchmove.stop="stopmove()">
				<scroll-view  :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" v-if="show" :style="{height:screenHight+'px'}"
					 >
					<view class="select_common" >
						<view class="select_common_one" v-for="(item,index) of listArea" @click="selects(1,index)" :key="index">
							<text>{{item.text}}</text>
							<u-icon v-if="index==index1" name="checkmark" size="32"></u-icon>
						</view>
					</view>
				</scroll-view>
				</swiper-item>
				<swiper-item @touchmove.stop="stopmove()">
					<scroll-view  :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" v-if="show" :style="{height:screenHight+'px'}"
						 >
					<view class="select_common">
						<view class="select_common_one" v-for="(item,index) of listArea[index1].children" @click="selects(2,index)" :key="index">
							<text>{{item.text}}</text>
							<u-icon v-if="index==index2" name="checkmark" size="32"></u-icon>
						</view>
					</view>
					</scroll-view>
				</swiper-item>
				<swiper-item @touchmove.stop="stopmove()">
					<scroll-view  :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" v-if="show" :style="{height:screenHight+'px'}"
						 >
					<view class="select_common" >
						<view class="select_common_one" v-for="(item,index) of listArea[index1].children[index2].children" :key="index" @click="selects(3,index)">
							<text>{{item.text}}</text>
							<u-icon v-if="index==index3" name="checkmark" size="32"></u-icon>
						</view>
					</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				screenHight:0,
				actions:0,
				list:[{
					name:'北京',
					id:'1'
				},{
					name:'北京',
					id:'2'
				},{
					name:'全部地区',
					id:'3'
				}],
				listArea:[],
				show:false,
				index1:0,
				index2:0,
				index3:0
			}
		},
		async onLoad() {
			
			uni.showLoading({})
			await this.getArea()
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					var bei = (res.windowWidth/375)
					//#ifdef H5
						this.screenHight = (res.windowHeight - 40)
					//#endif
					//#ifdef MP-WEIXIN
					this.screenHight = (res.windowHeight - 40)
					//#endif
				}
			})
		},
		methods:{
			getArea(){
				this.$u.api.getCity().then(res=>{
					this.listArea = res.data
					
					setTimeout(()=>{
						this.show = true
					},50)
					if(uni.getStorageSync('Province')){
						this.list[0].name = uni.getStorageSync('Province')
					}
					if(uni.getStorageSync('city')){
						this.list[1].name = uni.getStorageSync('city')
					}
					if(uni.getStorageSync('county')){
						this.list[2].name = uni.getStorageSync('county')
					}
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			selects(type,index){
				// console.log(this.listArea.eval(name))
				if(type==1){
					this.index1 = index
					this.list[0].name = this.listArea[index].text
				}if(type==2){
					this.index2 = index
					this.list[1].name = this.listArea[this.index1].children[index].text
				}
				if(type==3){
					this.index3 = index
					this.list[2].name = this.listArea[this.index1].children[this.index2].children[index].text
				}
				uni.setStorageSync('Province',this.list[0].name)
				uni.setStorageSync('city',this.list[1].name)
				uni.setStorageSync('county',this.list[2].name)
				if(type<3){
					this.actions++
				}else{
					uni.setStorageSync('isTrue',true)
					uni.navigateBack({
						
					})
				}
				// this.listArea.[name].filter(item=>{
				// 	if(item.name == this.listArea.[name][index].name){
				// 		item.checked = true
				// 	}else{
				// 		item.checked = false
				// 	}
				// })
			},
			select(index){
				this.actions = index
			},
			stopmove(){
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.selectArea_area{
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1rpx solid #eaeaea;
		.select_one{
			padding: 0 30rpx 0 30rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			.select_one_text{
				font-size: 32rpx;
				margin-top: 10rpx;
			}
			.select_one_bottom{
				position: relative;
				bottom: 0;
				width: 55rpx;
				height: 4rpx;
				background-color: #000;
			}
		}
	}
	.select_common{
		width: 690rpx;
		margin: auto;
		display: flex;
		flex-direction: column;
		// align-items: center;
		.select_common_one{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #000;
			font-size: 30rpx;
			line-height: 80rpx;
		}
	}
	.scroll-Y{
		// height: 1000rpx;
	}
</style>