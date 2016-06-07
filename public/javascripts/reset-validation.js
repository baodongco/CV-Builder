$(document).ready(function(){
    $('#resetForm').validate({
        rules: {           
            email: {
                required: true,
                email: true                
            }
        },
        
        messages: {
            email: {
                required: "Enter your email.",
                email: "Invalid format email address."                
            }
        }
    });
});