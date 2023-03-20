<template>
	<view>
		<canvas type="2d" id="qrcode" :style="{ width: `${size}rpx`, height: `${size}rpx`,padding:'20rpx' }"></canvas>
	</view>
</template>

<script>
	import uQRCode from 'u-qrcode';
	export default {
		props: {
			size: {
				default: 300
			},
			Text: {
				default: 123456
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this)
			query.select(`#qrcode`)
				.fields({
					node: true,
					size: true
				})
				.exec((res) => {

					const canvas = res[0].node
					const ctx = canvas.getContext('2d');
					const dpr = uni.getSystemInfoSync().pixelRatio;
					canvas.width = this.size * dpr;
					canvas.height = this.size * dpr;
					ctx.scale(dpr, dpr);
					let uqrcode = new uQRCode(
					      {
					        text: this.Text,
					        size: this.size
					      },
					      ctx
					    );
					uqrcode.make();
					uqrcode.draw();
					uni.canvasToTempFilePath({
						canvas: uqrcode,
						success: (res) => {
							console.log('taoge', res.tempFilePath)
							this.$emit('cruts', res.tempFilePath)
						//	uni.hideLoading()
						}
					})
				});




			console.log('taoge')

			// console.log(ctx)

			// console.log(uqrcode)

		}
	}
</script>

<style>
</style>
