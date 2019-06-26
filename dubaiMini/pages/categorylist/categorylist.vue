<template>
	<div class="categoryList">
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
			<block slot="backText">返回</block>
			<block slot="content">{{categoryName}}</block>
		</cu-custom>

		<!-- 工具栏 -->
		
		<!-- <div class="cu-bar padding-lr ">
			<div class="item">
				评论<text class=" margin-left-xs"></text>
			</div>
			<div class="item">
				价格<text class="cuIcon-unfold margin-left-xs"></text>
			</div>
			<div class="item" @tap="showModal" data-target="DrawerModalR">
				筛选<text class="cuIcon-filter margin-left-xs"></text>
			</div>
			
		</div> -->
		<!-- 工具栏 -->
		
		
		
		<!-- 过滤器 -->
		<!-- <view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-xl" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				
				<view class="cu-list menu text-left">
					
					<view class="cu-item" >
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>价格区间</view>
							
							<view class="text-gray text-sm flex">
								<input class="bg-gray round padding-lr margin-right" type="text" value="" />
								—
								<input class="bg-gray round padding-lr margin-left" type="text" value="" />
							</view>
						</view>
						
					</view>
					
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>品牌</view>
							
							<view class="text-gray grid text-sm  text-center col-3">
								<view v-for="(x,idx) in 6" :key="idx" class="text-black" style="margin-top: 20upx;">
									<text class="round padding-lr-sm padding-tb-xs bg-gray ">习近平</text>
								</view>
								
							</view>
						</view>
						
					</view>
					
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>材质</view>
							
							<view class="text-gray grid text-sm  text-center col-3">
								<view v-for="(x,idx) in 6" :key="idx" class="text-black" style="margin-top: 20upx;">
									<text class="round padding-lr-sm padding-tb-xs bg-gray ">特朗普</text>
								</view>
								
							</view>
						</view>
						
					</view>
					
				</view>
				
				
				
			</view>
		</view> -->
		<!-- 过滤器 -->
		

		<!-- #ifndef MP-BAIDU -->
		<scroll-view class="list"  scroll-y @scrolltolower="loadMore(idx)" >
			<view class="bg-white padding">
				<view class="grid margin-bottom text-center">
					<!-- <p>{{printdata(item.sku)}}</p> -->
					<view style='width:47%' class="margin-tb-sm"  :class="indexs%2==0?'margin-right-sm':'margin-left-sm'" v-for="(item,indexs) in goodsList" @click="goodsDetail(item.id)" :key="indexs">
						<image :src="item.imageurl" alt="" mode="aspectFill"></image>
						<p>{{item.name}}</p>
					</view>
				</view>
			</view>
			
			<!-- <view class="bg-white padding" >
				<view class="grid margin-bottom text-center col-2">
					<SingleItem  v-for="(item,indexs) in goodsList" 
					:key="indexs" 
					:item="item" style="width:50%;"></SingleItem>	
				</view>
			</view> -->

			<!-- <view class="uni-tab-bar-loading">
				<view class="loading-more">{{ loadingText }}</view>
			</view> -->
		</scroll-view>
		<!-- #endif -->
	</div>
</template>

<script>
import { getMagento, itemPath, post } from '../../utils';
import SingleItem from '../../components/item.vue'

export default {
	components:{
		SingleItem
	},
	created() {},
	mounted() {
		//获取页面传的参数
		this.categoryId = this.$root.$mp.query.id;
		this.categoryName = this.$root.$mp.query.name;
		this.getListData()
	},
	data() {
		return {
			url: ';',
			CustomBar : this.CustomBar,
			loadingText:'加载',
			ItemDate:{},
			itemPath: itemPath,
			categoryId: '',
			categoryName: '',
			nowIndex: 0,
			goodsList: [],
			navData: [],
			currentNav: {},
			token: "vuh1yve09x8d4uo4oly1ofab1suy5gdb",
			modalName: null,
		};
	},
	onLoad() {
	},
	
	
	methods: {
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		
		hideModal(e) {
			this.modalName = null
		},

		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},

		async getListData(index, id) { //获取子菜单数据
			this.nowIndex = index;
			const listdata = await post('/catalogapi/getCategoryProducts', {"param":{"id":this.categoryId,"token":this.token}});
			this.goodsList = listdata;
			
			console.log(listdata);
			//需要让导航滚动到可见区域
			if (this.nowIndex > 4) {
				this.scrollLeft = this.nowIndex * 60;
				
			}
		},
		
		async getAllData() {
			const navdata = await get(`/categories/${this.categoryId}/products`);
			console.log('拿到列表页全部产品SKU');
			console.log(navdata);

			let allPromise = navdata.map(x => {
				let promise = get(`/products/${x.sku}`);
				return promise;
			});
			console.log('全部的请求' + allPromise);

			//       this.navData = navdata.navData;
			//       this.currentNav = navdata.currentNav;
			//
			//       for (let i = 0; i < this.navData.length; i++) {
			//         const id = this.navData[i].id;
			//         if (id == this.currentNav.id) {
			//           this.nowIndex = i;
			//         }
			//       }
			//
			//       //需要让导航滚动到可见区域
			//       if (this.nowIndex > 4) {
			//         this.scrollLeft = this.nowIndex * 60;
			//       } else {
			//         this.scrollLeft = 0;
			//       }

			Promise.all(allPromise)
				.then(r => {
					console.log('拿到产品信息' + r);
					this.goodsList = r;
				})
				.catch(e => {
					console.log(e);
				});

			      const listdata = await get("/goods/goodsList", {
			        categoryId: this.categoryId
			      });
			      this.goodsList = listdata.data;
		},
		
		goodsDetail(id) {
			// console.log(id);
			uni.navigateTo({
				url: '../goods/goods?id='+id
			});
		},
		
		printdata(data) {
			console.log(data);
		}
	},
	computed: {}
};
</script>
<style scoped>
	
</style>
