import { createTransport } from 'nodemailer';
import { EMAIL_APP_PASSWORD } from "$env/static/private";
import forgotPasswordTemplate from "$lib/components/email-templates/forgot-password.html?raw";
import boughtPremiumTemplate from "$lib/components/email-templates/bought-premium.html?raw";

// Use the emailjs library to set up an SMTP client using your credentials
const sendingEmail = "send.email.pcc@gmail.com";
const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: sendingEmail,
        pass: EMAIL_APP_PASSWORD,
    },
});

// General function to send an email to a single address 
// from your chosen `from` email
export function sendEmail({ subject, text, to, attachment }) {
    const msg = {
        text,
        from: sendingEmail,
        to,
        subject,
        attachment: attachment ?? [],
    }

    transporter.sendMail(msg, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

export function sendForgotEmail(to, url, tokenLife) {
    const msg = {
        from: sendingEmail,
        to,
        subject:"Reset Password",
        text:`Click the link to reset your password: ${url} \nThis link is only available for ${tokenLife} minutes. After that, you will need to to another request.\nIf you did not request a password reset, please disregard this e-mail.`,
        html:forgotPasswordTemplate.replace("{{forgotPasswordLink}}", url).replace("{{tokenLife}}", tokenLife),
    };

    transporter.sendMail(msg, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

export function sendPurchaseConfirmEmail(to, username) {
    const msg = {
        from: sendingEmail,
        text:`Thank you for your purchase of PCC Premium. You are now a premium user. Enjoy!`,
        to,
        subject:"Thank you for your purchase!",
        html:boughtPremiumTemplate.replace("{{username}}", username),
    };

    transporter.sendMail(msg, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}