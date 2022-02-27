
// Class Definition
var KTLogin = function() {
    var _login;

    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';

        _login.removeClass('login-signin-on');

        _login.addClass(cls);

        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }

    var _handleSignInForm = function() {
        var validation;

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_signin_form'),
			{
				fields: {
					username: {
						validators: {
							notEmpty: {
								message: 'Username is required'
							}
						}
					},
					password: {
						validators: {
							notEmpty: {
								message: 'Password is required'
							}
						}
					}
				},
				plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

		//  After submission
        $(document).on('click','#kt_login_signin_submit', function () {
			validation.validate().then(function(status) {
				if (status == 'Valid') {
					apiData = {
						email: $("#username").val(),
						password:$("#password").val()
					}
					Api.post("api/login_user",null, apiData, function (error,res) {
						if(error){
							if(error.status == false){
								var message = error.error.message=="\"email\" must be a valid email" ? "Email must be a Valid Email" : error.error.message
								common.alert("error", "Failed", message, "Try again")
						
							}
						}
						else{
							window.location.href = "/index"
						}
					})
                    
				} else {
					common.alert("error", "Failed", "Please Enter Username or Password")
					// common.toast("error","Please Enter Username or Password")
				}
		    });
        });

        // Handle forgot button
        $('#kt_login_forgot').on('click', function (e) {
            e.preventDefault();
            _showForm('forgot');
        });
    }

    

    // Public Functions
    return {
        // public functions
        init: function() {
            _login = $('#kt_login');

            _handleSignInForm();
        }
    };
}();

// Class Initialization
jQuery(document).ready(function() {

	KTLogin.init();

});
