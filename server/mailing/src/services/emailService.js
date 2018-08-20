const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const helper = require('sendgrid').mail;
const keys = require('../config/keys');
const sg = require('sendgrid')(keys.sendgridApiKey);
const logger = require('winston');

const fromEmail = new helper.Email('veljko.matic.bg@gmail.com');


module.exports = {
	sendEmailToUser: (userEmail, subject, fileName, data, extension = '.ejs') => {
		const toEmail = new helper.Email(userEmail);
		const emailSubject = subject;
		let renderedHtml;
		let content;
		let mail;
		let request;
		return new Promise((resolve, reject) => {
			fs.readFile(path.join(__dirname, '/emails/', `${fileName}${extension}`), 'utf8', (error, email) => {
				if (error) {
					return reject(error);
				}
				renderedHtml = ejs.render(email, z);
				content = new helper.Content('text/html', renderedHtml);
				mail = new helper.Mail(fromEmail, emailSubject, toEmail, content);
				request = sg.emptyRequest({
					method: 'POST',
					path: '/v3/mail/send',
					body: mail.toJSON()
				});
				sg.API(request, (err, res) => {
					if (err) {
						logger.error(`Can't send send grid emails email `);
						return reject(err)
					}
					if (res.statusCode >= 200 && res.statusCode <= 299) {
						return resolve()
					}
					resolve(res.statusCode);
				});
			});
		});
	}	
};