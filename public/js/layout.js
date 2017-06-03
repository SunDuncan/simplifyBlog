 $(document).ready(function() {
    var isActive = localStorage.getItem('isSuccess');
    var isError = localStorage.getItem('error');
    var data = {}
    if (isActive != null) {
        data.isLogin = isActive
    }

    var template = Handlebars.compile($('#isLoginNav').html());
    var nav = $('.nav');
    nav.append(template(data));

 })
 