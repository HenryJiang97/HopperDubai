<template>
	<div class="categoryList">
		<cu-custom :isBack="true" bgColor="my_header_background text-white">
			<block slot="backText">返回</block>
			<block slot="content">{{categoryName}}</block>
		</cu-custom>


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
