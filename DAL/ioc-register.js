var di = require('di4js');
var UserService = require('../DAL/services/user-service');
var UserRepo = require('../DAL/repositories/user-repository');

function ioc() {
    this.register = function () {
        di.autowired(false).register('userrepo').as(UserRepo);
        di.autowired(false).register('userservice').as(UserService).withConstructor().param().ref('userrepo');
    }
}

module.exports = new ioc();