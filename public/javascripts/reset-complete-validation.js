$(document).ready(function(){   
    $('#resetPassComplete').validate({
        rules: {
            newPass: {
                required: true,
                passRegex: true
            },
            confirmPass: {
                equalTo: "#newPass"
            }
        },

        messages: {
            newPass: {
                required: "Enter your new password."
            },
            confirmPass: {
                equalTo: "Don't match with new password"
            }
        }
    });
});