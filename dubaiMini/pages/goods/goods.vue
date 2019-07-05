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
						<view class="text-gray text-sm">
							库存还剩 {{stock}}
						</view>
					</view>				
				</view>
			</view>
			<!-- 价格 -->
			
			<!-- 标题 -->
			<div class="cu-bar bg-white solid-bottom padding-lr padding-tb-sm text-black">
				{{name}}
			</div>
			<!-- 标题 -->
			
			<!-- 日期选择 -->
			<view class="cu-form-group">
				<view class="title">日期选择</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2021-09-01" @change="DateChange">
					<view class="picker">
						{{checkinDate}}
					</view>
				</picker>
			</view>
			<!-- 日期选择 -->
			
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
						<!-- 套餐选择 -->
						
						<!-- 票种选择 -->
						<div class="cu-card padding-tb-sm padding-lr " style="padding-bottom: 0; text-align: left;">选择票种</div>
						<div class="cu-card">
							<view class="flex justify-start ">
								<view class="margin-tb-sm text-center margin-left">
									<button class="cu-btn round" :class="{'cu-btn round line-red': option.dropdown_id == optionSelection}" v-for="(option, idx) in optionsArr" :key='idx' v-on:tap="selectOption(option.dropdown_id, option.dropdown_title)">{{option.dropdown_title}}</button>
								</view>
							</view>
						</div>
						<!-- 票种选择 -->
						
						<!-- 购买数量 -->
						<div class="cu-bar  bg-white padding-lr solid margin-bottom">
							<text>购买数量</text>
							<div class="add flex align-center">
								<button type="default" class="padding-lr text-bold text-xl" @tap="updatePurchaseNum(-1)">-</button>
								<text class="margin-lr">{{purchaseNum}}</text>
								<button type="default" class="padding-lr text-bold text-xl" @tap="updatePurchaseNum(1)">+</button>
							</div>
						</div>
						<!-- 购买数量 -->
						
						<!-- 返回信息 -->
						<div>
							<text>{{addToCartStatus}}</text>
						</div>
						<!-- 返回信息 -->
					</div>

					<div class="size_chat" style="margin-bottom: 200upx;"></div>
					
					<view class="cu-bar bg-white tabbar border shop footer_bar">

			<view class="action" @tap="jump('cart')">
				<view class="cuIcon-cart"><view class="cu-tag badge"></view></view>
				购物车
			</view>
			
			<view class="bg-red submit" @tap="addToCart()">加入购物车</view>
		</view>
					
				</view>
			</view>
			<!-- Modal -->
		
		
		<!-- 底部导航 -->
		<view class="cu-bar bg-white tabbar border shop footer_bar solid-top">			
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
import { mapState } from 'vuex';

export default {
	mounted() {
		//获取页面传的参数
		this.productID = this.$root.$mp.query.id;
		this.skuID = "00000000" + this.productID;
		console.log("SKU id: ", this.skuID);
		this.getItemDetail(this.skuID);
	},
	
	data() {
		return {
			product:'',
			x:{},
			media_num: 0,
			name: '',
			price: 0,
			stock: 0,
			desc:'',
			modalName: null,
			productID: '',
			skuID: '',    // Product skuid
			cartId: '',
			groupBuys:[],
			swiperList: [],
			packages: [],
			packageSelection: null,    // Package id, also name as timeslot
			options: [],    // Options for each package
			optionsArr : [],    // Save the option arr for the first package
			optionSelection: null,    // Represents in option id
			optionTitle: '',    // Represents the option title
			purchaseNum: 1,    // Quantity
			modalImage : '',
			checkinDate: '2018-12-25',  // Just for test
			addToCartStatus: '',    // Success or not when adding to the cart
		};
	},
	
	onLoad(){
		this.checkinDate = this.getCurrentDate();
	},
	
	computed:{	
		...mapState(['cart', 'order', 'token', 'cartId']),    // Load from state
	},
	
	methods: {
		pay(){

		},
		
		scrollLeft(e){
			console.log('e' + JSON.stringify(e));
		},
		
		async getItemDetail(sku){    // Get the detail of product from the api
			const r = await post('/catalogapi/productDetails', {"param":{"productsku":sku,"token":this.token}});
			this.product = r[0];
			console.log("Product detail: ", this.product);
			
			this.name = r[0].name;
			this.price = r[0].price;
			this.media_num = r[0].media_gallery_entries.length;
			this.createGallery(r[0].media_gallery_entries);
			this.getPackages(r[0].packages);
			
			console.log("Packages: ", this.packages);
			
			// Set stock
			if (this.product.custom_attributes[12].value[0] == true) {
				this.stock = this.product.custom_attributes[12].value[1];
			}
		},
		
		createGallery(entry) {    // To create the gallery
			for (var i = 0; i < this.media_num; i++) {
				this.swiperList.push({
					id: entry[i].id,
					url: entry[i].filepath,
					type: "image",
				});
			}
			this.modalImage = this.swiperList[0].url;
		},
		
		getPackages(entry) {    // Get the detail of available packages from the api including the options
			for (var i = 0; i < entry.length; i++) {
				// Get the options for each package
				var options = [];
				for (var j = 0; j < entry[i].options.length; j++) {
					options.push({
						dropdown_id : entry[i].options[j].dropdown_id,
						dropdown_title : entry[i].options[j].dropdown_title,
					});
				}
				
				
				this.packages.push({
					id: entry[i].option_id,
					title: entry[i].option_title,
					options: options,
				});
			}
			
			// Save the options of the first packages to an array
			this.optionsArr = this.packages[0].options;
		},
		
		addToCart(){    // Method to add the chosen item to the cart both locally and to the server-end
			let p = this.packages
			console.log(p);
			
			let quantity = this.purchaseNum;
			let pkg = this.packageSelection;    // Pkg id
			console.log(pkg);
			
			let price = this.price;    // Price for single product
	
			// Get package name
			var pkgName = '';    // Package name
			for (var i = 0; i < this.packages.length; i++) {
				if (pkg == p[i].id){
					pkgName = p[i].title;
					break;
				}
			}
			
			
			// Get option id and name
			let that = this;
			
			let optionId = this.optionSelection;
			let optionTitle = this.optionTitle;
			let pic = this.modalImage;
			let checkinDate = this.checkinDate;
			
			// Push the mutation to the server end
			const ret = post('/checkoutapi/addToCart', {"param":{
				"token":this.token,
				"items":[
					{
						"sku" : this.skuID,
						"checkin" : this.checkinDate,
						"timeslot" : this.packageSelection,
						"options" : [
							{
								"id" : this.optionSelection,
								"quantity" : this.purchaseNum,
							}
						]
					}
				],
			}}).then( r => {
				// Ret format => {success: true, code: "200", message: "Add to cart successfully.", quote_id: "2158"}
				console.log("Add to cart status: ");
				console.log(r);
				
				// Judge place order status
				if (r[0].success === true) {
					that.addToCartStatus = "加入购物车成功";
					console.log("Add to cart successfully");
					
					// Add the item to store.state
					that.$store.commit('addToCart',{
						product:that.product,
						quantity: quantity,
						pkg: pkg,
						pkgName: pkgName,
						optionId: optionId,
						optionTitle: optionTitle,
						price: price,
						pic: pic,
						checkinDate: checkinDate,
					});
					
					that.cartId = r[0].quote_id;
					console.log("Cart id = ");
					console.log(that.cartId);
					
					// Save cart id to the state
					that.$store.commit('setCartId', that.cartId);		
					
					// Hide the modal after adding to the cart
					that.hideModal();
					
				} else {
					that.addToCartStatus = r[0].message;
					console.log("Failed to add to cart");
				}
				
			}).catch(e => {
				console.log("Add to cart error.");
			});

		},
		
		selectPkg(id) {    // Selected package by the consumer
			this.packageSelection = id;
			console.log("Package: ", this.packageSelection);
		},
		
		selectOption(optionId, optionTitle) {
			this.optionSelection = optionId;
			this.optionTitle = optionTitle;
			console.log("Option: ", this.optionSelection, " ", this.optionTitle);
		},
		
		showModal(e) {    // Display modal
			this.modalName = e;
		},
		
		hideModal(e) {    // Hide the modal
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
		},
		
		printdata(data) {
			console.log(data);
		},
		
		updatePurchaseNum(change) {    // Update puchase number if the user choose the same package again
			var purchase = this.purchaseNum;
			if (change + purchase > 0) {
				purchase += change;
			}
			this.purchaseNum = purchase;
		},
		
		DateChange(e) {    // Update date
			this.checkinDate = e.detail.value;
		},
		
		getCurrentDate() {    // Get current date
			var date = new Date().toJSON().slice(0, 10);
			return date;
		}
	},
};
</script>

<style scoped>
	.desc image{
		width: 100%;
	}
</style>
