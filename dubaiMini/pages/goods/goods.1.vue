<template>
  <div class="goods">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="'https://www.hopperdubai.com/pub/media/catalog/product/'+item.file" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{name}}</p>
        <!-- <p>{{info.goods_brief}}</p> -->
        <p>￥{{price}}</p>
        <div v-if="brand.name" class="brand">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    <div @click="showType" class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>
    <!-- <div @click="showType" class="section-nav">
      <div>用户评价</div>
      <div></div>
    </div> -->

    <div v-if="attribute.length!=0" class="attribute">
      <div class="head">
        商品参数
      </div>
      <div v-for="(item,index) in attribute" :key="index" class="item">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <div v-if="desc" class="detail">
      <wxParse :content="desc" />
    </div>
    <!-- 常见问题 -->
    <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">常见问题</text>
        <div class="line"></div>
      </div>
      <div class="b">
        <div class="item" v-for="(item, index) in issueList" :key="index">
          <div class="question-box">
            <text class="spot"></text>
            <text class="question">{{item.question}}</text>
          </div>
          <div class="answer">
            {{item.answer}}
          </div>
        </div>
      </div>
    </div>
    <!-- 常见问题 -->
		
		
    <!-- 大家都在看 -->

<!--    <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">大家都在看</text>
        <div class="line"></div>
      </div>
      <div class="sublist">
        <div @click="togoodsDetail(subitem.id)" v-for="(subitem, subindex) in productList" :key="subindex">
          <img :src="subitem.list_pic_url" alt="">
          <p>{{subitem.name}}</p>
          <p>￥{{subitem.retail_price}}</p>
        </div>
      </div>
    </div> -->

    <!-- 大家都在看 -->
		
		
    <div class="bottom-fixed">
      <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' :'']">

        </div>

      </div>
      <div @click="toCart">
        <div class="car">
          <span>
            {{allnumber}}
          </span>
          <img src="/static/images/ic_menu_shoping_nor.png" alt="">
        </div>
      </div>
      <div @click="bug">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>

    <!-- 选择规格部分 -->
    <div v-show="showpop" @click="showType" class="pop">

    </div>
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <img :src="info.primary_pic_url" alt="">
        </div>
        <div class="right">
          <div>
            <p>价格￥{{info.retail_price}}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <div @click="showType" class="close">
          X
        </div>
      </div>
      <div class="b">
        <p>数量</p>
        <div class="count">
          <div @click="reduce" class="cut">-</div>
          <input class="number" disabled="" v-model="number" />
          <div @click="add" class="add">+</div>
        </div>
      </div>
    </div>

    <!-- 选择规格部分 -->
  </div>
</template>

<script>
import { get, post, toLogin, login, getStorageOpenid } from "../../utils";
import wxParse from "mpvue-wxparse";

export default {
  onShow() {
  },
  mounted() {
    //判断是否登录获取用户信息
    if (login()) {
      this.userInfo = login();
    }
    console.log(this.$root.$mp.query.id);

    this.id = this.$root.$mp.query.id;

    this.openId = getStorageOpenid();
    this.goodsDetail();
  },
  //商品转发
  onShareAppMessage() {
    console.log(this.info.name);
    console.log(this.info.id);
    console.log(this.gallery[0].img_url);

    return {
      title: this.info.name,
      path: "/pages/goods/goods?id=" + this.info.id,
      imageUrl: this.gallery[0].img_url //拿第一张商品的图片
    };
  },
  data() {
    return {
      allnumber: 0,
      openId: "",
      collectFlag: false,
      number: 0,
      showpop: false,
      gallery: [],
      name:'',
			price:'',
      brand: {},
      attribute: [],
      issueList: [],
      productList: [],
      desc: "",
      id: "",
      userInfo: "",
      goodsId: "",
      allPrise: ""
    };
  },
  components: {
    wxParse
  },
  methods: {
    togoodsDetail(id) {
      wx.redirectTo({ url: "/pages/goods/goods?id=" + id });
    },
    add() {
      this.number = this.number + 1;
    },
    reduce() {
      if (this.number > 1) {
        this.number = this.number - 1;
      } else {
        return false;
      }
    },
    async bug() {
      if (toLogin()) {
        if (this.showpop) {
          if (this.number == 0) {
            wx.showToast({
              title: "请选择商品数量", //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: res => { }
            });
            return false;
          }
          console.log(this.goodsId);
          console.log(this.openId);

          const data = await post("/order/submitAction", {
            goodsId: this.goodsId,
            openId: this.openId,
            allPrise: this.allPrise
          });
          if (data) {
            wx.navigateTo({
              url: "/pages/order/order"
            });
          }
        } else {
          this.showpop = true;
        }
      }
    },
    async collect() {
      if (toLogin()) {
        this.collectFlag = !this.collectFlag;
        const data = await post("/collect/addcollect", {
          openId: this.userInfo.openId,
          goodsId: this.goodsId
        });
      }
    },
    async addCart() {
      if (toLogin()) {
        if (this.showpop) {
          if (this.number == 0) {
            wx.showToast({
              title: "请选择商品数量", //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: res => { }
            });
            return false;
          }
          const data = await post("/cart/addCart", {
            openId: this.userInfo.openId,
            goodsId: this.goodsId,
            number: this.number
          });
          //添加成功后
          if (data) {
            this.allnumber = this.allnumber + this.number;
            wx.showToast({
              title: "添加购物车成功",
              icon: "success",
              duration: 1500
            });
          }
        } else {
          this.showpop = true;
        }
      }
    },
    toCart() {
      wx.switchTab({
        url: "/pages/cart/cart"
      });
      // wx.navigateTo({
      //   url: "/pages/cart/cart"
      // });
    },
    async goodsDetail() {
      const data = await get(`/products/${this.id}`);
      this.gallery = data.media_gallery_entries;
			this.name = data.name
			this.price = data.price
			data.custom_attributes.foreach( x => {
				if ( x.attribute_code === 'meta_description'){
					this.desc = x.value
				}
			})
			
      this.info = data.info;
      this.allPrise = data.info.retail_price;
      this.goodsId = data.info.id;
      this.brand = data.brand;
      this.attribute = data.attribute;
      this.goods_desc = data.info.goods_desc;
      this.issueList = data.issue;
      this.collectFlag = data.collected;
      this.allnumber = data.allnumber;
      this.productList = data.productList;
    },
    showType() {
      this.showpop = !this.showpop;
    }
  },
  computed: {},
	
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
	},
	
};
</script>
<style lang='scss' scoped>
/**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *         垂直微信小程序开发交流社区
 *
 * github地址: https://github.com/icindy/wxParse
 *
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

.wxParse {
  width: 100%;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

.wxParse view {
  word-break: hyphenate;
}

.wxParse .inline {
  display: inline;
  margin: 0;
  padding: 0;
}

.wxParse .div {
  margin: 0;
  padding: 0;
}

.wxParse .h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
.wxParse .h2 {
  font-size: 1.5em;
  margin: 0.83em 0;
}
.wxParse .h3 {
  font-size: 1.17em;
  margin: 1em 0;
}
.wxParse .h4 {
  margin: 1.33em 0;
}
.wxParse .h5 {
  font-size: 0.83em;
  margin: 1.67em 0;
}
.wxParse .h6 {
  font-size: 0.67em;
  margin: 2.33em 0;
}

.wxParse .h1,
.wxParse .h2,
.wxParse .h3,
.wxParse .h4,
.wxParse .h5,
.wxParse .h6,
.wxParse .b,
.wxParse .strong {
  font-weight: bolder;
}

.wxParse .p {
  margin: 1em 0;
}

.wxParse .i,
.wxParse .cite,
.wxParse .em,
.wxParse .var,
.wxParse .address {
  font-style: italic;
}

.wxParse .pre,
.wxParse .tt,
.wxParse .code,
.wxParse .kbd,
.wxParse .samp {
  font-family: monospace;
}
.wxParse .pre {
  overflow: auto;
  background: #f5f5f5;
  padding: 8px;
  white-space: pre;
  margin: 1em 0px;
}
.wxParse .code {
  display: inline;
  background: #f5f5f5;
}

.wxParse .big {
  font-size: 1.17em;
}

.wxParse .small,
.wxParse .sub,
.wxParse .sup {
  font-size: 0.83em;
}

.wxParse .sub {
  vertical-align: sub;
}
.wxParse .sup {
  vertical-align: super;
}

.wxParse .s,
.wxParse .strike,
.wxParse .del {
  text-decoration: line-through;
}

.wxParse .strong,
.wxParse .s {
  display: inline;
}

.wxParse .a {
  color: deepskyblue;
}

.wxParse .video {
  text-align: center;
  margin: 10px 0;
}

.wxParse .video-video {
  width: 100%;
}

.wxParse .img {
  display: inline-block;
  width: 0;
  height: 0;
  max-width: 100%;
  overflow: hidden;
}

.wxParse .blockquote {
  margin: 5px 0;
  padding: 10px 0 10px 10px;
  font-family: Courier, Calibri, "宋体";
  background: #f5f5f5;
  border-left: 3px solid #dbdbdb;
}
.wxParse .blockquote .p {
  margin: 0;
}

.wxParse .ul, .wxParse .ol {
  display: block;
  margin: 1em 0;
  padding-left: 16px;
}
.wxParse .ol {
  list-style-type: disc;
}
.wxParse .ol {
  list-style-type: decimal;
}
.wxParse .li {
  display: list-item;
  align-items: baseline;
  text-align: match-parent;
}
.wxParse .ul .ul, .wxParse .ol .ul {
  list-style-type: circle;
}
.wxParse .ol .ol .ul, .wxParse .ol .ul .ul, .wxParse .ul .ol .ul, .wxParse .ul .ul .ul {
    list-style-type: square;
}

.wxParse .u {
  text-decoration: underline;
}
.wxParse .hide {
  display: none;
}
.wxParse .del {
  display: inline;
}
.wxParse .figure {
  overflow: hidden;
}

.wxParse .table {
  width: 100%;
}
.wxParse .thead, .wxParse .tfoot, .wxParse .tr {
  display: flex;
  flex-direction: row;
}
.wxParse .tr {
  width:100%;
  display: flex;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.wxParse .th,
.wxParse .td {
  display: flex;
  width: 580px;
  overflow: auto;
  flex: 1;
  padding: 5px;
  border-left: 1px solid #e0e0e0;
}
.wxParse .td:last {
  border-top: 1px solid #e0e0e0;
}
.wxParse .th {
  background: #f0f0f0;
  border-top: 1px solid #e0e0e0;
}
@import "./style.scss";
</style>
