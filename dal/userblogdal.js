/**
 * @Author: Duncan,
 * @Date: 2017-05-31
 * @Last Modified Time:
 * @Last Modified By:
 * @function: 用户博客的dal层
 */

var dbBlog = appRequire('dbs/blogdb');

/**
 * 用户博客的插入
 */
exports.insertUserBlog = function (data, callback) {
    var userID = data.UserID;
    var blogID = data.BlogID;

    //插入的sql语句
    var sql = "insert into userblog set UserID = " + userID + " ,BlogID = " + blogID;

    console.log("插入用户博客sql语句：" + sql);

    dbBlog.mysqlPool.getConnection (function (err, connection) {
        if (err) {
            callback(true, '数据库链接失败');
            return ;
        }

        connection.query(sql, function(err, insertResult) {
            connection.release();

            if (err) {
                callback(true, "服务器内部错误(sql)");
                return;           
            }

            callback(false, insertResult);
            return;
        });
    });
}