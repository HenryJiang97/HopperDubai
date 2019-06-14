<template>
  <div class="category">
    <div class="search" @click="tosearch">
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索,共239款好物</span>
      </div>

    </div>
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" @click="selectitem(item.id,index)" v-for="(item, index) in listData" :class="[index==nowIndex?'active':'']" :key="index">
          {{item.name}}
        </div>
      </scroll-view>
			
      <scroll-view class="right" scroll-y="true">
				
     <!--   <div class="banner">
          <img :src="detailData.banner_url" alt="">
        </div>
        <div class="title">
          <span>—</span>
          <span>{{detailData.name}}分类</span>
          <span>—</span>
        </div> -->
				
				
        <div class="bottom">
          <div @click="categoryList(item.id)" v-for="(item,index) in detailData.children_data" :key="index" class="item">
            <img :src="item.wap_banner_url" alt="">
            <span>{{item.name}}</span>
          </div>
        </div>
				
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { getMagento ,imgPath} from "../../utils";
import fakeCategories from '../../fakedata/categories.js'
export default {
  created() {},
  mounted() {
    //获取列表数据
    this.getListData();
    //获取默认右侧数据
    // this.selectitem(this.id, this.nowIndex);
  },
  data() {
    return {
      id: "1005000",
      nowIndex: 0,
      listData: [],
      detailData: {}
    };
  },
  components: {},
  methods: {
    tosearch() {
      wx.navigateTo({ url: "/pages/search/search" });
    },
    async selectitem(id, index) {
			console.log('点击的主菜单' + JSON.stringify(id, index));
      this.nowIndex = index; // 这是把当前浏览的大分类标红
      this.detailData = this.listData.filter( x => x.id === id )[0] // 过滤出当前点击的那个子分类
    },
    async getListData() { // 拿到分类列表
		
		 this.listData = fakeCategories
      // const data = await getMagento("/categories"); // 拿到全部分类信息
      // this.listData = data.children_data; // 拿到啦
			// console.log(this.listData);
    },
    categoryList(id) { // 去列表页
			
      wx.navigateTo({
        url: "../categorylist/categorylist?id=" + id
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
