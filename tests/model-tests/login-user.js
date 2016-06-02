var request = require('supertest');
var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');

var loginUser = require('../../models/login-user');

describe('Test login-user model', function () {
    it('Returns correct username and password', function testSlash(done) {
        var testUser = {
            username: 'dienbui',
            password: 'Abc123'
        };

        var model = new loginUser(testUser);

        assert.equal(model.username, testUser.username);
        assert.equal(model.password, testUser.password);

        done();
    });

    it('Returns empty username', function testSlash(done) {
        var testUser = {
            password: 'Abc123'
        };

        var model = new loginUser(testUser);

        assert.equal(model.username, null);

        done();
    });

    it('Returns empty password', function testSlash(done) {
        var testUser = {
            username: 'dienbui'
        };

        var model = new loginUser(testUser);

        assert.equal(model.password, null);

        done();
    });
});