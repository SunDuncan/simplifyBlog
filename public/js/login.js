$(document).ready(function () {
    
    $('#login').click(function () {

        $.ajax({
            type: "POST",
            url: '/user/login',
            dataType: 'json',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            success: function (data) {
                if (data.isSuccess) {                   
                    
                    localStorage.setItem('isSuccess', true);
                    localStorage.setItem('user', data.data[0].id);
                    localStorage.setItem('username', data.data[0].username);
                    window.location.href = '/u';
                 }
            },
            error: function (jqXHR) {
               var responseJSON = jqXHR.responseJSON;
				var info =  {
					error: responseJSON.msg
				};
				var template1 = Handlebars.compile($('#isLoginInfo').html());
				$('#container').prepend(template1(info));
            }
        });
    });
}); 