/**
 * @Author: Duncan
 * @Date: 2017-05-31 20:37
 * @Last Modified Time: 
 * @Last Modified By:
 * @Function: 博客的业务层
 */

//从dal层来获取数据
var blogDal = appRequire('dal/blogdal');

exports.queryBlog = function (data, callback) {
    blogDal.queryAllBlogInfo(data, function (err, results) {
        if (err) {
            callback(true, results);
            return ;
        }

        callback(false, results);
        return;
    });
}

//插入博客dal层
exports.insertBlog = function (data, callback) {
    if (data.content == null || data.content == undefined)
    {
        callback(true, '内容不能为空');
        return;
    }

    blogDal.insertblog (data, function (err, results) {
        if (err) {
            callback(true, results);
            return ;
        }

        callback(false, results);
        return ;
    });
}