<template>
	<view class="bodys">
		<view class="title">商品轮播图片(选填){{lists.length}}/3</view>
		<view class="tu">
			<!-- <block v-if="!showUploadList"> -->
				<view class="pre-item" v-for="(item, index) in listImg" :key="index" >
					<image class="pre-item-image" :src="item" mode="aspectFill" ></image>
					<view class="delete" @click="deletes(index)"><u-icon name="close-circle" color="#000" size="40"></u-icon></view>
				</view>
			<!-- </block> -->
			<u-upload  :max-count="3" v-if="listImg.length<3"  :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action" @on-change="changes">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
				</view>
			</u-upload>
		</view>
		<view class="heng"></view>
		<view class="title">商品封面图</view>
		<view class="tu">
			<block>
				<view class="pre-item" v-for="(item, index) in imgs" :key="index">
					<image class="pre-item-image" :src="item" mode="aspectFill"></image>
					<view class="delete" @click="deletest(index)"><u-icon name="close-circle" color="#000" size="40"></u-icon></view>
				</view>
			</block>
			<u-upload v-if="imgs.length<1" :max-count="1" :custom-btn="true"  ref="uUploads" :show-upload-list="showUploadList1" :action="action" @on-change="changest">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
				</view>
			</u-upload>
		</view>
		<view class="heng"></view>
		<view class="comm">
			商品名称
			<u-input class="inputs" placeholder="请输入商品名称" :border="none" v-model="name"></u-input>
		</view>
		<view class="heng"></view>
		<view class="comm">
			分类
			<u-input class="inputs" @click="show=true" :disabled="true" placeholder="请选择分类" :border="false" v-model="kind"></u-input>
		</view>
<!-- 		<view class="heng"></view>
		<view class="comm">
			规格名称
			<u-input class="inputs" placeholder="请输入规格名称" :border="false" v-model="guigeName"></u-input>
		</view>
		<view class="heng"></view>
		<view class="comm">
			规格
			<u-input class="inputs" placeholder="请输入规格,用|区分" :border="false" v-model="guige"></u-input>
		</view> -->
		<view class="heng"></view>
		<view class="comm">
			价格
			<u-input class="inputs" type="number" placeholder="请输入价格" :border="false" v-model="price"></u-input>
		</view>
		<view class="heng"></view>
		<view class="comm">
			库存
			<u-input class="inputs" type="number" placeholder="请输入库存数量" :border="false" v-model="number"></u-input>
		</view>
		<view class="heng"></view>
		<view class="comm" style="align-items: flex-start;">
			详情内容
			<u-input class="inputs" type="textarea" placeholder="请输入商品详情" :border="true" v-model="detail"></u-input>
		</view>
		<view class="heng"></view>
		<view class="btn" v-if="!type">
			<!-- <view class="del">删除商品</view> -->
			<view class="edit" @click="changeSave()">保存编辑</view>
		</view>
		<view class="btn1" v-else @click="changeSave()">添加商品</view>
		
		<u-picker v-if="show" v-model="show" mode="selector" :range="kindList" @confirm="right" @cancel="show = false"></u-picker>
		
		
		<u-popup v-model="show1" mode="top">
				<view>
					
				</view>
			</u-popup>
	</view>
</template>

<script>
	import {
		$config
	} from '@/config.js'
	export default {
		data() {
			return {
				name: '',
				kind: '',
				kindId:0,
				guige: '',
				price: '',
				number: '',
				detail: '',
				guigeName: '',
				action: $config.api.baseUrl + $config.api.url.upload, // 演示地址
				showUploadList: false,
				showUploadLists:false,
				// 如果将某个ref的组件实例赋值给data中的变量，在小程序中会因为循环引用而报错
				// 这里直接获取内部的lists变量即可
				lists: [],
				listImg:[] ,//多图片路径
				lists1:[], //小图
				imgs:[]	,//小图路径
				type:false,
				show:false,
				kindList:[],
				kinds:[], //种类
				show1:false ,//弹出规格价格等
				id:0,
				isTrue:false
			}
		},
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.lists = this.$refs.uUpload.lists;
			this.lists1 = this.$refs.uUploads.lists;
		},
		onLoad({
			type,id
		}) {
			this.getList()
			console.log(id);
			if(id){
				this.getInfo(id)
				this.id=id
			}
			if (type) {
				this.type = true
				uni.setNavigationBarTitle({
					title: '添加商品'
				})
			}
		},
		methods: {
			changeSave(){
				if(this.imgs.length==0){
					uni.showToast({
						title:'请添加封面图片',
						icon:'none'
					})
					return
				}
				if(!this.name){
					uni.showToast({
						title:'请填写商品名称',
						icon:'none'
					})
					return
				}
				if(!this.kindId){
					uni.showToast({
						title:'请选择种类',
						icon:'none'
					})
					return
				}
				if(!this.price){
					uni.showToast({
						title:'请输入价格',
						icon:'none'
					})
					return
				}
				if(!this.number){
					uni.showToast({
						title:'请输入商品数量',
						icon:'none'
					})
					return
				}
				
				
				this.$u.api.changeShopSave({
					id:this.id,
					cate_id:this.kindId,
					name:this.name,
					number:this.number,
					price:this.price,
					thumb_photo:this.imgs[0],
					details:this.detail,
					img:this.listImg
				}).then(res=>{
					console.log(res);
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.isTrue = true
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				}).catch(err=>{
					uni.showToast({
						title:err.data.msg,
						icon:'none'
					})
					console.log(err);
				})
			},
			right(e){
				console.log(e,this.kinds[e[0]]);
				this.kindId = this.kinds[e[0]].id
				this.kind = this.kindList[e[0]]
			},
			getList(){
				this.$u.api.cateList({
					pid:0
				}).then(res=>{
					console.log(res);
					this.kinds = res.data
					res.data.filter(item=>{
						// console.log(item);
						this.kindList.push(item.name)
					})
				}).catch(err=>{
					console.log(err);
				})
			},
			getInfo(id){
				this.$u.api.goodsInfo({
					id: id
				}).then(res => {
					console.log(res);
					this.name = res.data.name
					res.data.image_arr.filter((item,index)=>{
						this.lists.push({url:item})
						// console.log();
						// this.listImg.push(item.split(this.$config.api.baseUrl)[1])
						this.listImg.push(item)
					})
					this.lists1.push({url:res.data.thumb_photo})
					this.imgs.push(res.data.thumb_photo)
					this.price = res.data.price
					this.number = res.data.number
					this.kinds.filter(item=>{
						if(item.id == res.data.cate_id){
							this.kindId = item.id
							this.kind = item.name
						}
					})
					this.isTrue = true
					console.log(this.lists,this.listImg,this.lists1,this.imgs);
				}).catch(err=>{
					console.log(err);
				})
			},
			deletes(i){
				console.log(i);
				this.lists.splice(i,1)
				this.listImg.splice(i,1)
			},
			deletest(i){
				this.lists1.splice(i,1)
				this.imgs.splice(i,1)
			},
			changes(e){
				console.log(JSON.parse(e.data).data.path);
				var img = JSON.parse(e.data).data.url
				this.listImg.push(img)
			},
			changest(e){
				var img = JSON.parse(e.data).data.url
				this.imgs.push(img)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bodys {
		width: 750rpx;
		padding: 30rpx;
		box-sizing: border-box;

		.title {
			font-size: 28rpx;
			font-weight: 500;
			color: #000;
		}

		.tu {
			margin-top: 20rpx;
			width: 100%;
			// height: 100rpx;
			// background-color: gray;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}

		.heng {
			width: 100%;
			border-top: 1rpx solid #f6f6f6;
			margin: 30rpx 0;
		}

		.comm {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			font-weight: 500;
			color: #000;

			.inputs {
				width: 500rpx;
			}
		}
	}

	.wrap {
		padding: 24rpx;
	}

	.slot-btn {
		margin-left: 20rpx;
		width: 140rpx;
		height: 140rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}

	.pre-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.pre-item {
		margin-left: 20rpx;
		border-radius: 10rpx;
		width: 140rpx;
		height: 140rpx;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		.delete{
			position: absolute;
			margin-top: -10rpx;
			margin-right: -15rpx;
			
		}
	}

	.pre-item-image {
		width: 140rpx;
		height: 140rpx;
		
	}
	.btn{
		width: 690rpx;
		// height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.del,.edit{
			width: 330rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 15rpx;
			font-size: 28rpx;
			background-color: #efefef;
			color: red;
		}
		.edit{
			width: 100%;
			background-color: #edb603;
			color: #fff;
		}
	}
	.btn1{
		width: 690rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #e43e31;
		color: #fff;
		font-size: 32rpx;
		border-radius: 20rpx;
	}
</style>
