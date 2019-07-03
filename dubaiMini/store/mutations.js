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
	
	addToCart(state, x){    // Add products to cart
		if (state.cart[x.pkg + x.optionId + x.checkinDate] != null) {
			console.log("In the cart")
			state.cart[x.pkg + x.optionId + x.checkinDate].quantity += x.quantity;
		}
		else {
			console.log("New added")
			state.cart[x.pkg + x.optionId + x.checkinDate] = {
				detail: x.product,
				quantity: x.quantity,
				pkg: x.pkg,
				pkgName : x.pkgName,
				option: x.optionId,
				optionTitle: x.optionTitle,
				price : x.price,
				pic : x.pic,
				checkinDate : x.checkinDate,
			};
		}
		// console.log("cart: ");
		// console.log(state.cart);
	},
	
	
	deleteFromCart(state, x) {    // Delete products in cart
		console.log(state.cart);
		delete state.cart[x.pkg + x.option + x.checkinDate];
	},

	updateCart(state, update) {	   // Update the quantity of products in cart
		var quant = state.cart[update.x.pkg + update.x.option + update.x.checkinDate].quantity;
		
		if (quant + update.changes >= 1) {
			quant += update.changes;
		}
		
		state.cart[update.x.pkg + update.x.option + update.x.checkinDate].quantity = quant;
		console.log(state.cart);
	},
	
	setCartId(state, id) {    // Set cart id in state
		state.cartId = id;
	},
	

	addToOrder(state, orderId) {    // Add cart existing to order
		state.ifPaid[orderId] = false;
	
		var new_obj = Object.assign({}, state.cart);  // Deep copy
		
		state.order[orderId] = new_obj;
		
		console.log("Order: ");
		console.log(state.order);
	},
	
		
	emptyCart(state) {    // Empty the cart
		for (var key in state.cart) {
			delete state.cart[key];
		}
	},

// 	setLang(state, v) {
// 		state.language = v
// 
// 		if (v === 1) {
// 			uni.setTabBarItem({
// 				index: 0,
// 				text: 'Home',
// 				iconPath: './static/img/home.png',
// 				selectedIconPath: './static/img/home1.png'
// 			})
// 			uni.setTabBarItem({
// 				index: 1,
// 				text: 'Events',
// 				iconPath: './static/img/hot1.png',
// 				selectedIconPath: './static/img/hot.png'
// 			})
// 			uni.setTabBarItem({
// 				index: 2,
// 				text: 'User Center',
// 				iconPath: './static/img/settings.png',
// 				selectedIconPath: './static/img/settings1.png'
// 			})
// 		} else {
// 			uni.setTabBarItem({
// 				index: 0,
// 				text: '首页',
// 				iconPath: './static/img/home.png',
// 				selectedIconPath: './static/img/home1.png'
// 			})
// 			uni.setTabBarItem({
// 				index: 1,
// 				text: '活动',
// 				iconPath: './static/img/hot1.png',
// 				selectedIconPath: './static/img/hot.png'
// 			})
// 			uni.setTabBarItem({
// 				index: 2,
// 				text: '用户中心',
// 				iconPath: './static/img/settings.png',
// 				selectedIconPath: './static/img/settings1.png'
// 			})
// 		}
// 	},

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
	
	setOpenId(state, openid) {
		state.openid = openid
	},
	
	setToken(state, token) {
		state.token = token
	}



}

export default mutations
