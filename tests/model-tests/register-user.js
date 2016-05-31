var request = require('supertest');
var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');

var registerUser = require('../../models/register-user');

describe('Test register-user model', function () {
    it('Returns correct username, email, activation code and hashing password', function testSlash(done) {
        var testUser = {
            username: 'dienbui',
            password: 'Abc123',
            email: 'dien@gmail.com'
        };

        var model = new registerUser(testUser);
        var isCorrectHashing = bcrypt.compareSync(testUser.password, model.password);

        assert.equal(model.username, testUser.username);
        assert.equal(isCorrectHashing, true);
        assert.equal(model.email, testUser.email);
        assert.equal(model.activationCode.toString().length, 36);

        done();
    });

    it('Returns empty username', function testSlash(done) {
        var testUser = {
            password: 'Abc123',
            email: 'dien@gmail.com'
        };

        var model = new re(testUser);

        assert.equal(model.username, null);

        done();
    });

    it('Returns empty email', function testSlash(done) {
        var testUser = {
            username: 'dienbui',
            password: 'Abc123'
        };

        var model = new re(testUser);

        assert.equal(model.email, null);

        done();
    });
});