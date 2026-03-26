const nodemailer = require("nodemailer");

const createTransporter = () => {
    return nodemailer.createTransport({

        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT === 465,
        secure: false,

        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        connectionTimeout: 10000

    });
};

module.exports = createTransporter;