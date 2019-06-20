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
							<view class="cu-avatar radius xl" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ 1 +'.jpg)'}]"></view>
						
							<view class="content">
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>{{x.detail.name}}</view>
								<view class="text-grey text-sm"></view>
							
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>套餐选择: {{x.pkgName}}</view>
								<view class="text-grey text-sm"></view>
							</view>
							
							<view>
								<view class="padding flex flex-wrap justify-between align-center bg-white">
									<button @click="deleteItem(x.pkg)" class="cu-btn round">删除</button>
								</view>
								
								<view class="text-gray text-sm">
									<text class=" text-red  margin-right-xs"></text>¥ {{x.price}}</view>
								<view class="text-grey text-sm"></view>
							</view>
							
						</view>
					</view>
				
					<view class="cu-bar  bg-white padding-lr solid margin-bottom">
						<text>购买数量</text>
						<view class="add flex align-center">
							<button type="default" @click="updateQuantity(x.pkg, -1)" class="padding-lr text-bold text-xl">-</button>
							<text class="margin-lr">{{x.quantity}}</text>
							<button type="default" @click="updateQuantity(x.pkg, 1)" class="padding-lr text-bold text-xl">+</button>
						</view>
					</view>
				</div>
				
				
				<view class="cu-list bg-white menu margin-top solid-top">
					<view class="cu-item " >
							<view class="content">
								<image src="/static/wechat.svg" class="png" mode="aspectFit"></image>
								<text class="text-grey">微信支付</text>
							</view>
							
							<text class="cuIcon-check"></text>
						</view>
						
						<view class="cu-item" :class="menuArrow?'arrow':''">
							<view class="content">
								<image src="/static/alipay.svg" class="png" mode="aspectFit"></image>
								<text class="text-grey">支付宝支付</text>
							</view>
						</view>
				</view>
				
		
				<!-- 支付底栏 -->
				<view class="cu-bar bg-white tabbar border shop foot">
						<view class="margin-right" style="text-align: right; width: 50%;"> 实付款:<text class="margin-left text-xl">¥ {{totalPrice}} </text> </view>
					
					<view class="bg-red submit">立即支付</view>
				</view>
			
		</div>
</template>

<script>
	import { mapState } from 'vuex'
  import {
    get,
    post,
    login,
    getStorageOpenid
  } from "../../utils";
  export default {
    onShow() {
		this.getTotalPrice();
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
      };
    },
	
    components: {},
    methods: {
			// Update quantity in the cart
			updateQuantity(pkg, changes) {
				this.$store.commit('updateCart', {pkg: pkg, changes: changes});
				this.reload();
			},
			
			// Delete item in the cart
			deleteItem(pkg) {
				this.$store.commit('deleteFromCart', pkg);
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
			
			addressbook(){
				uni.navigateTo({
					url:'../addressSelect/addressSelect',
				})
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
        // if (Math.abs(this.X) > Math.abs(this.Y) && this.X > 20) {
        //   this.scrollflag = false;
        // } else if (Math.abs(this.X) > Math.abs(this.Y) && this.X < 20) {
        //   console.log("right 2 left");
        // }
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
      async orderDown() {
        if (this.Listids.length == 0) {
          wx.showToast({
            title: "请选择商品",
            icon: "none",
            duration: 1500
          });
          return false;
        }
        // 去掉数组中空的false的
        var newgoodsid = [];
        for (let i = 0; i < this.Listids.length; i++) {
          const element = this.Listids[i];
          if (element) {
            newgoodsid.push(element);
          }
        }
        var goodsId = newgoodsid.join(",");
        const data = await post("/order/submitAction", {
          goodsId: goodsId,
          openId: this.openId,
          allPrise: this.allPrise
        });
        if (data) {
          wx.navigateTo({
            url: "/pages/order/order"
          });
        }
      },
      async delGoods(id, index) {
        var _this = this;
        wx.showModal({
          title: "",
          content: "是否要删除该商品",
          success: function (res) {
            if (res.confirm) {

              _this.Listids.splice(index, 1);
              const data = get("/cart/deleteAction", {
                id: id
              }).then(() => {
                _this.getListData();
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
              //滑动之前先初始化样式数据
              _this.initTextStyle();
            }
          }
        });
      },
      async getListData() {
        const data = await get("/cart/cartList", {
          openId: this.openId
        });
        for (var i = 0; i < data.data.length; i++) {
          data.data[i].textStyle = "";
          data.data[i].textStyle1 = "";
        }
        this.listData = data.data;
      },
      change(e) {},
      changeColor(index, id) {
        if (this.Listids[index]) {
          this.$set(this.Listids, index, false);
        } else {
          this.$set(this.Listids, index, id);
        }
      }
    },

	
    computed: {
		...mapState(['cart']),
		
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
