let axios = require('axios') 
let Publish = require('./publish') 
const wechatConfig = require('../wechat-config')
const { getAccessToken } = require('../tools/access-token')
const q = require('../tools/request')

for (x in Publish){
  Parse.Cloud.define(x, Publish[x])
}


Parse.Cloud.define('hello', async req=> {
  return 'Hi';
});


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
});


Parse.Cloud.define('getLocations', async req => {
  return await new Parse.Query('Location').find().then()
});



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

});


Parse.Cloud.define('getAccessToken', async req => {
  return await getAccessToken().then()
});


Parse.Cloud.define('createCustomer', async req => {
  console.log('req' + JSON.stringify(req))

  // 创建一个Magento 账户，unionId 被加盐存起来了
  let unionId = req.params.openId
  console.log(unionId)

  // Get registration status
  if (unionId) {
    let r = await q({
      method: 'post',
      url: '/customerapi/createCustomer',
      data: {
        "param": {
          "firstname": "Shankar",
          "lastname": "Ingale",
          "uniqueId": unionId,
          "password": "123456",
          "type" : "wechat"
        },
      }
    }).then()

    if(!r[0])    console.log("User already exists");
    else    console.log("New user created");

    // Get user token
    let token = await q({
      method: 'post',
      url: '/customerapi/login',
      data: {
        "param": {
          "uniqueId": unionId,
          "password": "123456",
        },
      }
    });

    return token;
  }
});


Parse.Cloud.define('pay', async req => {
  var crypto = require('crypto'); //加载加密文件
  const axios = require('axios');

  // md5
  function md5(data) {
    var md5 = crypto.createHash('md5');
    return md5.update(data).digest('hex');
  }

  // 进行数字签名
  function calculateVerifySign(contents) {
    //1.对参数进行排序，然后用a=1&b=2..的形式拼接
    var sortStr = '';
    for (var key of Object.keys(contents).sort()) {
      sortStr = sortStr + key + '=' + contents[key] + '&';
    }

    //对token进行md5，得到的结果追加到sortStr之后
    var tokenMd5 = md5('5cbfb079f15b150122261c8537086d77a');
    var tempStr = sortStr + tokenMd5;

    console.log('tempStr:', tempStr);

    //对tempStr 在进行一次md5加密得到verifySign
    var verifySign = md5(tempStr);

    console.log('veirfySign:', verifySign);
    return verifySign;
  }

  module.exports = {
    pay: async req => {
      let reqUrl = '/securepay'

      if (reqUrl == '/securepay') {
        let token = '5cbfb079f15b150122261c8537086d77a'
        let nowTime = new Date()
        let randomReference = 'test_' + nowTime.getTime()
        
        let contents = {
          'merchantNo': '200043',
          'storeNo': '300014',
          'currency': 'USD',
          'rmbAmount': '0.1',
          'description': 'testDescription',
          'note': 'testNote',
          'ipnUrl': 'http://nengjtian.s1.natapp.cc/login/test',
          'callbackUrl': 'http://nengjtian.s1.natapp.cc/login/test2?rmbAmount={rmbAmount}',
          'terminal': 'ONLINE',
          'vendor': 'wechatpay',
          'timeout': '120',
          'reference': randomReference   //商户支付流水号，要求不能重复
        }

        //计算数字签名
        var verifySign = calculateVerifySign(contents);

        //把数字签名加到请求参数中 
        contents.verifySign = verifySign;
        
        
        //发送http post 请求到yuansfer
        var opt = {
            host: 'mapi.yuansfer.yunkeguan.com',
            port: '80',
            path: '/appTransaction/v2/securepay', //斜杠开头
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, //设置content-type 头部
        }

        return await axios({
                
        })
      }
    }
  }

  return "Payment success";
});
