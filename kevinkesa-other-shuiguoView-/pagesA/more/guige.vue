<template>
	<view class="bodys">
		<view class="heng"></view>
		<view class="comm">
			规格名称
			<u-input class="inputs" placeholder="请输入规格名称" :border="false" v-model="name"></u-input>
		</view>
		<view class="heng"></view>
		<view class="comm">
			规格
			<u-input class="inputs" placeholder="请输入规格,用|区分" :border="false" v-model="guige"></u-input>
		</view>
		<view class="heng"></view>
		<view class="btn" @click="create">生成规格表单</view>
		<view class="heng"></view>
		<view style="width: 750rpx;" v-if="list.length">
			<u-table>
				<u-tr class="u-tr">
					<u-th class="u-th">
						<view>规格</view>
					</u-th>
					<u-th class="u-th">
						<view>价格</view>
					</u-th>
					<u-th class="u-th">
						<view>库存</view>
					</u-th>
					<u-th class="u-th">
						<view>图片</view>
					</u-th>
					<u-th class="u-th">
						<view>修改</view>
					</u-th>
				</u-tr>
				<block v-for="(item,index) of list" :key="item.id">
					<u-tr class="u-tr">
						<u-td class="u-td">
							<view>{{item.suk}}</view>
						</u-td>
						<u-td class="u-td">
							<u-input class="inputs1" :disabled="true" input-align="center" type="number" :clearable="false"
								placeholder="请输入价格" :border="false" v-model="item.price"></u-input>
						</u-td>
						<u-td class="u-td">
							<u-input class="inputs1" :disabled="true" input-align="center" type="number" :clearable="false"
								placeholder="数量" :border="false" v-model="item.number"></u-input>
						</u-td>
						<u-td class="u-td">
							<view>
								<image class="td_img" :src="item.photo" ></image>
							</view>
						</u-td>
						<u-td class="u-td">
							<view
								style="height: 100rpx;display: flex;flex-direction: column;justify-content: space-between;">
								<view @click="edit(item,index)">
									修改
								</view>
								<view @click="delet(item,index)" style="color: red;">
									删除
								</view>
							</view>
						</u-td>
					</u-tr>
				</block>
			</u-table>
		</view>
		<u-popup v-model="shows" mode="center" border-radius="14">
					<view class="bodyst" v-if="shows">
						<view  class="pops">
							<view class="input_com" style="margin-top: 30rpx;">
								价格:
								<u-input class="inputs1" input-align="left" type="number" :clearable="false"
									placeholder="请输入价格" :border="true" v-model="info.price"></u-input>
							</view>
							<view class="input_com" style="margin-top: 30rpx;">
								库存:
								<u-input class="inputs1" input-align="left" type="number" :clearable="false"
									placeholder="请输入库存" :border="true" v-model="info.number"></u-input>
							</view>
							<view class="input_com" style="margin-top: 30rpx;">
								上传图片:
								<view style="border: 1rpx solid #000;border-radius: 10rpx;padding: 10rpx;">
									<image class="td_img" :src="info.photo" @click="upload(indexs)"></image>
								</view>
							</view>
							<view class="endit" style="margin-top: 30rpx;" @click="edits">修改</view>
							<view class="endit" style="background-color: chocolate;margin-top: 30rpx;" @click="shows = false">取消</view>
						</view>
						
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
				id: 0,
				name: '',
				guige: '',
				list: [],
				isShow: false,
				server: $config.api.baseUrl + $config.api.url.upload,
				info:{},
				shows:false,
				indexs:0
			}
		},
		onLoad({
			id
		}) {
			if (id) {
				this.id = id
				console.log(id);
				this.getInfo(id)
			}
		},
		methods: {
			edits(){
				this.$u.api.updateSku({
					sku_id: this.info.id,
					price: this.info.price,
					number: this.info.number,
					photo: this.info.photo
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.shows = false
					this.getInfo(this.id)
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: err.data.msg,
						icon: 'none'
					})
				})
			},
			delet(item, index) {
				uni.showModal({
					title: '确定要删除吗？',
					success: (e) => {
						console.log(e);
						if (e.confirm) {


							this.$u.api.deleteSku({
								sku_id: item.id
							}).then(res => {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
								this.getInfo(this.id)
								console.log(res);
							}).catch(err => {
								uni.showToast({
									title: err.data.msg,
									icon: 'none'
								})
								console.log(err);
							})

						}
					}
				})

			},
			upload(index) {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths), res);
						var tempFilePaths = res.tempFilePaths
						uni.uploadFile({
							url: this.server, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								"Authorization": this.vuex_token
							},
							success: (uploadFileRes) => {

								console.log(uploadFileRes.data);
								this.list[index].photo = JSON.parse(uploadFileRes.data).data.url
								this.info.photo = JSON.parse(uploadFileRes.data).data.url
							}
						});
					}
				});
			},
			edit(item, index) {
				console.log(item, index, this.list);
				this.info = item
				this.indexs = index
				this.shows = true
				return
				// uni.showModal({
				// 	title: '确定修改吗？',
				// 	success: (e) => {
				// 		console.log(e);
						// if (e.confirm) {
							
						// }
				// 	}
				// })

			},
			create() {
				if (!this.name) {
					uni.showToast({
						title: "请输入规格名称",
						icon: "none"
					})
					return
				}
				if (!this.guige) {
					uni.showToast({
						title: "请输入规格",
						icon: "none"
					})
					return
				}
				this.$u.api.createSku({
					goods_id: this.id,
					attr_name_1: this.name,
					attr_value_1: this.guige
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.list = res.data.skuList
					this.isShow = true
				}).catch(err => {
					console.log(err);
				})
			},
			getInfo(id) {
				this.$u.api.skuDataG({
					goods_id: id
				}).then(res => {
					console.log(res, res.data.attr.length);
					if (res.data.attr.length) {
						// console.log('tao');
						this.name = res.data.attr[0].attr_name
						this.guige = res.data.attr[0].attr_value
						this.list = res.data.attrList
					}
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bodys {
		// padding:0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.heng {
		width: 670rpx;
		border-top: 1rpx solid #f6f6f6;
		margin: 30rpx 0;
	}

	.comm {
		width: 670rpx;
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

	.btn {
		width: 670rpx;
		height: 80rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #d83d4d;
		color: #fff;
	}

	.td_img {
		width: 110rpx;
		height: 110rpx;
	}

	.u-td {
		height: auto;
	}
	.bodyst{
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left:0;
		background: rgba(102, 102, 102, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 110;
	}
	.pops{
		width: 550rpx;
		// height: 400rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
		.endit{
			width: 100%;
			height: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #d83d4d;
			color: #fff;
			border-radius: 15rpx;
		}
		
	}
	.input_com{
		width: 100%;
		display: flex;
		align-items: center;
		// justify-content: space-between;
		.inputs1{
			width: 350rpx;
			margin-left: 30rpx;
		}
		
	}
</style>
