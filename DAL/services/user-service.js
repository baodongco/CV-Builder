module.exports = function (repo) {
    this.getAllUsers = function (callback) {
        repo.getAll(function (users) {
            callback(users);
        });
    };

    this.checkUserByEmail = function (email, callback) {
        repo.checkExisting('email', email, function (users) {
            callback(users);
        })
    };

    this.checkUserByUsername = function (username, callback) {
        repo.checkExisting('username', username, function (users) {
            callback(users);
        })
    };

    this.addNewUser = function (user, callback) {
        repo.create(user, function () {
            callback();
        })
    };

    this.login = function (username, callback) {
        repo.getWithCondition('username', username, function (users) {
            callback(users);
        })
    };

    this.disableUser = function (id, callback) {
        repo.update('isDisabled', 1, id, function () {
            callback();
        });
    };

    this.enableUser = function (id, callback) {
        repo.update('isDisabled', 0, id, function () {
            callback();
        });
    };

    this.promoteAdmin = function (id, callback) {
        repo.update('role', 'admin', id, function () {
            callback();
        });
    };

    this.demoteAdmin = function (id, callback) {
        repo.update('role', 'user', id, function () {
            callback();
        });
    };

    this.getAllCVOfAUser = function (id, callback) {
        repo.getCVsByUserId(id, function (resumes) {
            callback(resumes);
        })
    };

    this.getActivateUser = function (activationCode, ttl, callback) {
        repo.activate(activationCode, ttl, function (err, rows) {
            callback(err, rows);
        });
    };

    this.postReset = function (email_address, callback) {
        repo.validateReset(email_address, function (err, rows) {
            callback(err, rows);
        });
    };

    this.getResetComplete = function (guid, ttl, callback) {
        repo.resetComplete(guid, ttl, function (err, rows) {
            callback(err, rows);
        });
    };

    this.postResetComplete = function (newHasingPass, guid, callback) {
        repo.resetPassComplete(newHasingPass, guid, function (err, rows) {
            callback(err, rows);
        });
    };

    this.postChangePassword = function (id, callback) {
        repo.changePassword(id, function (err, rows) {
            callback(err, rows);
        });
    };
};