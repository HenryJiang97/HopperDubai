// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

let adminRouter = require('./router/router.js') // 自定义路由

// let ParseDashboard = require('parse-dashboard'); // 控制面板
// var dashboard = new ParseDashboard({
//   "apps": [
//     {
//       "serverURL": "http://localhost:1337/parse",
//       "appId": "dubai",
//       "masterKey": "dldl349jf4jfidj23ifj34jlgj4igi4g4g",
//       "appName": "dubai"
//     }
//   ]
// });

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dubai',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'dubai',
  masterKey: process.env.MASTER_KEY || 'dldl349jf4jfidj23ifj34jlgj4igi4g4g', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// 使用自己写的路由模块,自定义模块,自定义给后台用
app.use('/admin',adminRouter )
// 控制面板
// app.use('/dashboard', dashboard);

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

let Parse=require('parse/node');//初始化

Parse.initialize("dubai");
//javascriptKey is required only if you have it on server.

Parse.serverURL = 'http://localhost:1337/parse'


// Parse Server plays nicely with the rest of your web routes
// app.get('/', function(req, res) {
//   res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
// });

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
