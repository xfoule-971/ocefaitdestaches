const nodemailer = require("nodemailer");

/**
 * Création et configuration du transporteur SMTP pour l'envoi des emails
 */
const createTransporter = () => {

    return nodemailer.createTransport({

        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT === 465,
        secure: false,

        auth:{

            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },

        connectionTimeout: 10000 // Temps maximum avant abandon connexion (10s)

    });
    
};

module.exports = createTransporter;