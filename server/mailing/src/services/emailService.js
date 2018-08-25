const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const logger = require('winston');

const keys = require('../config/keys');

sgMail.setApiKey(keys.SENDGRID_API_KEY);


module.exports = {
	sendEmailToUser: (userEmail, subject, fileName, data, extension = '.ejs') => {
		let renderedHtml;
		return new Promise(async (resolve, reject) => {
			fs.readFile(path.join(__dirname, '/emails/', `${fileName}${extension}`), 'utf8', async (error, email) => {
				if (error) {
					return reject(error);
				}
				renderedHtml = ejs.render(email, data);
				const msg = {
					to: "veljko.matic.bg@gmail.com",
					from: 'vepapb@gmail.com',
					subject: subject,
					html: renderedHtml,
				};
				try {
					await sgMail.send(msg);
				} catch(e) {
					logger.error('Error sendEmailToUser - Mailing microservice: ', e);
				}
				resolve()
			});
		});
	}	
};