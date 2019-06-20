<template>
	<div>
		<!-- Header -->
		<cu-custom isBack="true" bgColor="my_header_background">
			<block slot="backText">产品列表</block>
			<block slot="content">产品详情</block>
		</cu-custom>
		
		
		<div class="main">
			<!-- Media gallery -->
			<swiper class="screen-swiper round-dot"  :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500" style="min-height: 600upx;">
				<swiper-item v-for="(item, index) in swiperList" :key="index*1.4">
					<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video> -->
					
				</swiper-item>
			</swiper>
			<!-- Media gallery -->
			

			<!-- 价格 -->
			<view class="cu-list menu " >
				<view class="cu-item">
					<view class="content padding-tb" style="padding-bottom: 0;">
						<view>
							<text class="cu-tag radius bg-gradual-pink  margin-right-xs">惊喜价</text>
							<div class="sale_price" style="margin-left: 20upx;">¥ {{price}}</div>
						</view>
						<!-- <view class="text-gray text-sm">
							库存还剩 {{stock}}
						</view> -->
					</view>				
				</view>
			</view>
			<!-- 价格 -->
			
			<!-- 标题 -->
			<div class="cu-bar bg-white solid-bottom padding-lr padding-tb-sm text-black">
				{{name}}
			</div>
			<!-- 标题 -->
			
			
			<!-- 选择购买数量 -->
			<!-- <div class="cu-bar  bg-white padding-lr solid margin-bottom">
				<text>购买数量</text>
				<div class="add flex align-center">
					<button type="default" class="padding-lr text-bold text-xl" @tap="updatePurchaseNum(-1)">-</button>
					<text class="margin-lr">{{purchaseNum}}</text>
					<button type="default" class="padding-lr text-bold text-xl" @tap="updatePurchaseNum(1)">+</button>
				</div>
			</div> -->
			

			<!-- 产品详情 -->
			<div class="cu-bar bg-white margin-top-sm solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					产品详情
				</view>
			</div>
			<!-- 产品详情 -->		
		</div>
		
		
			<!-- Modal -->
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
								<image :src="modalImage" mode="aspectFill" style="width: 200upx; height: 200upx;"></image>
							</view>
							
							<view class="desc" style="text-align: left;">
									<view class="flex align-center">
										<text class="cu-tag radius bg-gradual-pink; margin-right-sm">惊喜价</text>
										<div class="sale_price margin-right-sm" >¥ {{price * purchaseNum}}</div>
									</view>
							</view>
							
						</view>
					</view>

					<div class="color_chat">
						<!-- 套餐选择 -->
						<div class="cu-card padding-tb-sm padding-lr " style="padding-bottom: 0; text-align: left;">选择套餐</div>
						<div class="cu-card">
							<view class="flex justify-start ">
								<view class="margin-tb-sm text-center margin-left">
									<button class="cu-btn round" :class="{'cu-btn round line-red': item.id == packageSelection}" v-for="(item, index) in packages" :key='index' v-on:tap="selectPkg(item.id)">{{item.title}}</button>
								</view>
							</view>
						</div>
						
						<!-- 购买数量 -->
						<div class="cu-bar  bg-white padding-lr solid margin-bottom">
							<text>购买数量</text>
							<div class="add flex align-center">
								<button type="default" class="padding-lr text-bold text-xl" @tap="updatePurchaseNum(-1)">-</button>
								<text class="margin-lr">{{purchaseNum}}</text>
								<button type="default" class="padding-lr text-bold text-xl" @tap="updatePurchaseNum(1)">+</button>
							</div>
						</div>
					</div>

					<div class="size_chat" style="margin-bottom: 200upx;"></div>
					
					<view class="cu-bar bg-white tabbar border shop footer_bar">
			<!-- <button class="action" open-type="contact">
				<view class="cuIcon-service text-green"><view class="cu-tag badge"></view></view>
				客服
			</button>
			<view class="action">
				<view class="cuIcon-cart"><view class="cu-tag badge">99</view></view>
				购物车
			</view> -->
			<view class="bg-red submit" @tap="addToCart()">加入购物车</view>
		</view>
					
				</view>
			</view>
			<!-- Modal -->;
		
		
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
			
			<view class="bg-red submit" style="display: block;" @tap="showModal('bottomModal')">
				<view class="text-white" style="margin-top: 20upx;">¥ {{purchaseNum * price}}</view>
				<view class="text-white" style="">预定</view>
			</view>
		</view>

		<!-- 底部导航 -->
	</div>
</template>



<script>
import Parse from '../../common/parse.js';
import { getMagento, itemPath, post } from '../../utils';

export default {
	mounted() {
		//获取页面传的参数
		this.productID = this.$root.$mp.query.id;
		this.skuID = "00000000" + this.productID;
		// this.printdata(this.skuID);
		this.getItemDetail(this.skuID);
	},
	
	data() {
		return {
			product:'',
			
			x:{},
			media_num: 0,
			name: '',
			price: 0,
			stock:'',
			desc:'',
			modalName: null,
			productID: '',
			skuID: '',
			groupBuys:[],
			token: "vuh1yve09x8d4uo4oly1ofab1suy5gdb",
			swiperList: [],
			packages: [],
			packageSelection: null,
			purchaseNum: 1,
			checkin: '',
			timeslot: ',',
			modalImage : '',
		};
	},
	
	onLoad(){
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
		
		// async getGroupBuy(){
		// 	
		// let r = await new Parse.Query('Pin')
  //       .include('user').equalTo('itemSku','test1').find().then()
		// 	
		// 	console.log('r' + JSON.stringify(r));
		// 	
		// 	this.groupBuys = r.map( x => {
		// 		return {
		// 			nickName:x.toJSON().user.wxProfile.nickName,
		// 			avatarUrl:x.toJSON().user.wxProfile.avatarUrl,
		// 		}
		// 	})
		// 	
		// 	
		// },
		
		async getItemDetail(sku){
			const r = await post('/catalogapi/productDetails', {"param":{"productsku":sku,"token":this.token}});
			this.product = r[0]
			console.log(r);
			this.name = r[0].name;
			this.price = r[0].price;
			this.media_num = r[0].media_gallery_entries.length;
			this.createGallery(r[0].media_gallery_entries);
			this.getPackages(r[0].packages);
			
			console.log(this.packages);
		},
		
		createGallery(entry) {
			for (var i = 0; i < this.media_num; i++) {
				this.swiperList.push({
					id: entry[i].id,
					url: entry[i].filepath,
					type: "image",
				});
			}
			this.modalImage = this.swiperList[0].url;
		},
		
		getPackages(entry) {
			for (var i = 0; i < entry.length; i++) {
				this.packages.push({
					id: entry[i].option_id,
					title: entry[i].option_title,
				});
			}
		},
		
		addToCart(){
			let p = this.packages
			// console.log(p);
			let quantity = this.purchaseNum;
			let pkg = this.packageSelection;
			let price = this.price;
			var pkgName = '';
			for (var i = 0; i < this.packages.length; i++) {
				if (pkg == p[i].id){
					pkgName = p[i].title;
				}	
			}
			let pic = this.modalImage;
			
			// console.log(pkgName);
			this.$store.commit('addToCart',{product:this.product, quantity: quantity, pkg: pkg, pkgName: pkgName, price: price, pic: pic});
			
			// Hide the modal after adding to the cart
			this.hideModal();
		},
		
		selectPkg(id) {
			this.packageSelection = id;
			console.log(this.packageSelection);
		},
		
		showModal(e) {
			this.modalName = e;
		},
		
		hideModal(e) {
			this.modalName = null;
		},
		
		jump(x){
			// 在产品详情页面，想要看任何功能都要先登录
			
			// this.$store.commit('needLogin')
			
			uni.navigateTo({
				url: `../${x}/${x}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		
		printdata(data) {
			console.log(data);
		},
		
		updatePurchaseNum(change) {
			var purchase = this.purchaseNum;
			if (change + purchase > 0) {
				purchase += change;
			}
			this.purchaseNum = purchase;
		},
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
