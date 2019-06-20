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
import Parse from '../../common/parse.js'
export default {
	created() {},
	mounted() {},
	data() {
		return {};
	},
	components: {},
	methods: {
		
		printf() {
			console.log(Parse.Cloud.run('printf'));
		},
		
		connerctMagento(){
			Parse.Cloud.run('createCustomer').then( r => {
				console.log('r' + JSON.stringify(r));
			}).catch( e => {
				console.log('e' + JSON.stringify(e));
			})
		},
		

		getUserInfo(r) {
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
								console.log(r.openid, 6666666666)
								if (r.openid) {
									//  邮箱就是 openid@qq.com
									// 密码就是
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
	
};
</script>

</style>
