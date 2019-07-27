<template>
	<view>
			<cu-custom :isBack="true" bgColor="my_header_background text-white">
				<block slot="backText">返回</block>
				<block slot="content">分类导航</block>
			</cu-custom>
		
		
		<!-- Vertical Box -->
		<view class="VerticalBox">
			<!-- Category names -->
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 0upx)">
				<view class="cu-item" @tap="selectitem(item.id,index)" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in listData" :key="index" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			
			
			<!-- Subcategory details  -->
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 0upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr"  v-for="(item1,index1) in detailData.subcategories" :key="index1" :id="'main-'+index">
					
					<!-- <p>{{getListData(item1.id)}}</p> -->
					<!-- Subcategory tab -->
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green">
								{{item1.name}}
							</text>
						</view>
					</view>
			
					<!-- Subcategory details -->
					<view class="cu-list menu-avatar" :key='index1' @click="toCategory(item1.id, item1.name)">
						<view class="cu-item">
							<view class="content" style="margin-left: 0;">
								<view class="text-bold">{{item1.name}}</view>
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
	
	</view>
</template>

<script>
	import Parse from '../../common/parse.js'
	import fakeCategories from '../../fakedata/categories.js'
	import { post ,imgPath} from "../../utils";
	export default {
		data() {
			return {
				list: [],
				listData:[],  // Category name
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				detailData:[],
				listCur: 0,
				listDataNum: {},
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			
			// Get category list
			this.getCategories()
		},
		
		onReady() {
			uni.hideLoading()
		},
		
		
		methods: {
			async selectitem(id, index) {//过滤出当前点击的那个子分类
				this.tabCur =index;
				
				this.detailData = this.listData.filter( x => x.id === id )[0] // 过滤出当前点击的那个子分类
				console.log(index)
				
			},
			
			async getCategories(){// 通过Top Menu api获取分类信息，请求分类数据
				const data = await post("/catalogapi/topMenu"); // 拿到全部分类信息
				this.listData = data; // 拿到啦
				
				console.log(this.listData)
			},

			toCategory(id, name){
				uni.navigateTo({
					url:'../categorylist/categorylist?id=' + id + '&name='+ name
				})	
			},

			
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].bid);
						view.fields({
							size: true
						}, data => {
							console.log('data' + JSON.stringify(data));
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].bid - 1) * 50
						this.tabCur = this.list[i].bid
						// console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
