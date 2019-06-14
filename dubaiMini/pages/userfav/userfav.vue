<template>
	<div>
		
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
			<block slot="backText">返回</block>
			<block slot="content">用户喜欢的产品</block>
		</cu-custom>
		
		<view class="cu-bar bg-white tabbar border shop solid-bottom">
				<view class="btn-group">
					<navigator url="../monthlyNew/monthlyNew">
						<button class="cu-btn bg-orange round shadow-blur">每月新品</button>
					</navigator>
					
					<navigator url="../userfav/userfav">
					<button class="cu-btn bg-red round shadow-blur">用户喜欢的产品</button>
					</navigator>
				</view>
		</view>
			
		
		<!-- main	 -->
			<div class="main">
				<!-- #ifndef MP-BAIDU -->
		<scroll-view class="list"  scroll-y @scrolltolower="loadMore(idx)" @click="goDetail()">
			
			
			
		<view class="bg-white padding ">
				<view class="grid margin-bottom text-center col-2" v-for="(item,index) in 8" :key="index">
					
					<view class="" >
						<view class="cu-card case "  >
			<view class="cu-item  list_item_margin solid" style="margin-left: 0;border-radius: 0; ">
				<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk.jpg" mode="widthFix"></image>
					<view class="cu-tag bg-yellow">促销</view>
					<!-- <view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view> -->
				</view>
				
				<view class="cu-list ">
					<view class="cu-item ">
						
						<view class="content flex-sub" style="padding: 20upx 0;">
							<view class="text-grey">炫彩美白护肤洁面乳大促</view>
							<view class="text-red">¥ 120</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
					</view>		
								
								
					<view class="">
						<view class="cu-card case " :class="isCard?'no-card':''">
			<view class="cu-item shadow list_item_margin solid" style="margin-right: 0; border-radius: 0">
				<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk2.jpg" mode="widthFix"></image>
					<view class="cu-tag bg-yellow">促销</view>
					<!-- <view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view> -->
				</view>
				
				<view class="cu-list ">
					<view class="cu-item ">
						
						<view class="content flex-sub" style="padding: 20upx 0;">
							<view class="text-grey">炫彩美白护肤洁面乳大促</view>
							<view class="text-red">¥ 120</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
					</view>	
									
				</view>
			</view>
				
				
		
		
		
	

			<view class="uni-tab-bar-loading">
				<view class="loading-more">{{ loadingText }}</view>
			</view>
		</scroll-view>
		<!-- #endif -->
			</div>
		<!-- main -->
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods:{
			goDetail(){
			uni.navigateTo({
				url:'../goods/goods'
			})
		},
		}
	}
</script>

<style scoped>

</style>