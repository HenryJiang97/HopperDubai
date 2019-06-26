<template>
	<div class="login" style="display: flex; align-items: center; justify-content: center;">
		
		<view class="padding flex flex-direction margin-top">
			<button open-type="getUserInfo" @getuserinfo="getUserInfo"   class="cu-btn cuIcon-weixin bg-gradual-green margin-tb-sm lg ">
				<text class="margin-left-sm text-white">微信登录</text>
			</button>
			
			
		</view>
			
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import Parse from '../../common/parse.js'
export default {
	created() {},
	mounted() {},
	data() {
		return {};
	},
	onLoad() {
	},
	
	components: {},
	methods: {
		connectMagento(id){
			let that = this;
			
			Parse.Cloud.run('createCustomer',{
				openId: id,
			}).then( r => {
				let token = r[0].token;
				that.$store.commit('setToken', token);
				console.log('r' + JSON.stringify(r));
			}).catch( e => {
				console.log('e' + JSON.stringify(e));
			})
		},
		
		

		getUserInfo(r) {
			function connectMagento(id){
				let that = this;
				
				Parse.Cloud.run('createCustomer',{
					openId: id,
				}).then( r => {
					let token = r[0].token;
					that.$store.commit('setToken', token);
					console.log('r' + JSON.stringify(r));
				}).catch( e => {
					console.log('e' + JSON.stringify(e));
				})
				
				return 1;
			}
			
			
			let that = this;
			console.log(r.mp.detail);
			let wxProfile = r.mp.detail.userInfo; // 等下更新用户信息用
			console.log('拿到用户信息' + JSON.stringify(r.mp.detail.userInfo));
			
			this.$store.commit('setWxProfiles',wxProfile) // 存储用户信息

			let clickLoginRes = r.mp.detail;
			let encryptedData = clickLoginRes.encryptedData;
			let iv = clickLoginRes.iv;

			uni.login({
				success(res) {
					if (res.code) {
						console.log(Parse.Cloud)
						Parse.Cloud.run('GetOpenId', res)
							.then(r => {
								console.log('最终的结果' + JSON.stringify(r));
								console.log('Openid:' + r.openid);
								if (r.openid) {
									that.$store.commit('setOpenId', r.openid);
									that.connectMagento("test123456")
									uni.navigateBack({});
								}
							})
							.catch(e => {
								console.log('报错' + e);
							});
					}
				}
			});
		},

	},
	
	computed:{
		...mapState(['order', 'openid', 'token']),
	},
};
</script>

</style>
