var express = require('express');
var app = express();
var mailer = require('express-mailer');
var config = require('config');
var ip = require('ip');
var deploySettings = config.get('cv-builder.deploy');

var host = ip.address();

if(host == '192.168.56.1'){
	host = 'http://localhost:' + deploySettings['port'];
}

host = host + ':' + deploySettings['port'];

app.set('views', __dirname + '/../views/mail-templates');
app.set('view engine', 'ejs');

var emailSettings = config.get('cv-builder.email');

mailer.extend(app, {

	from: emailSettings['from'],
	host: emailSettings['host'],
	secureConnection: emailSettings['secureConnection'],
	port: emailSettings['port'],
	transportMethod: emailSettings['transportMethod'],
	auth: {
		user: emailSettings['auth']['user'],
		pass: emailSettings['auth']['pass']
	}

});

function Email(emailInfo) {
	this.name = emailInfo.name;
	this.mailTo = emailInfo.mailTo;
	this.activationCode = emailInfo.activationCode;

	console.log(this.name + ", " + this.mailTo + ", " + this.activationCode);
}


Email.prototype.sendEmail = function() {
	// send email
	app.mailer.send('activate', {
		to: this.mailTo,
		subject: '[Gaiz Team] Acivation account',
		receiver: this.name,
		activateLink: host + '/activate?guid=' + this.activationCode
	}, function(err) {
		if (err) {
			console.log(err);
			console.log('email-error');
			return;
		}
		console.log('email-sucess');
	});
};

Email.prototype.sendEmailResetPassword = function() {
	// send email
	app.mailer.send('reset', {
		to: this.mailTo,
		subject: '[Gaiz Team] Acivation account',
		receiver: this.name,
		resetLink: host + '/reset-complete?guid=' + this.activationCode
	}, function(err) {
		if (err) {
			console.log(err);
			console.log('email-error');
			return;
		}
		console.log('email-sucess');
	});
};

module.exports = Email;