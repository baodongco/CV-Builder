var di = require('di4js');
var UserService = require('../DAL/services/user-service');
var UserRepo = require('../DAL/repositories/user-repository');

var CVService = require('../DAL/services/cv-service');
var CVRepo = require('../DAL/repositories/cv-repository');

function ioc() {
    this.register = function () {
        di.autowired(false).register('userrepo').as(UserRepo);
        di.autowired(false).register('userservice').as(UserService).withConstructor().param().ref('userrepo');

        // di.autowired(false).register('cvrepo').as(CVRepo);
        // di.autowired(false).register('cvservice').as(CVService).withConstructor().param().ref('cvrepo');
    }
}

module.exports = new ioc();