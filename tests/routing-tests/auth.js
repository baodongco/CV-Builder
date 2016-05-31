var request = require('supertest');
var server = require('../../app');
var assert = require('assert');

describe('Test auth routes', function () {
    it('responds to get /login', function testSlash(done) {
        request(server)
            .get('/login')
            .expect(200, done);
    });

    it('responds to get /login', function testSlash(done) {
        request(server)
            .get('/login')
            .expect(200, done);
    });

    it('responds to /register', function testSlash(done) {
        request(server)
            .get('/register')
            .expect(200, done);
    });

    it('responds to /change_password', function testSlash(done) {
        request(server)
            .get('/change_password')
            .expect(302, done);
    });

    it('responds to /activate', function testSlash(done) {
        request(server)
            .get('/activate')
            .expect(302, done);
    });

    it('responds to /reset', function testSlash(done) {
        request(server)
            .get('/reset')
            .expect(200, done);
    });
});