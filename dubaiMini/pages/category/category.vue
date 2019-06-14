<template>
	<view>
			<cu-custom :isBack="true" bgColor="my_header_background text-white">
				<block slot="backText">返回</block>
				<block slot="content">分类导航</block>
			</cu-custom>
		
		<!-- 搜索 -->
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @click="toSearch" :adjust-position="false" type="text" placeholder="深海洗颜泥" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round">搜索</button>
				</view>
			</view>
		<!-- 搜索	 -->
		
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 0upx)">
				<view class="cu-item" @tap="selectitem(item.id,index)" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in listData" :key="index" 
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 0upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr"  v-for="(item1,index1) in detailData.subcategories" :key="index1" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green">
								{{item1.name}}
							</text>
						</view>
					</view>
			
					<view class="cu-list menu-avatar" :key='index1' @click="toCategory(item1.id)">
						<view class="cu-item">
							<view class="cu-avatar radius xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="content">
								<view class="text-grey">{{item1.name}}</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										<text class="cuIcon-infofill text-red  margin-right-xs"></text>
										我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
									</text> </view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">22:20</view>
								<view class="cu-tag  bg-grey sm">5</view>
							</view>
						</view>
						
				<!-- 		<view class="cu-item">
							<view class="cu-avatar radius xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
								<view class="cu-tag badge">99+</view>
							</view>
							<view class="content">
								<view class="text-grey">
									<text class="text-cut">彩妆</text>
								</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										hah
									</text>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">22:20</view>
								<view class="cuIcon-notice_forbid_fill text-gray"></view>
							</view>
						</view> -->
						
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
				listData:[],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				detailData:[]
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			
			this.getCategories()
			
			this.list = fakeCategories
			this.listCur = this.list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			 async selectitem(id, index) {
				 this.tabCur =index;
				  // this.nowIndex = index; // 这是把当前浏览的大分类标红
				  this.detailData = this.listData.filter( x => x.id === id )[0] // 过滤出当前点击的那个子分类
				},
			async getCategories(){//请求分类数据
				const data = await post("/catalogapi/topMenu"); // 拿到全部分类信息
				  console.log('11111111'+JSON.stringify(data))
				this.listData = data; // 拿到啦
				
				// Parse.Cloud.run('getCategories').then( r => {
				// 	console.log('' + JSON.stringify(r));
				// 	this.list = r.children_data.map( (x,index) => {
				// 		x.bid = index
				// 		return x
				// 	})
				// }).catch( e => {
				// 	console.log(e);
				// }
				// )
				// 
				
     

			},
			toCategory(id){
				uni.navigateTo({
					url:'../categorylist/categorylist?id='+id
				})
			},
			// TabSelect(e) {
			// 	
			// 	this.mainCur = e.currentTarget.dataset.id;
			// 	this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			// },
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
