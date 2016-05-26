var bcrypt = require('bcrypt-nodejs');
var Guid = require('Guid');

function User(user) {
    this.username = user.username;
    this.email = user.email || '';
    this.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    this.activationCode = Guid.create();
}

module.exports = User;