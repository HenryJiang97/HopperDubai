<template>
	<div class="index" >
			
		<!-- Header -->
		<cu-custom bgColor="my_header_background">
			<!-- User info (Top left) -->
			<block slot="userCenter" @click="jump('my')"></block>
			<block slot="content">首页</block>
		</cu-custom>
		

		<!-- 热门分类内容 -->
		<view class="cu-list grid" :class="['col-' + gridCol, gridBorder ? '' : 'no-border']">
			<view class="cu-item" v-for="(item, index) in iconList" :key="index" v-if="index < gridCol * 2">
				<view :class="['cuIcon-' + item.icon, 'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge != 0">
						<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
					</view>
				</view>
				<text>{{ item.name }}</text>
			</view>
		</view>


		<!-- 热销产品 -->
		<view class="cu-bar bg-white solid-bottom margin-top-sm">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>
				热销产品
			</view>
		</view>
		
		
		<!-- 热销产品内容 -->
		<view class="bg-white padding">
			<view class="grid margin-bottom text-center" v-for="(item,index) in 1" :key="index" :class="col-2">
				<view style='width:47%' class="margin-tb-sm"  :class="indexs%2==0?'margin-right-sm':'margin-left-sm'" v-for="(item,indexs) in hostItems" :key="indexs">
					<image :src="item.imageUrl" alt="" mode="aspectFill"></image>
					<p>{{item.name}}</p>
				</view>
			</view>
		</view>
		
		<!-- Blank bar for format -->
		<view class="bg-white padding"></view>
	
		
		
		<!-- 底部菜单 -->
		<view class="cu-bar tabbar footer_bar bg-bingbang my_box_shadow shadow">
			<view class="action text-green">
				<view class="cuIcon-home"></view>
				首页
			</view>
			
			<view class="action text-gray" @click="jump('category')">
				<view class="cuIcon-shop"></view>
				商店
			</view>
			
			<view class="action text-gray" @click="jump('cart')">
				<view class="cuIcon-cart"><view class="cu-tag badge">{{itemsInCart}}</view></view>
				购物车
			</view>
			
			<view class="action text-gray" @click="jump('my')">
				<view class="cuIcon-my"><view class="cu-tag badge"></view></view>
				个人中心
			</view>
		</view>
		<!-- 底部菜单 -->
		
	</div>
</template>



<script>
	
import amapFile from '../../utils/amap-wx';
import { get ,post} from '../../utils';
import { mapState, mapMutations } from 'vuex';
import fake from '../../fakedata/home.js';
import SingleItem from '../../components/item'
import Parse from '../../common/parse.js'


export default {
	components:{
		SingleItem
	},
	onLoad() {
		// this.$store.dispatch('getHotItems')
		this.getHomeData()
	},
	onShow() {
		console.log('开始检查登录情况');
		this.$store.commit('needLogin');
		this.wxProfile = this.$store.state.wxProfile
		// this.printOpenId();
		console.log(this.token);
		
		this.getItemsInCart();
		this.getItemsInCart();
	},
	
	computed:{
		...mapState(['hotItems','cart'])
	},
	data() {
		return {
			
			gridCol: 4,
			gridBorder: true,
			iconList: [],
			swiperList: [],

			langs: ['en-US', 'zh-CN'],
			banner: [],
			channel: [],
			
			hostItems: [], // 最热产品
			topicList: [],
			newCategoryList: [],
			itemsInCart: 0,
			
		};
	},
	
	methods: {
		async getHomeData(){
			this.hostItems=await post(`/catalogapi/homeProduct`)
			console.log(this.hostItems)
		},
		
		getItemsInCart() {
			this.itemsInCart = Object.keys(this.cart).length;
		},
		
		
		goDetail(){
			uni.navigateTo({
				url: '../goods/goods',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		
		showModal(e) {
				// this.sharePop = true
		},
		
		hideModal(e) {
				// this.sharePop = false
		},
		
		onClose(){
			this.isShow = false
		},
		
		login() {
			uni.login({
				success: res => {
					if (res.code) {
						this.$http({
							url: '/user/getOpenId',
							method: 'GET',
							data: res,
							success: r => {
								if (r.statusCode === 200) {
									this.$store.commit('setOpenId', r.data.openid)
								}
							}
						})
					}
				}
			});
		},
		
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
		
		changeLang(lang) {
			console.log('修改语言' + lang);
			this.$i18n.locale = lang;
		},
		
		demonote() {
			uni.showModal({
				title: 'hihi',
				content: 'haha',
				showCancel: false
			});
		},
		
		toMappage() {
			var _this = this;
			// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
			wx.getSetting({
				success(res) {
					//如果没有同意授权,打开设置
					if (!res.authSetting['scope.userLocation']) {
						wx.openSetting({
							success: res => {
								_this.getCityName();
							}
						});
					} else {
						wx.navigateTo({
							url: '/pages/mappage/mappage'
						});
					}
				}
			});
		},
		
		getCityName() {
			uni.getLocation({
				success(r) {
					console.log(r);
				}
			});
			var _this = this;
			var myAmapFun = new amapFile.AMapWX({
				key: 'e545e7f79a643f23aef187add14e4548'
			});
			myAmapFun.getRegeo({
				success: function(data) {
					//成功回调
					console.log(data);
					// data[0].regeocodeData.formatted_address
					// _this.cityName = data[0].regeocodeData.formatted_address;
				},
				fail: function(info) {
					//失败回调
					console.log(info);
					//如果用户拒绝授权
					// 默认为北京
					_this.cityName = '北京市';
				}
			});
		},
		
		toSearch() {
			wx.navigateTo({
				url: '/pages/search/search'
			});
		},
		
		async getData() {
			const data = fake;
			this.banner = data.banner;
			this.channel = data.channel;
			this.brandList = data.brandList;
			this.newGoods = data.newGoods;
			this.hotGoods = data.hotGoods;
			this.topicList = data.topicList;
			this.newCategoryList = data.newCategoryList;
		},
		
		goodsDetail(id) {
			wx.navigateTo({
				url: '/pages/goods/goods?id=' + id
			});
		},
		
		categoryList(id) {
			wx.navigateTo({
				url: '/pages/categorylist/categorylist?id=' + id
			});
		},
		
		goodsList(info) {
			if (info == 'hot') {
				wx.navigateTo({
					url: '/pages/newgoods/newgoods?isHot=' + 1
				});
			} else {
				wx.navigateTo({
					url: '/pages/newgoods/newgoods?isNew=' + 1
				});
			}
		},
		
		topicdetail(id) {
			wx.navigateTo({
				url: '/pages/topicdetail/topicdetail?id=' + id
			});
		},
		
		totopic() {
			wx.navigateTo({
				url: '/pages/topic/topic'
			});
		},
		
		tobrandList() {
			wx.navigateTo({
				url: '/pages/brandlist/brandlist'
			});
		},
		
		branddetail(id) {
			wx.navigateTo({
				url: '/pages/branddetail/branddetail?id=' + id
			});
		}
	},
	
	created() {
		
	},
	
	onShareAppMessage: function(options) {
		var that = this; // 设置菜单中的转发按钮触发转发事件时的转发内容
		var shareObj = {
			title: 'Cause', // 默认是小程序的名称(可以写slogan等)
			success: function(res) {
				// 转发成功之后的回调
				if (res.errMsg == 'shareAppMessage:ok') {
				}
			},
			fail: function() {
				// 转发失败之后的回调
				if (res.errMsg == 'shareAppMessage:fail cancel') {
					// 用户取消转发
				} else if (res.errMsg == 'shareAppMessage:fail') {
					// 转发失败，其中 detail message 为详细失败信息
				}
			},
			complete: function() {
				// 转发结束之后的回调（转发成不成功都会执行）
			}
		};
		return shareObj;
	}
};
</script>

