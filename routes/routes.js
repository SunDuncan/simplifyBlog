/**
 * @Author: Duncan
 * @Date: 2017-4-26  19:26
 * @Last Modified by: Duncan
 * @Last Modified Time: 
 * @Funtion: 按项目划分子模块
 */
 
 var backendRoute = appRequire('routes/backend/backendroute');

 module.exports = function (app) {
	 
	 console.log("进入route");
	
	 app.use('/', backendRoute);
	 
 }