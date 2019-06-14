<template>
	<div>
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
			<block slot="backText">返回</block>
			<block slot="content">收藏的产品</block>
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in ['我收藏的产品','我收藏的心得']" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		
		<div class="save" v-show="TabCur === 1">
			
			<view class="cu-list menu-avatar">
				<view class="cu-item solid-bottom" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 4" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					<view class="cu-avatar radius xl" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big21003.jpg)'}]"></view>
					<view class="content">
						<view class="text-black">来自纽约的化妆品来自纽约的化妆品来自纽约的化妆品来自纽</view>
						<view class="text-black">
							<!-- <text class=" text-red  margin-right-xs">¥ 23</text> -->
					 </view>
					</view>
					
					<view class="move">
						<view class="bg-grey">置顶</view>
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
		</div>
		
		
		<div class="likes grid col-3" v-show="TabCur === 0">
			
				<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk.jpg" mode="widthFix"></image>
					
				</view>
				
				<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk.jpg" mode="widthFix"></image>
					
				</view>
				
				<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk.jpg" mode="widthFix"></image>
					
				</view>
				
					<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk.jpg" mode="widthFix"></image>
					
				</view>
				
				<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk.jpg" mode="widthFix"></image>
					
				</view>
				
				<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk.jpg" mode="widthFix"></image>
					
				</view>
			
		</div>
		
		
			
		

	</div>
</template>

<script>
	export default {
		data() {
			return {
			
				
				TabCur: 0,
				scrollLeft: 0,
				
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
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
		
		tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
		
		// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style scoped>

</style>