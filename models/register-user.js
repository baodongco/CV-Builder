var bcrypt = require('bcrypt-nodejs');
var Guid = require('guid');

function User(user) {
    this.username = user.username;
    this.email = user.email;
    this.oldPass = user.oldPass;
    this.newPass = bcrypt.hashSync(user.newPass, bcrypt.genSaltSync(8), null);
    this.activationCode = Guid.create();
}

module.exports = User;