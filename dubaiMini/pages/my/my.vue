<template>
	<div class="my">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用户中心</block>
		</cu-custom>

		<div class="main">
			<!-- 个人资料 -->
			<view class="cu-bar bg-white solid-bottom" style="padding: 20upx 0;">
				
				<view class="action"><view class="cu-avatar lg round" :style="'background-image:url(' + wxProfile.avatarUrl + ')'"></view></view>
				
				<div class="name">
					用户名: {{wxProfile.nickName}}
				</div>
				
				<view class="action"></view>
			</view>
			<!-- 个人资料 -->
			

			<!-- 常用菜单 -->
			<view class="cu-list col-1 grid sm-border" >
				<view class="cu-item" @tap="jump('order')">
					<view class="cuIcon-form">
						<view class="cu-tag badge" >
							<block >{{orderCount}}</block>
						</view>
					</view>
					<text>我的订单</text>
				</view>
			</view>	
		</div>
	</div>
	
	
	
</template>

<script>
	import { mapState } from 'vuex'
	import Parse from '../../common/parse.js'
import { get, toLogin, login } from '../../utils';
export default {
	onShow() {
		console.log('开始检查登录情况');
		this.$store.commit('needLogin');
		this.wxProfile = this.$store.state.wxProfile
		this.printOpenId();
		console.log(this.token);
	},
	
	onLoad() {
		this.getOrderCount();
	},
	
	created() {},
	mounted() {},
	
	data() {
		return {
			wxProfile:{},
			iconList: [
				{
					icon: 'favor',
					color: 'green',
					badge: 120,
					name: '我的收藏'
				},
				{
					icon: 'message',
					color: 'green',
					badge: 1,
					name: '我的留言'
				},
				{
					icon: 'pic',
					color: 'green',
					badge: 0,
					name: '我的图片'
				},
				{
					icon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				},
				{
					icon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				},
				{
					icon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				},
				{
					icon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				},
				{
					icon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				},
				{
					icon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				},
				{
					icon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}
			],

			avator: '',
			allcheck: false,
			listData: [],
			Listids: [],
			userInfo: {},
			orderCount: 0,
		};
	},
	components: {},
	methods: {
		printOpenId() {
			console.log('Users openid: ' + this.openid);
		},
		
		getOrderCount() {
			this.orderCount = Object.keys(this.order).length;
		},
		
		

		jump(pageName) {
			uni.navigateTo({
				url: `../${pageName}/${pageName}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
	},
	
	computed: {
		...mapState(['order', 'openid', 'token']),
	},
};


</script>
<style scoped>

.uni-list-cell-navigate img {
	width: 30upx;
	height: 30upx;
}
.uni-list-cell-navigate {
	justify-content: start;
}
</style>
