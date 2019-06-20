let express = require('express')
let router = express.Router()
const youzanyun = require('youzanyun-sdk');
let {getToken} = require('../tool/youzanToken')


router.use(function timelog(req, res, next) {
    // console.log('请求API', Date.now())
    next()
})

router.get('/', (req, res) => {
    console.log('youzanToken' + JSON.stringify(getToken()) )
})



module.exports = router