<template>
		<div class="cart">
				
				<!-- Header -->
				<cu-custom :isBack="true" bgColor="my_header_background text-white">
						<block slot="backText" @click="jump('index')">返回</block>
						<block slot="content">购物车</block>
				</cu-custom>
				
				<!-- Products info -->
				<div v-modle="cart" v-for="(x,index) in cart" :key="index" class="cartlist">
					<view class="cu-list menu-avatar">
						<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" >
							<view class="cu-avatar radius xl" :style=" 'background-image: url(' + x.pic +')'"></view>
						
						
							<view class="content">
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>{{x.detail.name}}</view>
								<view class="text-grey text-sm"></view>
							
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>套餐选择: {{x.pkgName}}</view>
								<view class="text-grey text-sm"></view>
								
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>票种选择: {{x.optionTitle}}</view>
								<view class="text-grey text-sm"></view>
								
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>签到日期: {{x.checkinDate}}</view>
								<view class="text-grey text-sm"></view>
							</view>
							
							<view>
								<!-- <view class="padding flex flex-wrap justify-between align-center bg-white">
									<button @click="deleteItem(x)" class="cu-btn round">删除</button>
								</view> -->
								
								
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>¥ {{x.price}}</view>
								<view class="text-grey text-sm"></view>
							</view>
							
						</view>
					</view>
				
					<view class="cu-bar  bg-white padding-lr solid margin-bottom">
						<text>购买数量</text>
						<view class="add flex align-center">
							<!-- <button type="default" @click="updateQuantity(x, -1)" class="padding-lr text-bold text-xl">-</button> -->
							<text class="margin-lr">{{x.quantity}}</text>
							<!-- <button type="default" @click="updateQuantity(x, 1)" class="padding-lr text-bold text-xl">+</button> -->
						</view>
					</view>
				</div>
				
				
				<view class="cu-list bg-white menu margin-top solid-top" v-if="totalQuantity != 0">
					<view class="cu-item " >
						<view class="content">
							<image src="/static/wechat.svg" class="png" mode="aspectFit"></image>
							<text class="text-grey">微信支付</text>
						</view>
							
						<text :class="{'cuIcon-check': paymentSelection == 0}"></text>
					</view>
					
					
					<view class="action" v-if="placeOrderError == true">
						<view class="cu-load bg-red erro">下单失败</view>
					</view>
				</view>
				
				
				<!-- Show payment modal -->
				<view class="cu-modal bottom-modal" :class="modalName == 'bottomModal' ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="action text-blue" @tap="hideModal">
							<p></p>
							<text class="cuIcon-close"></text>
						</view>
					</view>

					<view v-if="totalQuantity != 0" class="cu-card no-card">
						<view class="flex align-center">
							
							<view class="cu-item " >
								<view class="align-center">
									<text>微信支付</text>
								</view>
							</view>
							
						</view>
					</view>

					<div class="size_chat" style="margin-bottom: 200upx;"></div>
					
					<view class="cu-bar bg-white tabbar border shop footer_bar">
			
					<view class="bg-red submit" v-if="status == 0" @tap="pay()">立即支付</view>
					<view class="bg-red submit" v-if="status == 1" @tap="pay()">支付成功</view>
					<view class="bg-red submit" v-if="status == 2" @tap="pay()">支付失败</view>
				</view>
					
				</view>
			</view>
				<!-- Show payment modal -->
				
		
				<!-- 支付底栏 -->
				<view class="cu-bar bg-white tabbar border shop foot">
					<view>
						<button @tap="emptyCart()" class="cu-btn round">清空购物车</button>
					</view>
					
					<view class="margin-right" style="text-align: right; width: 50%;"> 实付款:<text class="margin-left text-xl">¥ {{totalPrice}} </text> </view>
				
					<view class="bg-red submit" @tap="addToOrder()">下单</view>
				</view>
			
		</div>
</template>

<script>
	import { mapState } from 'vuex'
	import Parse from '../../common/parse.js'
  import {
    get,
    post,
    login,
    getStorageOpenid
  } from "../../utils";
  export default {
    onShow() {
		this.orderId = '';
		this.placeOrderError = false;
		this.getTotalPrice();
		
		console.log(this.cart);
		console.log("Cart id: " + this.cartId);
    },
	
	
    created() {},
	
    data() {
      return {
		modalName: null,
		gridCol: 3,
		gridBorder: false,
		menuBorder: false,
		menuArrow: false,
		menuCard: false,
		skin: false,
		listTouchStart: 0,
		listTouchDirection: null,
        openId: "",
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
        tranX: 0,
        tranX1: 0,
        startX: "",
        startY: "",
        moveX: "",
        moveY: "",
        moveEndX: "",
        moveEndY: "",
        X: 0,
        Y: "",
		pkgName: '',
		isRouterAlive: true,    // Used to reload page
		totalPrice: 0,
		totalQuantity: 0,
		paymentSelection: 0,
		placeOrderError: false,
		orderId: '',
		status: 0,
      };
    },
	
    components: {},
    methods: {
		
			// Update quantity in the cart
			updateQuantity(x, changes) {
				this.$store.commit('updateCart', {x: x, changes: changes});
				this.reload();
			},
			
			// Delete item in the cart
			deleteItem(x) {
				// Update cart info in state
				this.$store.commit('deleteFromCart', x);
				
				this.reload();
			},
			
			getTotalPrice() {
				var price = 0
				var quantity = 0;
				for (var key in this.cart) {
					price += this.cart[key].price;
					quantity += this.cart[key].quantity;
				}
				
				console.log("Total price = " + price);
				console.log("Total quantity = " + quantity);
				this.totalPrice = price;
				this.totalQuantity = quantity;
			},
			
			paymentSelect(selection) {
				this.paymentSelection = selection;
			},
			
			addToOrder() {
				if (Object.keys(this.cart).length > 0) {
					let that = this;
				
					// Place order to the server
					const ret = post('/checkoutapi/placeorder', {"param":{
							"token": this.token,
							"cartId": this.cartId,
							"paymentMethod": {
								"method": "paybycredit"
							 },
							 
						},
					}).then(r => {
						console.log(r);
						that.orderId = r[0].orderid
						
						// Judge place order status
						if (r[0].success == true) {
							console.log("Successfully placed order");
							that.placeOrderError = false;
							
							// Store the order to state
							that.$store.commit('addToOrder', that.orderId);
							that.reload();
							that.emptyCart();
							
							// Show payment modal
							this.showModal();
							
						} else {
							that.placeOrderError = true;
							console.log("下单失败");
							// that.addAgain();
							// that.reload();
						}

					}).catch(e => {
						that.placeOrderError = true;
						console.log("Error placing order:" + e);
						// that.emptyCart();
						that.reload();
					});
				}
			},
			
			
			emptyCart() {
				// Request to empty cart in the server
				const ret = post('/checkoutapi/clearcart', {"param":{
						"token": this.token,
						"cartId": this.cartId,
					},
					
				}).then( r => {
					console.log(r);
					
					if (r[0].success == true) {
						this.$store.commit('emptyCart');
						this.reload();
					} else {
						console.log("Cannot empty cart!");
					}
					
				}).catch( e => {
					console.log("Error emptying cart!");
				})
			},
			
			addAgain() {
				let that = this;
				
				// Request to empty cart in the server
				const ret = post('/checkoutapi/clearcart', {"param":{
						"token": this.token,
						"cartId": this.cartId,
					},
					
				}).then( r => {
					console.log(r);
					
					if (r[0].success == true) {
						that.addToOrder();
						that.reload();
					} else {
						console.log("Cannot empty cart!");
						
					}
					
				}).catch( e => {
					console.log("Error emptying cart!");
				})
			},
			
			pay() {    // Make payment
			let that = this;
		
			uni.showLoading({
				title: '加载中...',
				mask: true	
			});
			
			Parse.Cloud.run('pay', {orderId : this.orderId, token: this.token, totalOrderFee: this.totalPrice, openId: this.openid}).then( r => {
				
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
						
						
						that.ifPaid[that.orderId] = true;
						
						that.status = 1;

						that.reload();
						
					},
					'fail':function(res){
						console.log("Payment failure", res);
						
						that.status = 2;
					},
					'complete':function(res){
						
					}
				});
				
				
			}).catch( e => {
				console.log("Payment error: " + e);
			})
		},
			
		
			// Navigate to certain page
			jump(pageName) {
				if (pageName === 'my') {
					this.login()
				}
				
				uni.navigateTo({
					url: `../${pageName}/${pageName}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			showModal() {    // Display modal
				this.modalName = 'bottomModal';
			},
			
			hideModal(e) {    // Hide the modal
				this.modalName = null;
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
			},
			
			// Used to reload page
			reload () {
				this.isRouterAlive = false
				this.$nextTick(function () {
					this.isRouterAlive = true
				})
			},
			
			
			
			
      initTextStyle() {
        //滑动之前先初始化数据
        for (var i = 0; i < this.listData.length; i++) {
          this.listData[i].textStyle = "";
          this.listData[i].textStyle1 = "";
        }
      },
      startMove(e) {
        this.initTextStyle();
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
      },
      deleteGoods(e) {
        //滑动之前先初始化样式数据
        this.initTextStyle();
        var index = e.currentTarget.dataset.index;
        console.log(index);
        if (this.X <= -100) {
          this.flag = true;
        }
        if (!this.flag) {
          this.moveX = e.touches[0].pageX;
          this.moveY = e.touches[0].pageY;
          this.X = this.moveX - this.startX;
          this.Y = this.moveX - this.startY;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          if (this.X >= 100) {
            this.X = 0;
          }
          this.tranX = this.X;
          if (this.X <= -100) {
            this.X = -100;
          }
          this.tranX1 = this.X;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        } else {
          this.moveX = e.touches[0].pageX;
          this.moveY = e.touches[0].pageY;
          this.X = this.moveX - this.startX;
          this.Y = this.moveX - this.startY;

          this.tranX = this.X - 100;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          // transform:'translateX(' + tranX + 'rpx)'
          console.log("heyushuo");

          console.log(this.listData[index].textStyle);

          if (this.X + -100 > -100) {
            this.flag = false;
          }
          this.tranX1 = -100;
          this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
          console.log(this.listData[index].textStyle1);
          // this.listData = this.listData;
        }

	  },
	  
      endMove(e) {
        var index = e.currentTarget.dataset.index;
        if (this.X > -50) {
          this.tranX1 = 0;
          this.tranX = 0;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        } else if (this.X <= -50) {
          this.tranX1 = -100;
          this.tranX = -100;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        }
	  },
	},
	
    computed: {
		...mapState(['cart', 'cartId', 'token', 'order', 'openid', 'ifPaid']),
		
		cart: {
			get() {
				return this.$store.state.cart
			},
			set(v) {
			// 使用vuex中的mutations中定义好的方法来改变
				this.$store.commit('updateCart', v)
			}
		},
	
		allPrise() {
			var Prise = 0;
			for (let i = 0; i < this.Listids.length; i++) {
				if (this.Listids[i]) {
					Prise = Prise + this.listData[i].retail_price * this.listData[i].number;
				}
			}
			
			return Prise;
			
		}
    },
  };

</script>
<style>
  
</style>
