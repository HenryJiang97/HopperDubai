function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}


//-------------------------------------------------------------------------请求的封装

// const host = 'https://cause.wudizu.com/rest/V1';
const host = 'http://hopper.php-dev.in/rest/V1';
// const imgPath = 'https://cause.wudizu.com/pub/media/catalog/product/'
const imgPath = 'http://hopper.php-dev.in/pub/media/catalog/product/'
const itemPath = 'http://hopper.php-dev.in/pub/media/catalog/product/'
// const itemPath = 'https://www.hopperdubai.com/pub/media/catalog/product/'
export {
  host,
	imgPath
}
//请求封装
function request(url, method, data, header = {}) {
  uni.showLoading({
    title: '加载中' //数据请求前loading
  })
  return new Promise((resolve, reject) => {
    uni.request({
      url: host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json' ,// 默认值，
				'Authorization':'Bearer zek2glksyljjumj2zwavuk715e31sgqf'
				
      },
      success: function (res) {
        uni.hideLoading();
        resolve(res.data)
      },
      fail: function (error) {
        uni.hideLoading();
        reject(false)
      },
      complete: function () {
        uni.hideLoading();
      }
    })
  })
}

export function getMagento(url, data) {
  return request(url, 'GET', data)
}
export function postMagento(url, data) {
  return request(url, 'POST', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}

//-------------------------------------------------------------------------请求的封装


//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function toLogin() {
  const userInfo = wx.getStorageSync('userInfo');
  if (!userInfo) {
    wx.navigateTo({
      url: "/pages/login/login"
    });
  } else {
    return true;
  }
}

export function login() {
  const userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    return userInfo;
  }
}

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function getStorageOpenid() {
  const openId = wx.getStorageSync("openId");
  if (openId) {
    return openId;
  } else {
    return ''
  }
}


export function getOpenid() {
  // wx.login({
  //   success: res => {
  //     if (res.code) {
  //       //发起网络请求
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session',
  //         data: {
  //           "appid": "wx601ce71bde7b9add",
  //           "secret": "abed5421d88eb8236e933c6e42d5c14e",
  //           "js_code": res.code,
  //           "grant_type": "authorization_code"
  //         },
  //         success: function (data) {
  //           var openid = data.data.openid;
  //           wx.setStorageSync("openid", openid);
  //         }
  //       })
  //     } else {
  //       console.log('登录失败！' + res.errMsg)
  //     }

  //   },
  //   fail: () => {},
  //   complete: () => {}
  // });
}
