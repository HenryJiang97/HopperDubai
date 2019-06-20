<script>
import Vue from 'vue'
export default {
	name: 'App',
	
	provide () {
    return {
      reload: this.reload
    }
  },
	
	data () {
    return {
      isRouterAlive: true
    }
  },
 
	methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
	
	onLaunch() {
			uni.getSystemInfo({
			// 导航栏系统
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif
				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});
	},
	
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
   
   
    console.log("app created and cache logs by setStorageSync");
    //获取openid

    // if (!wx.getStorageSync('openid')) {
    //   getOpenid();
    // }
  }
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import url("./common/css/uni.css");

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

page {
  background: #f4f4f4;
  height: 100%;
}

button {
  background: none;
  padding: 0;
  font-weight: normal;
  font-size: 32rpx;
  box-sizing: content-box;
}
button::after {
  border: 0;
}

view,
text {
  font-size: 28rpx;
  color: #333;
}

.wxParse .p {
  margin: 0 !important;
}

.wxParse .img {
  display: block !important;
}

/* this rule will be remove */

/* * {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
} */
</style>
