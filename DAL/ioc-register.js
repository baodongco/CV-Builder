var di = require('di4js');
var UserService = require('../DAL/services/user-service');
var UserRepo = require('../DAL/repositories/user-repository');

var CVService = require('../DAL/services/cv-service');
var resRepo = require('../DAL/repositories/cv-repository');
var eduRepo = require('../DAL/repositories/education-repository');
var expRepo = require('../DAL/repositories/experience-repository');
var cerRepo = require('../DAL/repositories/certification-repository');
var proRepo = require('../DAL/repositories/project-repository');
var skiRepo = require('../DAL/repositories/skill-repository');

function ioc() {
    this.register = function () {
        di.autowired(false).register('userrepo').as(UserRepo);
        di.autowired(false).register('userservice').as(UserService).withConstructor().param().ref('userrepo');

        di.autowired(false).register('resRepo').as(resRepo);
        di.autowired(false).register('eduRepo').as(eduRepo);
        di.autowired(false).register('expRepo').as(expRepo);
        di.autowired(false).register('cerRepo').as(cerRepo);
        di.autowired(false).register('proRepo').as(proRepo);
        di.autowired(false).register('skiRepo').as(skiRepo);
        di.autowired(false).register('cvService').as(CVService).withConstructor()
            .param().ref('resRepo')
            .param().ref('eduRepo')
            .param().ref('expRepo')
            .param().ref('cerRepo')
            .param().ref('proRepo')
            .param().ref('skiRepo');
    }
}

module.exports = new ioc();