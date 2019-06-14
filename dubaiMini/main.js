import Vue from 'vue'
import App from './App'
import $http from './utils/request.js'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom) // 使用封装的导航栏

const Parse = require('./common/parse.js')
Parse.initialize("Cause");
Parse.serverURL = 'http://localhost:1337/parse'

import i18n from './i18n.js'

Vue.prototype._i18n = i18n

//全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
import MyPlugin from './minxins'
Vue.use(MyPlugin)

//引入store
import store from './store/index'
//把store挂载到全局
Vue.prototype.$store = store;
Vue.prototype.$http = $http;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})

app.$mount()

export default {
	// 这个字段走 app.json

}
