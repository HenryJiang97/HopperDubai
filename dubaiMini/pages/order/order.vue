<template>
	<div class="orders">
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
				<block slot="backText">返回</block>
				<block slot="content">我的订单</block>
			</cu-custom>
			
		
		<!-- index => orderid -->
		<div class="order_item" v-for="(x,index) in order" :key="index">   
			
			<div class="cu-bar bg-white solid padding-lr" >
				<div class="seller">
					<view class="cu-avatar radius sm margin-right-sm" style="margin-left: 0;"></view>
					订单号 {{index}}
					<text class="cuIcon-right"></text>
				</div>
				
				<div class="seller">
					<view class="cu-avatar radius sm margin-right-sm" style="margin-left: 5;"></view>
					订单总价: ¥{{totalOrderPrice[index]}}
				</div>
				
				<div class="status">
					<text class="cu-tag line-red text-red radius">{{orderLen[index]}}</text>
				</div>
			</div>
			
			
			<!-- 支付 -->
			<div class="cu-bar bg-white solid padding-lr" >
				<button class="text-blue" v-if="ifPaid[index] == false" @tap="pay(index)">立即付款</button>
				<label class="text-green" v-if="ifPaid[index] == true">已支付</label>
			</div>
			<!-- 支付 -->
		
				<view class="cu-card article no-card" v-for="(p,i) in x" :key="i">
					<view class="cu-item shadow padding-tb-sm bg-gray">
						
						<view class="content">
							<image :src="p.pic" mode="aspectFill"></image>
							
							<view class="cu-item menu-avatar">
								
								<view class="text-content">{{p.detail.name}}</view>
								<view class="text-content">套餐: {{p.pkgName}} x {{p.quantity}}</view>
								<view class="cu-tag bg-red light sm round">总价：¥ {{p.price * p.quantity}}</view>
								
							</view>
							
						</view>
						
					</view>
				</view>
			</div>
			
			
	

</div>
</template>

<!-- <script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script> -->
<script>
import Parse from '../../common/parse.js'
import { mapState } from 'vuex'
// import WX from 'weixin-js-sdk'

// let WX = require('weixin-js-sdk')

// var wx = require('weixin-js-sdk')


export default {
	data() {
		return {
			orderLen: {},
			totalOrderPrice: {},
			TabCur: 0,
			scrollLeft: 0,
			isRouterAlive: true,    // Used to reload page
		};
	},
	onLoad() {
		console.log(this.order);
		this.getOrderLen();
		// console.log(this.orderLen);
		this.getTotalOrderPrice();
		// console.log(this.totalOrderPrice);
		console.log("Open id: ", this.openid);
		
	},
	
	computed:{	
		...mapState(['cart', 'order', 'ifPaid', 'token', 'openid']),
	},
	
	methods: {
		reload () {
			this.isRouterAlive = false
			this.$nextTick(function () {
				this.isRouterAlive = true
			})
		},
		
		getOrderLen(){
			for (var key in this.order) {
				this.orderLen[key] = Object.keys(this.order[key]).length;
			}
		},
		
		getTotalOrderPrice() {
			var price = 0;
			
			for (var key in this.order) {    // Key => order id
				price = 0;
				for (var k in this.order[key]) {    // Good id: ex.'28822019-07-04''
					price += (this.order[key][k].price * this.order[key][k].quantity);
				}
				this.totalOrderPrice[key] = price;
			}
			
		},
		
		pay(orderId) {    // Make payment
			let that = this;
		
			uni.showLoading({
				title: '加载中...',
				mask: true	
			});
			
			Parse.Cloud.run('pay', {orderId : orderId, token: this.token, totalOrderFee: this.totalOrderPrice[orderId], openId: this.openid}).then( r => {
				
				console.log(r);		
					
				uni.hideLoading();
				
				// Request Wechat Payment
				wx.requestPayment(
					{...r,
					'success':function(res){
						console.log(res);
						
						// Show a pop-up window
						uni.showToast({
							title: "支付成功",
						})
						
						
						that.ifPaid[orderId] = true;
						that.reload();
						
					},
					'fail':function(res){
						console.log("Payment failure", res);
						uni.showToast({
							title: "付款失败",
						}) 
					},
					'complete':function(res){
						
					}
				});
				
				
			}).catch( e => {
				console.log("Payment error: " + e);
			})
		},
		
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		},
	}
};
</script>

<style>

</style>
