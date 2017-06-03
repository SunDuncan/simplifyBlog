/**
 * @Author: Duncan
 * @Date: 2017-05-04 15:56
 * @Last Modified By:
 * @Last Modified Time:
 * @Function:用户的博客路由模块 
 */

var express = require('express');
var router = express.Router();
var blogService = appRequire('service/blogservice');
var userblogService = appRequire('service/userblogservice');


//获取所有的信息
router.get('/', function (req, res) {
    console.log("进入查询的路由");
    var data = {};
    blogService.queryBlog(data, function (err, results) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                isSuccess: false,
                msg: results
            });
            return;
        }

        if (results !== undefined && results.length != 0) {
            res.status(200);
            res.json({
                status: 200,
                isSuccess: true,
                msg: results
            });
            return;
        }
    });
});

//将博客的内容插入数据库
router.post('/', function (req, res) {
    console.log("进入插入博客的路由");
    var userID = req.body.UserID;
    var content = req.body.content;

    if (userID == null || userID == undefined) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: '用户的ID没有传入'
        })
    }

    if (content == undefined || content.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: '博客的内容没有输入'
        });
    }
    
    var insertData = {
        content: content
    }

    blogService.insertBlog(insertData, function (err, insertResult) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: insertResult
            });
        }

        if (insertResult.insertId != undefined && insertResult.insertId > 0) {
               insertData.BlogID = insertResult.insertId,
               insertData.UserID = userID;
               delete insertResult['content'];

               userblogService.insertInfo(insertData, function(err , insertUserBlogResult) {
                    if (err) {
                        res.status(500);
                        return res.json({
                            status: 500,
                            isSuccess: false,
                            msg: insertUserBlogResult
                        })
                    }

                    if (insertUserBlogResult.insertId != undefined && insertUserBlogResult.insertId > 0) {
                        res.status(200);
                        return res.json({
                            status: 200,
                            isSuccess: true,
                            msg: "发表成功"
                        })
                    }
               });

        }
    });
});

module.exports = router;