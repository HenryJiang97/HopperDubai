<template>
	<div class="orders">
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
				<block slot="backText">返回</block>
				<block slot="content">我的订单</block>
			</cu-custom>
			
		<!-- 	<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in category" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view> -->
		
		
		
		
		<div class="order_item" v-for="(x,index) in order" :key="index">
			
			<div class="cu-bar bg-white solid padding-lr" >
				<div class="seller">
					<view class="cu-avatar radius sm margin-right-sm" style="margin-left: 0;"></view>
					订单 {{index + 1}}
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
		
				<view class="cu-card article no-card" v-for="(p,i) in x" :key="i">
					<view class="cu-item shadow padding-tb-sm bg-gray">
						
						<view class="content">
							<image :src="p.pic" mode="aspectFill"></image>
							
							<!-- <view class="content">
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>{{x.detail.name}}</view>
								<view class="text-grey text-sm"></view>
							
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>套餐: {{x.pkgName}}</view>
								<view class="text-grey text-sm"></view>
								
								<view>
									<view class="cu-tag bg-red light sm round">实际付款：¥ {{p.price}}</view>
								</view>
							</view> -->
							
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

<script>
import Parse from '../../common/parse.js'
import { mapState } from 'vuex'

export default {
	data() {
		return {
			orderLen:[],
			totalOrderPrice: [],
			TabCur: 0,
			scrollLeft: 0,
		};
	},
	onLoad() {
		console.log(this.order);
		this.getOrderLen();
		this.getTotalOrderPrice();
		console.log(this.totalOrderPrice);
	},
	
	computed:{	
		...mapState(['cart', 'order']),
	},
	
	methods: {
		getOrderLen(){
			for (var i = 0; i < this.order.length; i++) {
				this.orderLen.push(Object.keys(this.order[i]).length);
			}
		},
		
		getTotalOrderPrice() {
			var price = 0;
			for (var i = 0; i < this.order.length; i++) {
				price = 0;
				for (var key in this.order[i]) {
					price += (this.order[i][key].price * this.order[i][key].quantity);
				}
				this.totalOrderPrice.push(price);
			}
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
