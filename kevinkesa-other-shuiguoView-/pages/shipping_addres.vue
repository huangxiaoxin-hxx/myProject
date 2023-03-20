<template>
	<view>
		<view class="rectangle_2218twn">
			<view class="ayfnvj" v-for="(item,i) of list" @click="Choose(item.id)">
				<view class="vkzbrl">
					<view class="fymut">
						<view class="wooden_wood_2217wb">{{item.name}}</view>
						<view class="cqy2212igy">{{item.mobile}}</view>
					</view>
					<view>
						<image @click.stop="edit(item.id)" v-if="pstt" :src="pstt+'edit_2202mid_wnrti1627003820150.png'" class="lsunt margin-r10"></image>
						<image @click.stop="addressDel(item.id)" v-if="pstt" :src="pstt+'del.png'" class="lsunt"></image>
					</view>
				</view>
				<view class="beijing_tongzhou_2207mj">{{item.province+item.city+item.district+item.address}}</view>
				<view class="rectangle_2197cqj"></view>
			</view>
		</view>
		<view class="jwrkcz"></view>
		<view class="rectangle_2193cfj">
			<view class="rectangle_2192ie" @click="$gonext('/pagesA/more/add_address?chooseId='+chooseId)">
				<view class="add_new_shipping">添加新的收货地址</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
              list:[],
			  chooseId:'',
				pstt:''
			}
		},
		onLoad(op) {
			this.pstt = this.hosts
      if(op.chooseId){
				 this.chooseId=op.chooseId
			 }
		},
		onShow() {
			this.getLIst()
		},
		methods: {
			addressDel(id){
				this.$u.api.addressDel({
					id:id
				}).then(res=>{
					console.log('addressDel',res)
					this.getLIst()
					uni.showToast({
						icon:"none",
						title:res.msg
					})
				}).catch(err=>{
					console.log('addressDelerr',err)
					uni.showToast({
						icon:"none",
						title:err.msg
					})
				})
			},
			addressGet(){
				this.$u.api.addressList().then(res=>{
					console.log('addressGet',res)
				}).catch(err=>{
					console.log('addressGeterr',err)
				})
			},
			Choose(id){
				if(this.chooseId){
					uni.setStorageSync('addressIDs',id) //获取地址数据的值
					uni.navigateBack({})
					console.log(id)
				}
			},
			edit(id){
				uni.navigateTo({
					url:'add_address?id='+id
				})
			},
			getLIst(){
					this.$u.api.addressList().then(res=>{
						console.log(res)
						this.list = res.data
					}).catch(err=>{
						console.log(err)
					})
			},
			del(id){
				this.$request("/index/shop/deladdress", "POST",{id:id})
					.then(res => {
						uni.showToast({
						  title:res.msg,
						  icon:'success'
						})
						if (res.code == 0) {
							this.getLIst()
						}
					})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../css/shipping_addres.scss";
</style>
