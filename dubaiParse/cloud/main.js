let axios = require('axios') 
let Publish = require('./publish') 
const wechatConfig = require('../wechat-config')
const { getAccessToken } = require('../tools/access-token')

for (x in Publish){
  Parse.Cloud.define(x, Publish[x])
}


Parse.Cloud.define('hello', function(req, res) {
  return 'Hi';
});

Parse.Cloud.define('addReview', async req => {
  
  let Review = Parse.Object.extend('Review')
  
  let review = new Review()
  
  let r = await review.set( req.params ).save().then()

  return r
});

Parse.Cloud.define('getReview', async req => {
  console.log(req)
  let p = req.params
  
  let r = await new Parse.Query('Review').equalTo('desc', '真的吗')

  return r.map( x => x._toFullJSON() )

});


Parse.Cloud.define('addMyPost', async req => {
  
  let MyPost = Parse.Object.extend('MyPost')
  
  let mypost = new MyPost()
  
  let r = await mypost.set( req.params ).save().then()
  console.log(r)
  return r
});

Parse.Cloud.define('addLine', async req => {//增加路线表
  let Line = Parse.Object.extend('Line')
  let line = new Line()
  return await line.set(req.params).save().then()
})

Parse.Cloud.define('addComment',async req=>{//增加Comment表
  let Comment=Parse.Object.extend('Comment')
  let comment=new Comment();
  let p = req.params
  // let targetPointer = Parse.Object.extend(p.targetName).createWithoutData(p.targetId)  // 创造普通的pointer
  // let userPointer = Parse.User.createWithoutData(req.user.id) // 拿到用户Pointer
  console.log(p.commentId)
  p.commentId=p.commentId =='undefined'? '' : p.commentId
  let r = await comment.set({
    // 'user': userPointer,
    'targetId':p.targetId,
    'targetName':p.targetName,
    // [p.targetName]: targetPointer, // 键值为 target Name
    'desc': p.desc,
    'isFather': !!p.commentId ? false : true,
    'commentId':p.commentId,
//     // 'title': p.title || '',
    'comment': !!p.commentId ? Parse.Object.extend('Comment').createWithoutData(p.commentId): undefined

}).save()
  // return await comment.set(req.params).save().then()
  return r
})
// Parse.Cloud.define('getComment',async req=>{
//   let p = req.params
// }

// )




Parse.Cloud.define('getLocations', async req => {
  return await new Parse.Query('Location').find().then()
})



Parse.Cloud.define('GetOpenId', async request => {
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

