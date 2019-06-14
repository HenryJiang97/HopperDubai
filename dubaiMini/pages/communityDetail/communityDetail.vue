<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText" @click="jump('my')">
				<view class="cu-avatar round" style="background-image:url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'); margin: 0;"></view>
				<p class="margin-lr">腹黑小白</p>
				<div class="cu-tag bg-red radius">关注</div>
			</block>
		</cu-custom>
		
		<div class="main">
			<!-- 轮播 -->
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
			
			</swiper>
			<!-- 轮播 -->
			
			<!-- 文章 -->
			<div class="text-black padding bg-white">
				我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了我昨晚睡觉太晚了
			</div>
			<!-- 文章 -->
			
			<!-- 互动列表 -->
			<view class="cu-list menu-avatar comment solid-top" style="margin-bottom: 100upx;">
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">小美女</view>
							<view class="text-gray text-content text-df">
								我感觉自己变胖了。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>变胖了：</view>
									<view class="flex-sub">小哥哥发型好帅，哪里理发的。</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content">
							<view class="text-grey">小坏哥</view>
							<view class="text-gray text-content text-df">
								妹子你好美啊。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>妹子：</view>
									<view class="flex-sub">哪有，哥哥你也帅..</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content">
							<view class="text-grey">小坏哥</view>
							<view class="text-gray text-content text-df">
								妹子你好美啊。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>妹子：</view>
									<view class="flex-sub">哪有，哥哥你也帅..</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content">
							<view class="text-grey">小坏哥</view>
							<view class="text-gray text-content text-df">
								妹子你好美啊。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>妹子：</view>
									<view class="flex-sub">哪有，哥哥你也帅..</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			<!-- 互动列表 -->
			
			
			<!-- 底部操作条 -->
			<view class="cu-bar search footer_bar bg-white solid-top">
				<view class="search-form round">
					<text class="cuIcon-edit"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="说点什么..." confirm-type="search"></input>
				</view>
				
				<view class="action">
					<text class="cuIcon-like"></text>
					
				</view>
				<view class="action margin-right">
					<text class="cuIcon-favor"></text>
					
				</view>
				<view class="action">
					<text class="cuIcon-comment"></text>
					
				</view>
			</view>
			<!-- 底部操作条 -->
		
			
		</div>
	</view>
</template>

<script>
	import {post} from '../../utils'
export default {
	data() {
		return {
			swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}],
			TabCur: 0,
			scrollLeft: 0,
			tags: [
				{
					name: '护肤'
				},
				{
					name: '面膜'
				},
				{
					name: '彩妆'
				},
				{
					name: '美发'
				},
				{
					name: '瘦身'
				},
				{
					name: '朋友'
				}
			],
			cardData: [
				{
					avatarUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					nickName: '笑哈哈哈',
					time: '2019年12月23号',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					content: '我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发'
				},
				{
					avatarUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					nickName: 'hellirhe',
					time: '2019年12月23号',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					content:
						'我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发'
				},
				{
					avatarUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					nickName: '阻力大',
					time: '2019年12月23号',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					content:
						'我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发'
				},
				{
					avatarUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					nickName: '😂',
					time: '2019年12月23号',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					content: '我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我的秀发我'
				}
			]
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		async getCommunityData(){
			 await post('catalogapi/productDetails',{"param":{"productsku":"0000000135","token":"np8ga6ellc9mcy795ekrb07xh6p5vgsb"}})
		}
	}
};
</script>

<style>
.pins .cu-card {
	display: inline-block;
	width: 100%;
	/* box-shadow: 0 0 10rpx 0 rgba(0,0,0,0.10); */
	break-inside: avoid;
	overflow: auto;
}
</style>
