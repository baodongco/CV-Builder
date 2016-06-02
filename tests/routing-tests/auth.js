var request = require('supertest');
var server = require('../../app');
var assert = require('assert');

describe('Test auth routes', function () {
    it('Get /login', function testSlash(done) {
        request(server)
            .get('/login')
            .expect(200, done);
    });

    it('Get /login', function testSlash(done) {
        request(server)
            .get('/login')
            .expect(200, done);
    });

    it('Get /register', function testSlash(done) {
        request(server)
            .get('/register')
            .expect(200, done);
    });

    it('Found /change_password when not logged in', function testSlash(done) {
        request(server)
            .get('/change_password')
            .expect(302, done);
    });

    it('Found /activate when not logged in', function testSlash(done) {
        request(server)
            .get('/activate')
            .expect(302, done);
    });

    it('Found /reset when not logged in', function testSlash(done) {
        request(server)
            .get('/reset')
            .expect(200, done);
    });
});