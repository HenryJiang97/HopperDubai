import mutations from './mutations.js'
let Parse = require('../common/parse.js');


const actions = {
	async getHotItems( context ){
		context.state.hotItems = await Parse.Cloud.run('hotItems').then()
	}
}

export default actions
