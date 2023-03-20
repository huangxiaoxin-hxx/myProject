<template>
	<view>
		<topInfo text="添加地址"></topInfo>
		<view class="rectangle_2962yd">
			<view class="mxrnq">
				<view class="receiver">收货人</view>
				<input placeholder="姓名" class="name" v-model="form.name">
			</view>
			<view class="rectangle_2952ieg"></view>
			<view class="csymv">
				<view class="receiver">手机号码</view>
				<input placeholder="手机号码" class="cellphone_numbe" v-model="form.mobile">
			</view>
			<view class="rectangle_2952ieg"></view>
			<view class="xtvnbe">
				<view class="kuxrws">
					<view class="receiver">选择地区</view>
					<view class="cellphone_numbe">{{!address?'省、市、区':address}}</view>
				</view>
				<u-icon name="arrow-down" color="#000" size="35" @click="btnClick"></u-icon>
				<!-- <image @click="btnClick" v-if="pstt" :src="pstt+'xamlos.png'" class="hjpwso"></image> -->
			</view>
			<view class="rectangle_2952ieg"></view>
			<view class="" style="margin-top: 28rpx;margin-left: 5%;">
				<view class="receiver">详细地址</view>
				<textarea name="" id="" cols="30" rows="10" class="cellphone_numbe" v-model="form.address" placeholder="详细地址/楼层"></textarea>
			</view>
			<view class="rectangle_2949xew"></view>
			<view class="xtvnbe">
				<view class="receiver">设为默认地址</view>
				<image @click="form.isdefault=!form.isdefault" :src="form.isdefault==false?img[0]:img[1]" class="hjpwso"></image>
				<!-- <image v-if="show=!show" :src="pstt+'sdezp1627024437770.png'" class="hjpwso"></image> -->
			</view>
			<view class="rectangle" v-if="!form.id" @click="addressAdd">
				<view class="add_to">添加</view>
			</view>
			<view class="rectangle" v-else @click="addressupdate">
				<view class="add_to">修改</view>
			</view>
		</view>
		<view class="uqdxnv"></view>
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
	</view>
</template>
<script>
	import selectAddress from '../other/yixuan-selectAddress/yixuan-selectAddress.vue'

	export default {
		components: {
			selectAddress	
		},
		data() {
			return {
				show: false,
				img: [
					this.hosts+'select_no.png',
					this.hosts+'select_yes.png',
					// {},
					// {},
				],
				address: '',
				form: {
					id: '',
					name: '',
					mobile: '',
					province: '',
					city: '',
					area: '',
					address: '',
					isdefault: false,
					
				},
				isTrue:false,
				pstt:''
			}
		},
		onLoad(op) {
			this.pstt = this.hosts
           if(op.id){
			  this.form.id=op.id
			  // this.$request("/index/shop/getAddressDetail", "POST",{id:op.id})
			  // 	.then(res => {
			  // 		if (res.code == 0) {
					// 	this.form.id=res.info.id,
					// 	this.form.name=res.info.name,
					// 	this.form.mobile=res.info.mobile,
					// 	this.form.province=res.info.province,
					// 	this.form.city=res.info.city,
					// 	this.form.area=res.info.area,
					// 	this.form.address=res.info.address,
					// 	this.form.isdefault=Boolean(res.info.isdefault)
					// 	this.address=res.info.province+res.info.city+res.info.area
			  // 			console.log(res)
			  // 		}
			  // 	})
					
					this.$u.api.addressInfo({
						id:op.id
					}).then(res=>{
						console.log('addressInfo',res)
						if (res.code == 200) {
								this.form.id=res.data.id,
								this.form.name=res.data.name,
								this.form.mobile=res.data.mobile,
								this.form.province=res.data.province,
								this.form.city=res.data.city,
								this.form.area=res.data.district,
								this.form.address=res.data.address,
								this.form.isdefault=res.data.is_default
								this.address=res.data.province+res.data.city+res.data.district
								console.log(res)
								}
					}).catch(err=>{
						console.log(err)
					})
		   }
		},
		onShow() {
			this.getLIst()
		},
		methods: {
			getLIst() {
				this.$u.api.addressList().then(res=>{
					console.log('HHY',res)
					if(res.data.length==0){
						this.isTrue =true
					}
					
				}).catch(err=>{
					console.log(err)
				})
			},
			addressupdate(){
				this.$u.api.addressUpdate({
					id:this.form.id,
					province:this.form.province,
					city:this.form.city,
					district:this.form.area,
					name:this.form.name,
					address:this.form.address,
					is_default:this.isTrue?1:this.form.isdefault?1:0,
					mobile:this.form.mobile
				}).then(res=>{
					console.log('reslook',res)
					uni.showToast({
					  title:res.msg,
					  icon:'success'
					})
					setTimeout(()=>{
						uni.navigateBack({
						})
					},1500)
				}).catch(err=>{
					console.log('err',err)
					uni.showToast({
						icon:'none',
						title:err.data.msg
					})
				})
			},
			addressAdd(){
				this.$u.api.addressAdd({
					province:this.form.province,
					city:this.form.city,
					district:this.form.area,
					name:this.form.name,
					address:this.form.address,
					is_default:this.isTrue?1:this.form.isdefault?1:0,
					mobile:this.form.mobile
				}).then(res=>{
					console.log('add_address',res)
					uni.showToast({
					  title:res.msg,
					  icon:'success'
					})
					setTimeout(()=>{
						uni.navigateBack({
						})
					},1500)
				}).catch(err=>{
					uni.showToast({
					  title:err.data.msg,
					  icon:'none'
					})
					console.log('add_addresserr',err)
				})
			},
			btnClick() {
				this.$refs.selectAddress.show()
			},
			successSelectAddress(dataList) { //选择成功回调
				this.address = dataList.join('')
				this.form.province=dataList[0]
				this.form.city=dataList[1]
				this.form.area=dataList[2]
				console.log(this.form)
				// this.dataList.join('')
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/css/add_address.scss";
</style>
