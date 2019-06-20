Parse.Cloud.define('GetOpenId', async request => {

  console.log(request.params)
  let p = request.params
  let appId = wechatConfig.WechatAppID
  let secret = wechatConfig.WechatAppSecret

  let params = {
      //小程序唯一标识
      appid: appId,//小程序的 app secret
      secret: secret,
      grant_type: 'authorization_code',
      js_code: p.code
  }
  console.log('params' + JSON.stringify(params) )
  
  let { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params : params
  }).then()

  return data

})

Parse.Cloud.define('getAccessToken', async req => {
  return await getAccessToken().then()
})

Parse.Cloud.define('printf', async req => {
  return 'test'
})