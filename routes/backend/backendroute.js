var express = require('express');
var router = express.Router();
var userRoute = appRequire('routes/backend/user/userroute');
var blogRoute = appRequire('routes/backend/blog/blogroute');

router.get('/', function (req, res) {
	res.render('home', { 
		title: '孙茂昀的博客',
		jsList: {
			home: '/js/home.js'
		}
	});
});

router.get('/reg', function (req, res) {
	res.render('register', {
		title: '博客注册',
		jsList: {
			reg: '/js/register.js'
		}
	});
});

router.get('/login', function (req, res) {
	res.render('login', {
		title: '登录',
		jsList: {
			login: '/js/login.js'
		}
	});
});

router.get('/u', function (req, res) {
	res.render('person', {
		title: '发表消息',
		jsList: {
			personblog: '/js/personalpage.js'
		}
	});
});


// router.get('/post', function(req, res) {
//     res.render('person', {title: '发表信息'});
// });

router.get('/logout', function (req, res) {
	res.render('logout', {
		title: 'logout',
		jsList: {
			logout: '/js/logout.js'
		}
	});
});

router.use('/user', userRoute);
router.use('/blog', blogRoute);
module.exports = router;