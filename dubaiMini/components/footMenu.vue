<template>
		<!-- 底部菜单 -->
		<view class="cu-bar tabbar footer_bar bg-bingbang my_box_shadow shadow">
			<view class="action text-green">
				<view class="cuIcon-home"  @click="jump('index')"></view>
				首页
			</view>
		<!-- 	<view class="action text-gray" @click="jump('category')">
				<view class="cuIcon-shop"></view>
				商店
			</view> -->
			<!-- <view class="action text-gray" @click="jump('groupbuy')">
				<view class="cuIcon-goodsnew"></view>
				每月新品
			</view> -->
			<view class="action text-gray" @click="jump('timeline')">
				<view class="cuIcon-hot"></view>
				社区
			</view>
		<!-- 	<view class="action text-gray add-action" @click="jump('publish')">
				<button class="cu-btn cuIcon-add bg-bingbang shadow"></button>
				发布
			</view>
			
			<view class="action text-gray" @click="jump('cart')">
				<view class="cuIcon-cart"><view class="cu-tag badge">99</view></view>
				购物车
			</view> -->
			<view class="action text-gray" @click="jump('my')">
				<view class="cuIcon-my"><view class="cu-tag badge"></view></view>
				个人中心
			</view>
		</view>
		<!-- 底部菜单 -->
</template>

<script>
	export default {
		data() {
			return {
				key: value
			}
		},
		methods:{
		  jump(pageName) {
			  console.log('11' + JSON.stringify());
			uni.navigateTo({
				url: `pages/${pageName}/${pageName}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		}
	}
</script>

<style>
</style>

