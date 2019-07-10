let axios = require('axios') 
let Publish = require('./publish') 
const wechatConfig = require('../wechat-config')
const { getAccessToken } = require('../tools/access-token')
const q = require('../tools/request')
let jsontoxml = require('jsontoxml')
let xmltojson = require('xml-js');
const uuid = require('uuid/v4');


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

  let tk = req.params.token;    // Consumer's token
  let oId = req.params.orderId;    // Order id
  let openId = req.params.openId;    // User openid
  let totalFee = req.params.totalOrderFee;    // Total order fee

  // md5 function
  function md5(data) {
    var md5 = crypto.createHash('md5');
    return md5.update(data).digest('hex');
  }

  // 进行数字签名
  function calculateVerifySign(contents) {
    //1.对参数进行排序，然后用a=1&b=2..的形式拼接
    var string1 = '';

    let orderedParams = [];
    Object.keys(contents).sort().forEach(key => {
      orderedParams[key] = contents[key]
    })

    console.log(orderedParams);

    let ary = [];
    for (let i in orderedParams) {    
      if (orderedParams[i] != '') {
        ary.push(i + '=' + orderedParams[i]);
      }
    }

    let final = ary.join('&');
    console.log('最终' + JSON.stringify(final))

    // sign = Md5(原字串&key=商戶密鑰). toUpperCase
    let password = '51e3356e92070df89807eb816f0d2b26';
    console.log("Final: ", final + '&' + 'key=' + password);
    var sign = md5(final + '&' + 'key=' + password).toUpperCase();

    console.log("sign: ", sign);
    return sign;
  }

  async function init_payment() {
    var init_returns = {};

    // Generate a random 32-bit uuid
    var random = uuid().replace(/-/g, '');

    // Generate initialization contents
    let init_contents = {
      'service': 'pay.weixin.jspay',
      'mch_id': '131570000084',
      'is_raw' : '1',
      'out_trade_no': oId,
      'body': 'TestPay',    // Products description
      'sub_openid': openId,    // Empty when testing
      'sub_appid': 'wxfe068fc57f348293',
      'total_fee': '2',
      'mch_create_ip': '127.0.0.1',    // 訂單生成的機器 IP
      'notify_url': 'www.baidu.com',    // 接收平臺通知的URL
      'nonce_str': random,    // 隨機字串，不長於 32 位
    };

    console.log("Origin XML: ", "<xml>" + jsontoxml(init_contents) + "</xml>");

    //计算数字签名
    var verifySign = calculateVerifySign(init_contents);

    //把数字签名加到请求参数中 
    init_contents.sign = verifySign;

    let init_contents_xml = "<xml>" + jsontoxml(init_contents) + "</xml>";
    console.log("XML:");
    console.log(init_contents_xml);

    try {
      //发送http post 请求, 获取返回参数
      let r = await axios.post('https://gateway.wepayez.com/pay/gateway', init_contents_xml).then();

      console.log("success!!!");
      console.log(r.data);

      // Convert xml data to json object
      var options = {compact: true}
      let init_result = xmltojson.xml2js(r.data, options).xml;

      let pay_info = JSON.parse(init_result.pay_info._cdata)
      // console.log("Pay info: ", pay_info);

      return pay_info;

    } catch(error) {
      return {'code' : -1, 'message' : error};
    }
  }

  let pay_info = await init_payment();


  return pay_info;
});
