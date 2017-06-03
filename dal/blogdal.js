/**
 * @Author: Duncan
 * @Date: 2017-05-31 19:56
 * @Last Modified Time: 
 * @Last Modified By:
 * @function: 关于微博的模块
 */

var db_blog = appRequire('dbs/blogdb');

/**
 * @Function 获取到所有的博客的信息
 */
exports.queryAllBlogInfo = function (data, callback) {
    var arr = new Array();
    arr.push("SELECT A.username, C.content from user A left join userblog B on A.id = B.UserID left");
    arr.push("join blog C on B.BlogID = C.id where C.content is not null");

    var sql = arr.join(' ');

    console.log("获取所有的博客的信息的sql语句：" + sql);
    db_blog.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接失败");
            return ;
        }
        
        connection.query(sql, function (err, results) {
            connection.release();
            if (err) {
                callback(true, "数据库的查询出错sql");
                return;
            }

            callback(false, results);
            return;
        });

    });
}

/**
 * @param blogcontent string
 * @function 插入博客
 */

exports.insertblog = function (insertData, callback) {
    var sql = "insert into blog set content = '" + insertData.content + "' ,IsActive = 1";

    console.log("插入微博的时候的sql:" + sql);
    db_blog.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            callback(true, '数据库链接失败');
            return ;
        } 

        connection.query(sql, function (err, results) {
            connection.release();
            if (err) {
                callback(true, "数据库的插入有误(sql)");
                return ;
            }

            callback(false, results);
            return ;
        });
    });
    
}