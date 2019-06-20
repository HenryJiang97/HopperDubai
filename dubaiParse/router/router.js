let express = require('express')
let router = express.Router()
var Parse = require('parse/node');

router.use( function timelog(req, res, next){
	console.log( 'Time:' , Date.now())
	next()
})

router.get('/', function(req, res){
	res.send('haha')
})

module.exports = router