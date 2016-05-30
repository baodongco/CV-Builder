$(document).ready(function(){   
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