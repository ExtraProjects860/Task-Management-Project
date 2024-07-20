const EmailService = require('../util/EmailService');
require('dotenv').config();

(async () => {
    try {
        await EmailService.sendEmail('qualquercoisa1833@gmail.com', 'Test Email', 'This is a test email.');
        console.log('Email sent successfully.');
    } catch (error) {
         console.error('Failed to send email:', error);
    }
})();
