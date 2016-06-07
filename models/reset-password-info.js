var bcrypt = require('bcrypt-nodejs');

function ResetPasswordInfo(user) {
    this.guid = user.guid;
    this.newPass = user.newPass;
    this.newHasingPass = bcrypt.hashSync(user.newPass, bcrypt.genSaltSync(8), null);
}

module.exports = ResetPasswordInfo;