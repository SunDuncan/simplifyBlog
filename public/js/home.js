$(document).ready(function () {    
    $.ajax({
        type: 'GET',
        url: '/blog',
        dataType: 'json',
        success: function (data) {
        
            if (data.isSuccess) {
                
                var template = Handlebars.compile($('#personalInfo').html());
                var rowConetnt = $('.row');
                var content = {
                    content: data.msg
                }
                rowConetnt.append(template(content));
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