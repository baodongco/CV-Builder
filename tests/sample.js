var assert = require('assert');

var service = require('../DAL/services/user-service');
var repo = require('../DAL/repositories/user-repository');

describe('Test user business service', function () {
    it('Return all users', function testSlash(done) {
        var mockReturnUsers = [{id: 1, username: 'dienbui'}];

        var mockRepo = function () {
            this.getAll = function (callback) { callback(mockReturnUsers); }
        };

        var ser = new service(new mockRepo());

        ser.getAllUsers(function (u) {
            assert.equal(u.length, mockReturnUsers.length);
            done();
        });
    });

    it('Check user by username returns a matching user', function testSlash(done) {
        var mockReturnUsers = [{id: 3, username: 'dienbui'}];
        var mockRepo = function () {
            this.checkExisting = function (columnName, value, callback) { callback(mockReturnUsers); }
        };

        var ser = new service(new mockRepo());

        ser.checkUserByUsername('dienbui', function (u) {
            assert.equal(u[0].username, mockReturnUsers[0].username);
            done();
        });
    });

    it('Check user by username returns no matching user', function testSlash(done) {
        var mockReturnUsers = [{}];
        var mockInputUsername = 'abc';
        var mockRepo = function () {
            this.checkExisting = function (columnName, value, callback) { callback(mockReturnUsers); }
        };

        var ser = new service(new mockRepo());

        ser.checkUserByUsername(mockInputUsername, function (u) {
            assert.equal(u[0].username, null);
            done();
        });
    });

    it('Check user by email returns a matching user', function testSlash(done) {
        var mockReturnUsers = [{id: 3, email: 'dien@gmail.com'}];
        var mockRepo = function () {
            this.checkExisting = function (columnName, value, callback) { callback(mockReturnUsers); }
        };

        var ser = new service(new mockRepo());

        ser.checkUserByEmail('dien@gmail.com', function (u) {
            assert.equal(u[0].email, mockReturnUsers[0].email);
            done();
        });
    });

    it('Check user by email returns no matching user', function testSlash(done) {
        var mockReturnUsers = [{}];
        var mockInputEmail = 'undefined@gmail.com';
        var mockRepo = function () {
            this.checkExisting = function (columnName, value, callback) { callback(mockReturnUsers); }
        };

        var ser = new service(new mockRepo());

        ser.checkUserByEmail(mockInputEmail, function (u) {
            assert.equal(u[0].email, null);
            done();
        });
    });

    it('Successful login', function testSlash(done) {
        var mockReturnUsers = [{id: 3, username: 'admin'}];
        var mockRepo = function () {
            this.getWithCondition = function (columnName, value, callback) { callback(mockReturnUsers); }
        };

        var ser = new service(new mockRepo());

        ser.login(mockReturnUsers[0].username, function (u) {
            assert.equal(u[0].username, mockReturnUsers[0].username);
            done();
        });
    });

    it('Unsuccessful login', function testSlash(done) {
        var mockReturnUsers = [{}];
        var mockInputUsername = 'abc';
        var mockRepo = function () {
            this.getWithCondition = function (columnName, value, callback) { callback(mockReturnUsers); }
        };

        var ser = new service(new mockRepo());

        ser.login(mockInputUsername, function (u) {
            assert.equal(u[0].username, null);
            done();
        });
    });
});