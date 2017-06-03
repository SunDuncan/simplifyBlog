$(document).ready(function () {
    localStorage.removeItem('isSuccess');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    var template1 = Handlebars.compile($('#isLoginInfo').html());

    var info = {};
    info.success = "登出成功";

    $('#container').prepend(template1(info));
    window.location.href = '/';
});