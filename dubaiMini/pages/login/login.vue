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
		
		loginInwithWechat(res, wxProfile) {
			let that = this;
			
			console.log('拿到后台的返回' + res + wxProfile);
			
			Parse.Cloud.run('getAccessToken').then(r => {
				console.log(r);

				let myAuthData = {
					// 根据具体的类型，决定该字段需要填写哪些参数，比如微信需要填写id（值应当是微信的openid）和access_token
					id: res.openid,
					access_token: r,

				};
				
				let newUser = new Parse.User();
				newUser
					._linkWith('weapp', {
						authData: myAuthData
					})
					.then(function(user) {
						console.log('新用户注册成功' + JSON.stringify(user));
						
						user.set({
							wxProfile: wxProfile
						})
							.save()
							.then(r => {
								console.log('用户信息保存成功' + JSON.stringify(r));
								uni.navigateBack({}) // 回到之前进来的页面
								
								that.connerctMagento() // 同步用户信息到magento

							})
							.catch(e => {
								console.log('保存失败' + e);
							});
					});
			});
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
									that.loginInwithWechat(r, wxProfile);
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
