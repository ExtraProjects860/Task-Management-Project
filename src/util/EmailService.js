const nodemailer = require("nodemailer");
require('dotenv').config({ path: '../.env'});

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "",
                pass: "jdrr ixya yyzz prrt" // colocar senha de app aqui
            }
        });
    }

    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: "",
            to: to,
            subject: subject,
            text: text
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Error sending email to ${to}:`, error);
        }
    }
}

module.exports = new EmailService();