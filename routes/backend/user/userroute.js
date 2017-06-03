/**
 * @Author: Duncan
 * @Date: 2017-05-04 15:56
 * @Last Modified By:
 * @Last Modified Time:
 * @Function:用户的后端路由模块 
 */


var express = require('express');
var router = express.Router();
var userService = appRequire('service/userservice');


router.post('/', function (req, res) {
    
	var dataRequire = ['username', 'password', 'passwordrepeat'];
	var dataRequire1 = ['用户的姓名', '口令', '重复的口令'];
    var errSend = '未填： ';

	for (var key in dataRequire) {
		if (!(dataRequire[key] in req.body)) {
			errSend += dataRequire1[key] + ' ';
		}
	}

	if (errSend !== '未填： ')
	{
		res.status(400);
		res.json({
			status: 400,
			isSuccess: false,
			msg: errSend
		})
		return;
	}

	var username = req.body.username ? req.body.username : '';
	var password = req.body.password ? req.body.password : '';
	var passwordrepeat = req.body.passwordrepeat ? req.body.passwordrepeat : '';
    
	if (username == undefined || username == '') {
		res.status(400);
		return res.json({
			status: 400,
			isSuccess: false,
			msg: '用户名不能为空'
		});
	}

	if (password == undefined || password == '') {
		res.status(400);
		return res.json({
			status: 400,
			isSuccess: false,
			msg: '口令不能为空'
		});
	}

	if (passwordrepeat == undefined || passwordrepeat == '') {
		res.status(400);
		return res.json({
			status: 400,
			isSuccess: false,
			msg: '重复口令不能为空'
		});
	}

    if (req.body.password !== req.body.passwordrepeat) {
		res.status(400);
		res.json({
			status: 400,
			isSuccess: false,
			msg: '两次输入的口令不相同'
		});
		return;
	}

	var insertData = {
		username: username,
		password: password
	}

	userService.insertUser(insertData, function (err, results) {
		if (err) {
			res.status(500);
			return res.json({
				status: 500,
				isSuccess: false,
				msg: results
			})
		}

		if (results.insertId != 0) {
			res.status(200);
			return res.json({
				status: 200,
				isSuccess: true,
				msg: "注册成功"
			});
		}
	});
});


router.post('/login', function (req, res) {
     var dataRequire = ['username', 'password'];
	 var dataRequire1 = ['用户名', '密码'];
	 var errSend = "未填： ";

	 for (var key in dataRequire) {
		
		 if (!(dataRequire[key] in req.body)) {
			errSend += dataRequire1[key] + ' ';
	    }
	 }

	 if (errSend != "未填： ") {
		 res.status(400);
		 return res.json({
			 status: 400,
			 isSuccess: false,
			 msg: errSend
		 })
	 }

	 var username = req.body.username;
	 var password = req.body.password;

	 if (username == null || username == undefined) {
		 res.status(400);
		 return res.json({
			status: 400, 
			isSuccess: false,
			msg: '填的用户信息不完整'
		 })
	 }
      
	 var userData = {
		 username: username,
		 password: password
	 }

	 userService.queryUser(userData, function (err, results) {
		if (err) {
			res.status(500);
			return res.json({
				status: 500,
				isSuccess: false,
				msg: results
			})
		}

		if (results != undefined && results.length != 0) {

			res.status(200);
			var returnResult = {
				status: 200,
				isSuccess: true,
				msg: '查询匹配成功',
				data: results
			}

			res.json(returnResult);
			return;
		} else {
			res.status(400);
			res.json({
				status: 400,
				isSuccess:  false,
				msg: "无此用户,检查用户名与口令"
			});
			return ;
		}
	 });

});

module.exports = router;
