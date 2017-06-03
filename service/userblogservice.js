/**
 * @Author: Duncan
 * @Date: 2017-05-31 23:34
 * @Last Modified Time:
 * @Last Modified By:
 * @function: 用户博客模块
 */
//dal层
var userblogDal = appRequire('dal/userblogdal');
//用户博客的插入的service层

exports.insertInfo = function (data, callback) {
    if (data.UserID == undefined || data.UserID == null)
    {
        callback(true, '用户的ID没有输入');
        return;
    }

    if (data.BlogID == undefined || data.BlogID == null) {
        callback(true, '博客的ID没有输入');
        return;
    }

    userblogDal.insertUserBlog(data, function (err, results){
        if (err) {
            callback(true, results);
            return;
        }

        callback(false, results);
        return;
    });

}