var di = require('di4js');
var UserService = require('../DAL/services/user-service');
var UserRepo = require('../DAL/repositories/user-repository');

var CVService = require('../DAL/services/cv-service');
var resRepo = require('../DAL/reositories/cv-repository');
var eduRepo = require('../DAL/reositories/education-repository');
var expRepo = require('../DAL/reositories/experience-repository');
var cerRepo = require('../DAL/reositories/certification-repository');
var proRepo = require('../DAL/reositories/project-repository');
var skiRepo = require('../DAL/reositories/skill-repository');

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
        												.param().ref('cvrepo')
        												.param().ref('eduRepo')
        												.param().ref('expRepo')
        												.param().ref('cerRepo')
        												.param().ref('proRepo')
        												.param().ref('skiRepo');
    }
}

module.exports = new ioc();