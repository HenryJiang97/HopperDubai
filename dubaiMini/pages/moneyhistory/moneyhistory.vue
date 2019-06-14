<template>
	<div class="orders">
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
				<block slot="backText">返回</block>
				<block slot="content">账户金明细</block>
		</cu-custom>
			
		
		<view class="cu-list menu">
			<view class="cu-item" v-for="(x,index) in 10" :key="index">
					<view class="content padding-tb-sm">
						<view>
							<text class="text-black margin-right-xs text-lg"></text> 微信红包</view>
						<view class="text-gray text-sm">
							<text class=" margin-right-xs"></text> 2019-09-03 12:23:12 </view>
					</view>
					
					<view class="action text-lg">
						- 48
					</view>
					
			</view>
		</view>
		
		
			
			
	

</div>
</template>

<script>
export default {
	data() {
		return {
			TabCur: 0,
				scrollLeft: 0
		};
	},
	onLoad() {
		
	},
	methods: {
		tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
	}
};
</script>

<style>

</style>
