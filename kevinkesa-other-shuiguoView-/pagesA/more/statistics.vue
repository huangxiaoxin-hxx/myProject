<template>
	<view>
		<u-table>
			<u-tr class="u-tr">
				<u-th class="u-th1" width="420rpx"><view style="width: 460rpx;">产品</view></u-th>
				<u-th class="u-th" >待核销订单数</u-th>
			</u-tr>
			<block v-for="(item,index) of list" :key="item.id">
				<u-tr class="u-tr" >
				<u-td class="u-td" ><view style="width: 460rpx;">{{item.name}}</view></u-td>
				<u-td class="u-td" >{{item.num}}</u-td>
			</u-tr>
			</block>
			
		</u-table>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		onShow() {
			this.getList()
		},
		methods:{
			getList(){
				this.$u.api.goodsTotals().then(res=>{
					console.log(res);
					this.list = res.data
				}).catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-tr{
		width: 750rpx;
	}
	.u-td{
		height: auto;
	}
</style>