$(document).ready(function () {
	$('#submit').click(function () {
		$.ajax({
			type: 'POST',
			url: '/user',
			dataType: "json",
			data: {
				username: $('#username').val(),
				password: $('#password').val(),
				passwordrepeat: $('#password_repeat').val()
			},
			success: function (data) {

				if (data.isSuccess) {
					alert("注册成功");

					window.location.href = '/login';
				} else {
					alert(data);
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
		})
	})
});