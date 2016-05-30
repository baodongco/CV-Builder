$(document).ready(function(){
    $.validator.addMethod("passRegex", function(value, element) {
        return this.optional( element ) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test( value );
    }, "Password's length must be at least 8, 1 lowercase, 1 uppercase and 1 number");

    $('#changePass').validate({
        rules: {
            oldPass: {
                required: true
            },
            newPass: {
                required: true,
                passRegex: true
            },
            confirmPass: {
                equalTo: "#newPass"
            }
        },

        messages: {
            oldPass: {
                required: "Enter your old password."
            },
            newPass: {
                required: "Enter your new password."
            },
            confirmPass: {
                equalTo: "Don't match with new password"
            }
        }
    });
});