<template>
  <div class="cart">
		
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
			<block slot="backText">返回</block>
			<block slot="content">购物车</block>
		</cu-custom>
		
		<div class="cu-list menu solid-bottom">
			<view class="cu-item" @tap="addressbook">
					<view class="action margin-right  text-xl">
						<text class="cuIcon-location"></text>
					</view>
				
					<view class="content padding-tb-sm">
						<view>
							<text class=" text-blue margin-right-xs"></text> Mr 雷</view>
						<view class="text-gray  text-left">
							<text class=" margin-right-xs"></text> 美国纽约上东区老白汇大街美国纽约上东区老白汇大街美国纽约上东区老白汇大街</view>
					</view>
					<view class="action">
						
						<text class="cuIcon-right"></text>
						
					</view>
			</view>
		</div>
		
		
		
			<!-- 宣传标语 -->
			<!-- <view class="cu-list col-3 grid " >
				<view class="cu-item" >
					<view class="cuIcon-location text-green">
						
					</view>
					<text>纽约直邮</text>
				</view>
				<view class="cu-item " >
					<view class="cuIcon-redpacket text-green">
						
					</view>
					<text>价格最优</text>
				</view>
				<view class="cu-item ">
					<view class="cuIcon-appreciate text-green">
						
					</view>
					<text>100%正品</text>
				</view>
			</view> -->
			
			<!-- 宣传标语 -->
			
			
		
  
		
		
		
    <div class="cartlist">
			
			<!-- 购物车产品 -->
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" >
					<view class="cu-avatar radius xl" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ 1 +'.jpg)'}]"></view>
					
					<view class="content">
						<view class="text-gray text-sm">
							<text class=" text-red  margin-right-xs"></text> ¥ 23</view>
						<view class="text-grey text-sm">
							黑人（DARLIE）双重薄荷清新口气牙膏225g 防蛀固齿防口气 (新老包装随机发放）</view>
						
					</view>
					
				</view>
			</view>
			
			<div class="cu-bar  bg-white padding-lr solid margin-bottom">
				<text>购买数量</text>
				<div class="add flex align-center">
					<button type="default" class="padding-lr text-bold text-xl">-</button>
					<text class="margin-lr">1</text>
					<button type="default" class="padding-lr text-bold text-xl">+</button>
				</div>
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
			<!-- 购物车产品 -->
			
			
    
     <!-- <div class="item" @touchstart="startMove" @touchmove="deleteGoods" @touchend="endMove" :data-index="index" v-for="(item,index) in listData"
        :key="index">
        <div class="con" :style="item.textStyle">
          <div class="left">
            <div class="icon" @click="changeColor(index,item.goods_id)" :class="[ Listids[index] ? 'active' : '',{active:allcheck}]"></div>
            <div class="img">
              <img :src="item.imgurl" alt="">
            </div>
            <div class="info">
              <p>{{item.name}}</p>
              <p>￥{{item.price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">
              x{{item.number}}
            </div>
          </div>
        </div>

        <div @click="delGoods(item.id,index)" class="delete" :style="item.textStyle1">
          <div>
            删除
          </div>
        </div>
      </div> -->
			
			
    </div>
		
    <div v-if="false" class="nogoods">
      <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png" alt="">
    </div>
		
   <!-- <div class="fixed">
      <div @click="allCheck" :class="{active:allcheck}" class="left">
        全选({{isCheckedNumber}})
      </div>
      <div class="right">
        <div>
          ￥{{allPrise}}
        </div>
        <div @click="orderDown">下单</div>
      </div>
    </div> -->
		
		
	
			
			<view class="cu-bar bg-white tabbar border shop foot">
					<view class="margin-right" style="text-align: right; width: 50%;"> 实付款:<text class="margin-left text-xl">¥179 </text>  </view>
				
				<view class="bg-red submit">立即支付</view>
			</view>
		
  </div>
</template>

<script>
  import {
    get,
    post,
    login,
    getStorageOpenid
  } from "../../utils";
  export default {
    onShow() {
      // this.openId = getStorageOpenid();
      // this.getListData();
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
        listData: [
					{
						name:'洁面乳哦',
						url:'',
						price:23,
						number:2
					},
						{
						name:'洁面乳哦',
						url:'',
						price:23,
						number:2
					},
						{
						name:'洁面乳哦',
						url:'',
						price:23,
						number:2
					}
				],
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
        Y: ""
      };
    },
    components: {},
    methods: {
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
      allCheck() {
        //先清空
        this.Listids = [];
        if (this.allcheck) {
          this.allcheck = false;
        } else {
          console.log("选择全部");

          this.allcheck = true;
          //循环遍历所有的商品id
          for (let i = 0; i < this.listData.length; i++) {
            const element = this.listData[i];
            this.Listids.push(element.goods_id);
          }
        }
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
      isCheckedNumber() {
        let number = 0;
        for (let i = 0; i < this.Listids.length; i++) {
          if (this.Listids[i]) {
            number++;
          }
        }
        if (number == this.listData.length && number != 0) {
          this.allcheck = true;
        } else {
          this.allcheck = false;
        }
        return number;
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
    }
  };

</script>
<style>
  
</style>
