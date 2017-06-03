var path = require('path');
var config = {
	app_name: 'Duncan',
	app_description: '孙茂昀的个人博客',
	app_keywords: 'Duncan',
	app_version: '0.1.0',
	cookieSecret: '',
	jwt_secret: 'duncan',
	jsdev: false,
	port: 3000,
	host: 'localhost',
	mysql: {
		host: '127.0.0.1',
		user: 'root',
		password: '123456',
		database: 'blog',
		connectionLimit: 100,
		supportBigNumbers: true
	},
	pageCount: '',//分页时每一页要显示的数据量
	
	//邮箱的配置
	mail_opts: {
		
	}
}

module.exports = config;