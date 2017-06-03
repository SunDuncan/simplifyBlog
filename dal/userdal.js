/**
 * @Author: Duncan
 * @Date: 2017-05-31 14:05
 * @Last Modified Time: 
 * @Last Modified By:
 * @Function: 用户的后端的操作
 */

//数据库的连接池
var db_blog = appRequire('dbs/blogdb');


/**
 * @param username string 
 * @param password string
 * @function 插入用户
 */
exports.insertUser = function (insertUserData, callback) {
    var sql = "insert into user set";

    //用来判断是否是第一个字段
    var judgeFirstColumn = 0;
    for (var key in insertUserData) {
        if (judgeFirstColumn == 0) {            
            sql += " " + key + " = '" + insertUserData[key] + "' ";
            judgeFirstColumn ++; 
           
        } else {
            sql += ",  " + key + " = '" + insertUserData[key] + "' ";
        }
    }

    console.log("用户插入的sql语句：" + sql);
    db_blog.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库连接失败");
            return ;
        }

        connection.release();
        connection.query(sql , function (err, result) {
            if (err) {
                callback(true, '服务器的内部错误（sql)');
                return ;
            }

            callback(false, result);
            return ;
        });
    });
}


/**
 * @param username string
 * @param password string
 * @function 用来验证登录用的 
 */

exports.queryUser = function (username, password, callback) {
    var sql = "select id,username , password from user where username = ? and password = ?";

    db_blog.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            callback(true, '数据库链接失败');
            return ;
        }

        connection.query(sql, [username, password], function (err, result) {
            connection.release();
            if (err) {
                callback(true, '服务器内部错误(sql)');
                return ;
            }

            callback(false, result);
            return;
        });
        
       
    });
}
