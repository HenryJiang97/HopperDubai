<template>
	<div class="item">
		
		<view class="cu-card case "  >
			<view class="cu-item  list_item_margin solid" style="margin-left: 0;  ">
				<view class="image">
					<image src="https://www.wudizu.com/wp-content/uploads/2019/04/mk.jpg" mode="widthFix"></image>
					<view class="cu-tag bg-yellow">{{item.label}}</view>
					<!-- <view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view> -->
				</view>
				
				<view class="cu-list ">
					<view class="cu-item padding-lr-sm">
						
						<view class="content flex-sub" style="padding: 20upx 0;">
							<view class="text-grey"> <text class="cu-tag margin-right-sm">{{item.brand}}</text> {{item.name}}</view>
							<view class="text-red flex justify-around">
								<text class="margin-right-sm">原价:¥ {{item.price}}</text>
								<text class="text-red">拼团价:¥ {{item.groupPrice}}</text>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
					
	</div>
</template>

<script>
	
	export default {
		props:['item'],
		data() {
			return {
				
			}
		},
		
		computed:{
			
		},
		
		watch:{
			
		},
		
		onLoad() {
			
			// console.log('this.name' + JSON.stringify(this.name));
		}
	}
	
</script>

<style>
</style>
