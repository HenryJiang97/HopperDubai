<template>
	<div>
		<cu-custom bgColor="my_header_background text-white">
			<block slot="content">支付成功</block>
		</cu-custom>
		
		<div>
			<button @tap="jump('index')">返回首页</button>
		</div>
	</div>
</template>

<script>
export default {
	components:{

	},
	onLoad() {
		
	},
	onShow() {

	},
	
	computed:{
		
	},
	data() {
		return {
		};
	},
	
	methods: {
		jump(pageName) {
			if (pageName === 'my') {
				this.login()
			}
			uni.navigateTo({
				url: `../${pageName}/${pageName}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
	
	}
};
</script>

<style>
</style>
