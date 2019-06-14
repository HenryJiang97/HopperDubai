<template>
	<div>
		
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
			<block slot="backText">返回</block>
			<block slot="content">每月新品</block>
		</cu-custom>
		
		
	<!-- 	<view class="cu-bar bg-white tabbar border shop solid-bottom">
				<view class="btn-group">
					<navigator url="../monthlyNew/monthlyNew">
						<button class="cu-btn bg-orange round shadow-blur">每月新品</button>
					</navigator>
					
					<navigator url="../userfav/userfav">
					<button class="cu-btn bg-red round shadow-blur">用户喜欢的产品</button>
					</navigator>
				</view>
		</view> -->
			
			
			<view class="cu-card dynamic no-card" >
			
			<view class="cu-item shadow " v-for="(x,idx) in 5" :key="idx" @click="goDetail()">
				
				
				<view class="grid flex-sub " :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(item,index) in isCard?9:1" :key="index">
					</view>
				</view>
				
				<view class="text-content text-lg margin-top text-center">
					<view>新出炉新式化妆品神器疗效不好不要钱</view>
					<view class="text-gray text-sm">专业大厨</view>
					<view class="text-red">¥ 19元</view>
				</view>
				
		
			

			
			</view>
		
		</view>

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