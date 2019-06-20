import state from './state.js'
const mutations = {

	needLogin(state) {
		if (!!state.wxProfile.nickName) { // 但是如果userinfo 有，还要检查 session
			uni.checkSession({
				success(r) {
					console.log('登录状态还在' + JSON.stringify(r));
				},
				fail(e) {
					console.log('登录失效' + JSON.stringify(e));
					uni.navigateTo({
						url: '../login/login'
					})
				}
			})

		} else {
			uni.navigateTo({
				url: '../login/login'
			})
			
		}


	},

	setWxProfiles(state, wxProfiles) { // 同步用户的微信信息
		state.wxProfile = wxProfiles
		
	},
	
	addToCart(state, x){
		if (state.cart[x.pkg] != null) {
			console.log("In the cart")
			state.cart[x.pkg].quantity += x.quantity;
		}
		else {
			console.log("New added")
			state.cart[x.pkg] = {
				detail: x.product,
				quantity: x.quantity,
				pkg: x.pkg,
				pkgName : x.pkgName,
				price : x.price,
			};
		}
	},
	
	deleteFromCart(state, pkg) {
		// console.log(pkg);
		delete state.cart[pkg];
	},

	updateCart(state, x) {	
		var quant = state.cart[x.pkg].quantity;
		
		if (quant + x.changes >= 1) {
			quant += x.changes;
		}
		
		state.cart[x.pkg].quantity = quant;
	},




	setLang(state, v) {
		state.language = v

		if (v === 1) {
			uni.setTabBarItem({
				index: 0,
				text: 'Home',
				iconPath: './static/img/home.png',
				selectedIconPath: './static/img/home1.png'
			})
			uni.setTabBarItem({
				index: 1,
				text: 'Events',
				iconPath: './static/img/hot1.png',
				selectedIconPath: './static/img/hot.png'
			})
			uni.setTabBarItem({
				index: 2,
				text: 'User Center',
				iconPath: './static/img/settings.png',
				selectedIconPath: './static/img/settings1.png'
			})
		} else {
			uni.setTabBarItem({
				index: 0,
				text: '首页',
				iconPath: './static/img/home.png',
				selectedIconPath: './static/img/home1.png'
			})
			uni.setTabBarItem({
				index: 1,
				text: '活动',
				iconPath: './static/img/hot1.png',
				selectedIconPath: './static/img/hot.png'
			})
			uni.setTabBarItem({
				index: 2,
				text: '用户中心',
				iconPath: './static/img/settings.png',
				selectedIconPath: './static/img/settings1.png'
			})
		}
	},

	setNotice(state, v) {
		state.globalNotice = v
	},

	setUncomingCorner(state, v) {
		state.uncomingCorner = v
	},

	addOnlineUser(state, v) {
		if (state.onlineUser.toString().indexOf(v) === -1) {
			state.onlineUser.push(v)
		}
	},

	reduceOnlineUser(state, v) {

		Array.prototype.indexOf = function(val) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] == val) return i;
			}
			return -1;
		};

		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
				this.splice(index, 1);
			}
		};

		state.onlineUser.remove(v)
	},
	setOpenId(state, openId) {
		state.openId = openId
	}



}

export default mutations
