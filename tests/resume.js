var assert = require('assert');
var service = require('../DAL/services/cv-service');
var resRepo = require('../DAL/repositories/cv-repository');
var eduRepo = require('../DAL/repositories/education-repository');
var expRepo = require('../DAL/repositories/experience-repository');
var cerRepo = require('../DAL/repositories/certification-repository');
var proRepo = require('../DAL/repositories/project-repository');
var skiRepo = require('../DAL/repositories/skill-repository');

describe('Test resume business service', function () {
    it('Insert resume', function testSlash(done) {
        var mockReturnResume = {id: 1};
        var mockInputResume = {id: 1};

        var mockRepo = function () {
            this.create = function (resume, callback) {
                callback(mockReturnResume);
            };
        };

        var ser = new service(new mockRepo(), eduRepo, expRepo, cerRepo, proRepo, skiRepo);
        ser.insertResume(mockInputResume, function (result) {
            console.log(result.id);
            assert.equal(result.id, 1);
            done();
        });
    });
})