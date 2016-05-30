$.validator.addMethod("passRegex", function(value, element) {
    return this.optional( element ) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test( value );
}, "Password's length must be at least 8, 1 lowercase, 1 uppercase and 1 number");