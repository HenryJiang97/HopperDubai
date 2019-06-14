<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">社区</block>
		</cu-custom>

		<!-- 工具栏 -->
		
		<div class="cu-bar padding-lr bg-white solid ">
			<div class="item">
				关注<text class=" margin-left-xs"></text>
			</div>
			<div class="item">
				公众<text class=" margin-left-xs"></text>
			</div>
			<div class="item">
				自己<text class=" margin-left-xs"></text>
			</div>
			
			
			<div class="item" @tap="showModal" data-target="DrawerModalR">
				筛选<text class="cuIcon-filter margin-left-xs"></text>
			</div>
			
		</div>
		<!-- 工具栏 -->
		
		
		<!-- 过滤器 -->
		<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-xl" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				
				<view class="cu-list menu text-left">
					
					
					
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>肤质</view>
							
							<view class="text-gray grid text-sm  text-center col-3">
								<view v-for="(x,idx) in 6" :key="idx" class="text-black" style="margin-top: 20upx;">
									<text class="round padding-lr-sm padding-tb-xs bg-gray ">干性</text>
								</view>
								
							</view>
						</view>
						
					</view>
					
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>年纪</view>
							
							<view class="text-gray grid text-sm  text-center col-3">
								<view v-for="(x,idx) in 6" :key="idx" class="text-black" style="margin-top: 20upx;">
									<text class="round padding-lr-sm padding-tb-xs bg-gray ">23-26</text>
								</view>
								
							</view>
						</view>
						
					</view>
					
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>国家</view>
							
							<view class="text-gray grid text-sm  text-center col-3">
								<view v-for="(x,idx) in 6" :key="idx" class="text-black" style="margin-top: 20upx;">
									<text class="round padding-lr-sm padding-tb-xs bg-gray ">美国</text>
								</view>
								
							</view>
						</view>
						
					</view>
					
				</view>
				
				
				
			</view>
		</view>
		<!-- 过滤器 -->
		
<div class="pins padding-sm" style="column-count: 2;column-gap: 18upx;" @click="jump('communityDetail')">
	<view class="cu-card dynamic no-card margin-bottom-sm radius" v-for="(x,s) in cardData" :key="s">
			<view class="cu-item shadow">
				<view class="grid flex-sub padding-0" :class="isCard ? 'col-3 grid-square' : 'col-1'">
					<view
						class="bg-img"
						:class="isCard ? '' : 'only-img'"
						style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
						v-for="(item, idx) in isCard ? 9 : 1"
						:key="idx"
					></view>
				</view>
				
				<view class="text-content margin-tb-sm">
					{{x.content}}
				</view>
				
				<view class="cu-list menu-avatar">
					<view class="cu-item " style="height: 100upx;">
						<view class="cu-avatar round " :style=" 'background-image:url(' + x.avatarUrl + ');'"></view>
						<view class="" style="width: 65%;">
							<view>{{x.nickName}}</view>
							<view class="text-gray text-sm flex justify-between">2019年12月3日</view>
						</view>
					</view>
				</view>
				
				
				<view class="text-gray text text-right padding">
					<text class="cuIcon-like margin-lr-xs"></text>
					10
					<text class="cuIcon-favor margin-lr-xs"></text>
					20
					<text class="cuIcon-message margin-lr-xs"></text>
					30
				</view>
			</view>
		</view>
	
</div>

<!-- 发布按钮 -->
	<view @tap="jump('publish')" class="add round bg-gradual-orange text-xxl text-bold text-blue flex justify-center align-center" style="width: 100upx; height: 100upx;position: fixed;bottom: 20upx; right:20upx;z-index:  1024;box-shadow: 0 4upx 6upx rgba(0, 0, 0, 0.1);">
		<text class="cuIcon-add "></text>
	</view>
<!-- 发布按钮 -->
</view>
</template>

<script>
export default {
	data() {
		return {
			modalName: null,
			CustomBar: this.CustomBar, // vue 对象上

			
			TabCur: 0,
			scrollLeft: 0,
			tags:[
				{
					name:'护肤'
				},
				{
					name:'面膜'
				},
				{
					name:'彩妆'
				},
				{
					name:'美发'
				},
				{
					name:'瘦身'
				},
				{
					name:'朋友'
				}
			],
			cardData:[
				{
					avatarUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					nickName:'笑哈哈哈',
					time:'2019年12月23号',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					content:'我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发',
				},
				{
					avatarUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					nickName:'hellirhe',
					time:'2019年12月23号',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					content:'我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发',
				},
				{
					avatarUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					nickName:'阻力大',
					time:'2019年12月23号',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					content:'我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发',
				},
				{
					avatarUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					nickName:'😂',
					time:'2019年12月23号',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					content:'我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我',
				}
			]
		};
	},
	methods: {
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
				this.modalName = null
		},
		jump(pageName) {
			uni.navigateTo({
				url: `../${pageName}/${pageName}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	}
};
</script>

<style>
	.pins .cu-card{
         display: inline-block;
         width: 100%;
         /* box-shadow: 0 0 10rpx 0 rgba(0,0,0,0.10); */
         break-inside: avoid;
         overflow: auto;
	}
</style>
