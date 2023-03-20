<template>
	<view>
		<topInfo text="分享建议"></topInfo>
		<view class="sharePropo">
			<view style="margin-top: 20rpx;margin-left: 10rpx;">
				<u-input v-model="value" type="textarea" :border="true" height="200" :clearable="false" :auto-height="true" placeholder="请输入您的建议~~" />
			</view>
			<u-upload ref="uUpload" :action="server" :auto-upload="true" @on-uploaded="uploads" @on-remove="remove"></u-upload>
			<view class="suggest_sub" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import {$config} from '@/config.js'
	export default {
		data(){
			return {
				value:'',
				server: $config.api.baseUrl + $config.api.url.upload,
				imgData:[],
				imgs:[]
			}
		},
		methods:{
			submit(){
				this.$u.api.feedbackSave({
					message:this.value,
					imgs:this.imgs
				}).then(res=>{
					console.log(res)
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					setTimeout(()=>{
						if(res.code==200){
							uni.navigateBack({
								
							})
						}
					},1500)
				}).catch(err=>{
					uni.showToast({
						icon:'none',
						title:err.data.msg
					})
					console.log(err)
				})
			},
			remove(e){
				console.log(e)
				this.imgs.splice(e,1);
				console.log(this.imgData)
			},
			uploads(e){
				this.imgs = []
				for(var i=0;i<e.length;i++){
					this.imgData.push(e[i].response)
					this.imgs.push(e[i].response.data.path)
				}
				console.log(e)
				console.log(this.imgData)
				console.log(this.imgs)
				
				// this.$refs.uUpload.upload();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sharePropo{
		width: 690rpx;
		margin: 20rpx auto;
		.shareText{
			font-size: 32rpx;
			font-weight: bold;
		}
		.suggest_sub{
			margin-top: 40rpx;
			width: 100%;
			height: 80rpx;
			border-radius: 15rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #32cbb0;
			color: #fff;
		}
	}
</style>