/**
 * @Author: Duncan
 * @Date: 2017-05-31 14:33
 * @Last Modified Time:
 * @Last Modified By:
 * @Function: 用户的服务模块
 */

//用户的dal层
var userDal = appRequire('dal/userdal');


/**
 *用户的插入service 
 */

exports.insertUser = function(insertData, callback) {
    for (var key in insertData) {
        
        if (insertData[key] == null || insertData[key] == undefined) {
            callback(true, '所传的值不能为空');
            return ;
        }
    }

    userDal.insertUser(insertData, function (err,  results) {
        if (err) {
            callback(true, results);
            return;
        }

        callback(false, results);
        return ;
    });

};

/**
 * 用户的查询验证
 */

exports.queryUser = function(userData, callback) {
    if (!('username' in  userData)) {
        callback(true, '未填用户的姓名');
        return;
    }

    if (!('password' != userData)) {
        callback(true, '未填写密码');
        return ;
    }

    userDal.queryUser(userData.username, userData.password, function(err, results) {
        if (err) {
            callback(true, results);
            return ;
        }

        callback(false, results);
        return ;
    });
}