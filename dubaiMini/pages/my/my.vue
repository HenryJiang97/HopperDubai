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
					{{wxProfile.nickName}}
				</div>
				
				<view class="action"><button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">个人资料</button></view>
			</view>
			<!-- 个人资料 -->
			
					<button type="primary" @click="connectMagento()">注册到magento</button>

			<!-- 常用菜单 -->
			<view class="cu-list col-1 grid sm-border" >
				<!-- <view class="cu-item" @tap="jump('save')">
					<view class="cuIcon-like">
						<view class="cu-tag badge" >
							<block >11</block>
						</view>
					</view>
					<text>我的收藏</text>
				</view> -->
				<view class="cu-item" @tap="jump('order')">
					<view class="cuIcon-form">
						<view class="cu-tag badge" >
							<block >11</block>
						</view>
					</view>
					<text>我的订单</text>
				</view>
				<!-- <view class="cu-item" @tap="jump('address')">
					<view class="cuIcon-addressbook">
						<view class="cu-tag badge" >
							<block >11</block>
						</view>
					</view>
					<text>我的地址</text>
				</view> -->
			</view>
			
			<!-- 常用菜单 -->
			
			<!-- 列表菜单 -->		
				<!-- <view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				
			
				<view class="cu-item arrow" @tap="moneyhistory">
					<view class="content">
						<text class="cuIcon-moneybag "></text>
						<text class="text-black">账户余额</text>
					</view>
					<view class="action">
						
						<text class="text-black text-bold">¥ 997.00</text>
					</view>
				</view>
				
				<view class="cu-item arrow" >
					<navigator class="content" hover-class="none" open-type="redirect" url="">
						<text class="cuIcon-like text-black"></text>
						<text class="text-grey">我喜欢的</text>
					</navigator>
				</view>
				
				<view class="cu-item arrow" >
					<navigator class="content" hover-class="none" open-type="redirect">
						<text class="cuIcon-discover text-black"></text>
						<text class="text-grey">我不喜欢的</text>
					</navigator>
				</view>
				
				<view class="cu-item" :class="menuArrow?'arrow':''" tap= "jump('timeline')">
					<view class="content">
						<text class="cuIcon-emojiflashfill text-black"></text>
						<text class="text-grey">好友动态</text>
					</view>
					<view class="action">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
						</view>
						<text class="text-grey text-sm">4 人</text>
					</view>
				</view>
				
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="cuIcon-activityfill text-black"></text>
						<text class="text-grey">{{i18n.switchLanguage}}</text>
					</view>
					<view class="action">
						<switch checked @change="changeLanguage" />
					</view>
				</view> -->
		
				
				
			</view>

			
			<!-- 列表菜单 -->			
		</div>

	

		

		
	</div>
	
	
	
</template>

<script>
	import Parse from '../../common/parse.js'
import { get, toLogin, login } from '../../utils';
export default {
	onShow() {
		console.log('开始检查登录情况');
		this.$store.commit('needLogin');
		this.wxProfile = this.$store.state.wxProfile
	},
	onLoad() {
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
			userInfo: {}
		};
	},
	components: {},
	methods: {
		connectMagento(){
			// this.$http({
			// 	url: '/restful/customers',
			// 	method: 'POST',
			// 	data: {
			// 		id: this.$store.state.openId
			// 	},
			// 	success: res => {
			// 		console.log(res)
			// 	},
			// 	fail: () => {},
			// 	complete: () => {}
			// });
			let Uid = Parse.User.current().toJSON().authData.weapp.id
			Parse.Cloud.run('customers',{id: Uid})
			.then( r => console.log('r' + JSON.stringify(r)))
			.catch( e => console.log('e' + JSON.stringify(e)))
		}
		,
		jump(pageName) {
			uni.navigateTo({
				url: `../${pageName}/${pageName}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		changeLanguage(e) {
			console.log('修改语言' + e.target.value);
			if (e.target.value) {
				this.$i18n.locale = 'zh-CN';
			} else {
				this.$i18n.locale = 'en-US';
			}
		},
		
		
	},
	computed: {}
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
