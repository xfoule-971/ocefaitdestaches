const createTransporter = require("../config/mail");

const mailService = {

    /**
     * Envoi formulaire contact
     */
    sendContactEmail: async (contactData) => {

        const { nom, email, sujet, message } = contactData;

        // Vérification
        if (!nom || !email || !message) {

            throw new Error("Champs requis manquants");

        }

        const transporter = createTransporter();

        const mailOptions = {

            from: `"${nom}" <${email}>`,
            to: process.env.MAIL_RECEIVER,

            subject: `Nouveau message: ${sujet || "Sans sujet"}`,

            text: `Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`,

            html: `
                <div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>Nouveau message de contact</h2>
                    <p><strong>Expéditeur :</strong> ${nom} (${email})</p>
                    <p><strong>Sujet :</strong> ${sujet || "Sans sujet"}</p>
                    <hr />
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `

        };

        return await transporter.sendMail(mailOptions);

    }
    
};

module.exports = mailService;