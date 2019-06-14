<template>
	<div>
		<cu-custom bgColor="my_header_background" :isBack="true">
			<block slot="backText">产品列表</block>
			<block slot="content">产品详情</block>
		</cu-custom>
		
		<div class="main">
			<swiper class="screen-swiper round-dot"  :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500" style="min-height: 600upx;">
				<swiper-item v-for="(item, index) in x.media_gallery_entries" :key="index*1.4">
					<image :src=" 'https://cause.wudizu.com/pub/media/catalog/product/' + item.file" mode="aspectFill" v-if="item.media_type == 'image'"></image>
					
					<video :src="item.file" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
					
				</swiper-item>
			</swiper>

			<!-- 价格 -->

			<view class="cu-list menu " >
				<view class="cu-item">
					<view class="content padding-tb" style="padding-bottom: 0;">
						<view>
							<text class="cu-tag radius bg-gradual-pink  margin-right-xs">惊喜价</text>
							<div class="sale_price" style="margin-left: 20upx;">¥ {{price}}</div>
							<div class="old_price" style="margin-left: 20upx;">¥ 470</div>
						</view>
						<view class="text-gray text-sm">
							库存还剩 {{stock}}
						</view>
					</view>
					
					<!-- <view class="action">
						<switch class="switch-sex" @change="SwitchSex" :class="skin ? 'checked' : ''" :checked="skin ? true : false"></switch>
					</view> -->
					
				</view>
			</view>

			<!-- 价格 -->
			
			<!-- 标题 -->
			<div class="cu-bar bg-white solid-bottom padding-lr padding-tb-sm text-black">
				{{x.name}}
			</div>
			<!-- 标题 -->

			<!-- 选择规格 -->
			<view class="cu-bar bg-white solid-bottom margin-top-sm" @click="showModal('bottomModal')">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					请选择规格数量
				</view>

				<view class="action"><text class="cuIcon-right"></text></view>
			</view>
			<!-- 选择规格 -->
			
			<!-- 如何使用 -->
			<div class="cu-bar bg-white margin-top-sm solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					{{groupBuys.length}}人在拼单，可以直接参与
				</view>
				<view class="action">查看更多<text class="cuIcon-right"></text></view>

			</div>
			
				<div class="cu-bar bg-white solid-bottom" style="justify-content: space-between;" v-for="(x,index) in groupBuys" :key="index">
					
					<div style="margin-left: 10upx;">
						<view class="cu-avatar round " :style="'background-image:url('+ x.avatarUrl +')'"></view>
						<text class="text-red margin-left-sm">{{x.nickName}}</text>
					</div>

					<div class="ranks margin-right flex align-center"  >
							<div class="time">
								<view>还差 <text class="text-red">1人</text>拼成</view>
								<view class="text-sm">剩余 23:23:23</view>
							</div>
							<div class="cu-tag radius  bg-yellow margin-left-sm">加入拼团</div>
					</div>
					
				</div>
				
			
			
			<div class="desc" >
			</div>
			<!-- 如何使用 -->
			
			<!-- 心得 -->
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					心得
				</view>

				<view class="action">
					查看100条心得
					<text class="cuIcon-right"></text>
				</view>
			</view>
			
		<scroll-view scroll-x class="bg-white nav padding-sm" scroll-with-animation >
			
				<view class="cu-item solid margin-tb-sm" v-for="(item,index) in 5" :key="index*38" style="max-width: 400upx; height: 100%; padding: 20upx 20upx 0">
					
						<view class="content flex-sub">
							<view class="text-content" style="white-space: normal;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:3; "> 快来买啊，大减价啊，大促销啊，快来买啊，大减价啊，大促销啊，快来买啊，大减价啊，大促销啊</view>
							
							<view class="text-gray text-sm flex justify-between">
								<view class="text-gray text-sm flex">
									
									<div class="left-b">
										<view class="cu-avatar round margin-right-sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
									 萌萌的
									</div>
									
									<div class="right_b ">
										<div class="tags_b">
											<text class="cuIcon-skin margin-lr-xs"></text> 干性
											<text class="cuIcon-light margin-lr-xs"></text> 澳洲
										</div>
										
									</div>
									
								</view>
								
								
							</view>
							
							<div class="flex align-center justify-between margin-bottom-sm" >
									<div class="ranks " style="line-height: 60upx;">
										<text class="cuIcon-favorfill text-red"></text>
										<text class="cuIcon-favorfill text-red"></text>
										<text class="cuIcon-favorfill text-red"></text>
										<text class="cuIcon-favorfill text-red"></text>
										<text class="cuIcon-favor"></text>
									</div>
									<div class="cu-tag radius bg-yellow ">认证用户</div>
							</div>
							
						</view>
						
				</view>
			
		</scroll-view>

			<!-- 心得 -->
			
			
			
			
			<!-- 产品详情 -->
			<div class="cu-bar bg-white margin-top-sm solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					产品详情
				</view>
			</div>
			<div class="bg-white padding-sm">
				<div class="att_item" v-for="(x,i) in 5" :key="i">
					<text>材质：</text><text>草原原料</text>
				</div>
				
				<div class="desc" v-html="desc">
				</div>
				
			</div>
			
			
			<!-- 产品详情 -->
			
			
			<!-- 如何使用 -->
			<div class="cu-bar bg-white margin-top-sm solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					如何使用
				</view>
			</div>
			<div class="bg-white padding-sm">
				<div class="att_item" v-for="(x,i) in 5" :key="i*22">
					首先打开瓶盖，其次，使用中指，再然后用手指抠一点点，先涂在鼻子上

				</div>
				
			</div>
			
			<div class="desc" >
			</div>
			<!-- 如何使用 -->
			
			
		
			<!-- 评论 -->
			<!-- <view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					评论
				</view>

				<view class="action">
					更多评论
					<text class="cuIcon-right"></text>
				</view>
			</view> -->

			<!-- <div class="reviews solid-bottom" v-for="(x,index) in 2" :key="index">
				
				<div class="cu-bar bg-white" style="justify-content: space-between;">
					<div style="margin-left: 10upx;">
						<view class="cu-avatar sm round " style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
						<text class="text-red margin-left-sm">小雷</text>
						<div class="cu-tag radius bg-yellow margin-left-sm">认证用户</div>
					</div>

					<div class="ranks margin-right">
						<text class="cuIcon-favorfill text-red"></text>
						<text class="cuIcon-favorfill text-red"></text>
						<text class="cuIcon-favorfill text-red"></text>
						<text class="cuIcon-favorfill text-red"></text>
						<text class="cuIcon-favor"></text>
					</div>
				</div>
				
				<div class="cu-bar bg-white padding-lr-sm">
					我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草我来种草
				</div>

				<div class="cu-bar bg-white padding-tb-sm" style="justify-content: flex-start;">
					<view v-for="(x,i) in 4" :key="i" class="cu-avatar xl  margin-right-sm" style="background-image:url(https://img30.360buyimg.com/shaidan/s128x96_jfs/t1/26301/40/15547/106999/5cb2abb3E05201f16/7d693f0997bf825e.jpg!cc_100x100!q70.dpg)"
					></view>
				</div>
			</div> -->
			
			<!-- <div class="cu-bar padding-tb-sm bg-white solid-bottom flex-direction"><button class="cu-btn solid-bottom round">更多评论</button></div> -->
			
		</div>
		<!-- 评论 -->

<!-- 产品问答 -->
		<view class="cu-bar bg-white solid-bottom margin-top-sm"  @tap="jump('qa')">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					产品问答(12)
				</view>

				<view class="action">
					
					<text class="cuIcon-right"></text>
				</view>
			</view>
			
		<!-- 产品问答 -->

		<!-- 相关产品 -->

		<!-- #ifndef MP-BAIDU -->
		<view class="bg-white" style="margin-bottom: 100upx;">
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					相关产品
				</view>

				<!-- <view class="action">
					更多评论
					<text class="cuIcon-right"></text>
				</view> -->
			</view>

			<view class="bg-white padding" style="background: #F1F1F1;">
				<view class="grid margin-bottom text-center col-2" v-for="(item, index) in 8" :key="index">
					<view class="">
						<view class="cu-card case">
							<view class="list_item_margin cu-item  " style="margin-left: 0;  ">
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
						<view class="cu-card case">
							<view class="list_item_margin cu-item shadow " style="margin-right: 0; ">
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
				</view>
			</view>

			<!-- 
		 -->

			
		</view>
		<!-- #endif -->
		
		
		

		<!-- 相关产品 -->
		
			<!-- 弹出层 -->
			<view class="cu-modal bottom-modal" :class="modalName == 'bottomModal' ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						
						<view class="action text-blue" @tap="hideModal">
							<p>{{x.name}}</p>
							<text class="cuIcon-close"></text>
						</view>
					</view>

					<view class="cu-card no-card">
						<view class="flex align-center">
							
							<view class="" >
								<image style="width: 200upx; height: 200upx;" src="https://www.wudizu.com/wp-content/uploads/2019/04/mk2.jpg" mode="aspectFit"></image>
							</view>
							
							<view class="desc" style="text-align: left;">
									<view class="flex align-center">
										<text class="cu-tag radius bg-gradual-pink; margin-right-sm">惊喜价</text>
										<div class="sale_price margin-right-sm" >¥ 360</div>
										<div class="old_price margin-right-sm" >¥ 470</div>
									</view>
							</view>
							
						</view>
					</view>

					<div class="color_chat">
						<div class="cu-card padding-tb-sm padding-lr " style="padding-bottom: 0; text-align: left;">颜色</div>
						<div class="cu-card">
							<view class="flex justify-start ">
								<view class="margin-tb-sm text-center margin-left"><button class="cu-btn round line-red">red</button></view>
								<view class="margin-tb-sm text-center margin-left"><button class="cu-btn round line-red">blue</button></view>
								<view class="margin-tb-sm text-center margin-left"><button class="cu-btn round line-red">yellow</button></view>
							</view>
						</div>
					</div>

					<div class="size_chat" style="margin-bottom: 200upx;">
						<div class="cu-card padding-tb-sm padding-lr " style="padding-bottom: 0; text-align: left;">尺码</div>
						<div class="cu-card">
							<view class="flex justify-start ">
								<view class="margin-tb-sm text-center margin-left"><button class="cu-btn round line-red">XL</button></view>
								<view class="margin-tb-sm text-center margin-left"><button class="cu-btn round line-red">XL</button></view>
								<view class="margin-tb-sm text-center margin-left"><button class="cu-btn round line-red">XL</button></view>
							</view>
						</div>
					</div>
					
					<view class="cu-bar bg-white tabbar border shop footer_bar">
			<!-- <button class="action" open-type="contact">
				<view class="cuIcon-service text-green"><view class="cu-tag badge"></view></view>
				客服
			</button>
			<view class="action">
				<view class="cuIcon-cart"><view class="cu-tag badge">99</view></view>
				购物车
			</view> -->
			<view class="bg-red submit" @tap="jump('cart')">立即订购</view>
		</view>
					
				</view>
			</view>
			<!-- 弹出层 -->
		<!-- 底部导航 -->
		

		<view class="cu-bar bg-white tabbar border shop footer_bar solid-top">
			<view class="action">
				<view class="cuIcon-like"><view class="cu-tag badge">99</view></view>
				收藏
			</view>
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green"><view class="cu-tag badge"></view></view>
				客服
			</button>
			
			<view class="bg-red submit" style="display: block; opacity:0.6;" @click="showModal('bottomModal')">
				<view class="text-white" style="margin-top: 20upx;">¥ 28</view>
				<view class="text-white" style="">单独购买</view>
			</view>
			
			<view class="bg-red submit" style="display: block;" @tap="pay">
				<view class="text-white" style="margin-top: 20upx;">¥ 23</view>
				<view class="text-white" style="">发起拼团</view>
			</view>
		</view>

		<!-- 底部导航 -->
	</div>
</template>

<script>
import Parse from '../../common/parse.js'
export default {
	data() {
		return {
			x:{},
			price:'',
			stock:'',
			desc:'',
			modalName: null,
			
			groupBuys:[]
			
		};
	},
	
	onLoad(){
		this.getItemDetail() // 拿到细节
		this.getStock() // 拿到库存
		this.getGroupBuy()
	
	},
	
	
	methods: {
		
		pay(){
			// Parse.Cloud.run('pay').then( r => {
			// 	console.log('r' + JSON.stringify(r));
			// }).catch( e => console.log('e' + JSON.stringify(e))	)
			this.launchGroupBuy('test1')
		},
		launchGroupBuy(sku){
			Parse.Cloud.run('newGroupBuy',{
				sku:sku
			}).then( r => {
				console.log(r);
			}).catch( e => console.log('e' + JSON.stringify(e))	)
		},
		
		scrollLeft(e){
			console.log('e' + JSON.stringify(e));
		},
		async getStock(){
			let s = await Parse.Cloud.run('getItemStock',{sku:'test1'}).then()
			this.stock = s.qty
			console.log('库存' + JSON.stringify(this.stock));
		},
		
		async getGroupBuy(){
			
		let r = await new Parse.Query('Pin')
        .include('user').equalTo('itemSku','test1').find().then()
			
			console.log('r' + JSON.stringify(r));
			
			this.groupBuys = r.map( x => {
				return {
					nickName:x.toJSON().user.wxProfile.nickName,
					avatarUrl:x.toJSON().user.wxProfile.avatarUrl,
				}
			})
			
			
		},
		
		async getItemDetail(){
			let r = await Parse.Cloud.run('Gproducts',{sku:'test1'}).then()
			console.log(r);
			this.x = r.products.items[0]
			
		},
		
		showModal(e) {
			this.modalName = e;
		},
		hideModal(e) {
			this.modalName = null;
		},
		jump(x){
			// 在产品详情页面，想要看任何功能都要先登录
			
			this.$store.commit('needLogin')
			
			uni.navigateTo({
				url: `../${x}/${x}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	
	onShareAppMessage: function( options ){
	　　var that = this;
	　　// 设置菜单中的转发按钮触发转发事件时的转发内容
	　　var shareObj = {
	　　　　title: "Wudi 微信小程序商城Demo",        // 默认是小程序的名称(可以写slogan等)
	　　　　success: function(res){
	　　　　　　// 转发成功之后的回调
	　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
	　　　　　　}
	　　　　},
	　　　　fail: function(){
	　　　　　　// 转发失败之后的回调
	　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
	　　　　　　　　// 用户取消转发
	　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
	　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
	　　　　　　}
	　　　　},
	　　　　complete: function(){
	　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
	　　　　}
	　　};
		return shareObj
	}
};
</script>

<style scoped>
	.desc image{
		width: 100%;
	}
</style>
