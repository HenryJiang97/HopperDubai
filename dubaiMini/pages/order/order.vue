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
		
		<div class="order_item" v-for="(x,index) in orders" :key="index">
			
		<div class="cu-bar bg-white solid padding-lr" >
			<div class="seller">
				<view class="cu-avatar radius sm margin-right-sm" :style="{ backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg)' }" style="margin-left: 0;"></view>
				小鲜肉
				<text class="cuIcon-right"></text>
			</div>
			<div class="status">
				<text class="cu-tag line-red text-red radius">{{x.status}}</text>
			</div>
		</div>
		
				<view class="cu-card article no-card" v-for="(p,i) in x.items" :key="i">
					<view class="cu-item shadow padding-tb-sm bg-gray">
						
						<view class="content">
							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
								mode="aspectFill">
							</image>
							
							<view class="desc ">
								<view class="text-content">{{p.name}}</view>
								<view>
									<view class="cu-tag bg-red light sm round">实际付款：{{p.price}}</view>
									<view class="cu-tag bg-green light sm round">(免运费)</view>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</div>
			
			
	

</div>
</template>

<script>
import Parse from '../../common/parse.js'
export default {
	data() {
		return {
			orders:[],
			TabCur: 0,
			scrollLeft: 0,
		};
	},
	onLoad() {
		this.getOrders()
	},
	computed:{
		//  filteredOrders :  function (){
		// 	let match = {
		// 		pending:1,
		// 		processing:2,
		// 	}
		// 	console.log('this.order' + JSON.stringify(this.orders));
		// 	return this.orders.map( x => {
		// 		 match[x.status] === this.TabCur
		// 	})
		// }
	},
	
	methods: {
		getOrders(){
			new Parse.Cloud.run('orders').then( r => {
				this.orders = r.items
			}).catch( e => {
				console.log('e' + JSON.stringify(e));
			})
		},
		tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
	}
};
</script>

<style>

</style>
