var bcrypt = require('bcrypt-nodejs');

function User(user) {
    this.id = user.id;
    this.username = user.username;
    this.oldPass = user.oldPass;
    this.newPass = user.newPass;
    this.newHasingPass = bcrypt.hashSync(user.newPass, bcrypt.genSaltSync(8), null);
}

module.exports = User;