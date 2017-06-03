/**
 * @Author: Duncan
 * @Date: 2017-05-31 13:32
 * @Last Modified by:
 * @Last Modified Time:
 */

var mysql = require('mysql');
var config = appRequire('config/config');

var dbBlogPool = mysql.createPool(config.mysql);

exports.mysqlPool = dbBlogPool;