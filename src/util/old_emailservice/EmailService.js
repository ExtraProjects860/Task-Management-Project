const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env'});

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SERVICE,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });
    }

    readHTMLTemplate(templatePath) {
        return fs.readFileSync(templatePath, "utf-8");
    }

    replacePlaceholders(template, replacements) {
        return template.replace(/{title_html}/g, replacements.title)
                       .replace(/{email_html}/g, replacements.email)
                       .replace(/{text_html}/g, replacements.text)
                       .replace(/{token_html}/g, replacements.token);
    }

    async sendEmail(to, subject, token) {
        try {
            const templatePath = path.join(__dirname, "static", "corpo_email.html");
            const template = this.readHTMLTemplate(templatePath);
            const emailHTML = this.replacePlaceholders(template, {
                title: "Alerta de redefinição de senha",
                email: to,
                text: "Você solicitou uma redefinição de senha. Por favor, use o seguinte token para redefinir sua senha:",
                token: token
            });
    
            const mailOptions = {
                from: process.env.EMAIL_SERVICE,
                to: to,
                subject: subject,
                html: emailHTML
            };
    
            try {
                await this.transporter.sendMail(mailOptions);
                console.log(`Email sent to ${to}`);
            } catch (error) {
                console.error(`Error sending email to ${to}:`, error);
                throw new Error(`Error sending email to ${to}:`, error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new EmailService();
