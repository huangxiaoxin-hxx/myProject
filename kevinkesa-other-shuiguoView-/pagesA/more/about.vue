<template>
	<view>
		<rich-text :nodes="nodes"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nodes:''
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods:{
			getInfo(){
				this.$u.api.GGinfo({
					id:2
				}).then(res=>{
					console.log(res)
					this.nodes = res.data.content
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>