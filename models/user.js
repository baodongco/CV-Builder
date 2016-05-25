var bcrypt = require('bcrypt-nodejs');

function User(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
}

module.exports = User;