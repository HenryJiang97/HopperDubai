import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations.js'
import actions from './actions.js'
import state from './state.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
	actions,
	plugins:[
		createPersistedState({
            storage: {
                getItem: key => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: key => {}
            }
        })  
	]
})

export default store
