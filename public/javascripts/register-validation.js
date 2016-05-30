$(document).ready(function(){
    $.validator.addMethod("passRegex", function(value, element) {
        return this.optional( element ) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test( value );
    }, "Password's length must be at least 8, 1 lowercase, 1 uppercase and 1 number");

    $('#registerForm').validate({
        debug: true,

        rules: {
            email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                passRegex: true
            },

            retype_password: {
                equalTo: "#password"
            }
        },
        
        messages: {
            email: {
                required: "Enter your email.",
                email: "This is not an email address"
            },
            username: {
                required: "Enter your username.",
                minlength: "Length must be at least 3"
            },
            password: {
                required: "Enter your password.",
                pattern: "incorrect"
            },

            retype_password: {
                equalTo: "Don't match with password"
            }
        }
    });
});