require("./global_bootstrap");

var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var config = appRequire('config/config');
var bodyParser = require('body-parser');
var registerHelper = appRequire('util/registerhelper');
var routes = appRequire('routes/routes');

//避免dot-hell
global.appRequire = function (path) {
	return require(path.resolve(__dirname, path));
}

registerHelper(hbs);

//制定模板文件的后缀名为hbs
app.set('view engine', 'hbs');
//设置views文件夹
app.set('views', path.join(__dirname, 'views'));

//运行hbs模板
app.engine('hbs', hbs.__express);

//制定静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

//加载body-parser模块
app.use(bodyParser());

app.use(bodyParser.json());

//加载urlencoded请求体的中间件
app.use(bodyParser.urlencoded({
	extended: true
}));

//设置头文件
app.all('/*', function (req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

//设置一个局部的模板
hbs.registerPartials(__dirname + '/views/partials');

routes(app);

var http = require('http');
http.createServer(app).listen(config.port, function () {
	console.log("the Express server is running on " + config.port);
});


module.exports = app;