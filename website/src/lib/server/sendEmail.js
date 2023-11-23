import { Message, SMTPClient } from 'emailjs';
import { EMAIL_APP_PASSWORD } from "$env/static/private";
import forgotPasswordTemplate from "$lib/components/email-templates/forgot-password.html?raw";
import boughtPremiumTemplate from "$lib/components/email-templates/bought-premium.html?raw";

// Use the emailjs library to set up an SMTP client using your credentials
const sendingEmail = "pandabuycurrencyconversion@gmail.com";
const client = new SMTPClient({
    user: sendingEmail,
    password: EMAIL_APP_PASSWORD,
    host: `smtp.gmail.com`,
    ssl: true,
});

// General function to send an email to a single address 
// from your chosen `from` email
export async function sendEmail({ subject, text, attachment }) {
    const msg = new Message({
        text,
        from: sendingEmail,
        to,
        subject,
        // attachment lets us send html
        // in which case, `text` will be use as a fallback
        attachment: attachment ?? [],
    });

    try {
        await client.sendAsync(msg);
    } catch (error) {
        console.log(error);
    }
}

export async function sendForgotEmail(to, url, tokenLife) {
    const msg = new Message({
        from: sendingEmail,
        text:`<div>Click the link below to reset your password: <br/><br/><a href="${url}">Reset password</a><br>This link is only available for ${tokenLife} minutes. After that, you will need to to another request.<br>If you did not request a password reset, please disregard this e-mail.</div>`,
        to,
        subject:"Reset Password",
        attachment: [{ data:forgotPasswordTemplate.replace("{{forgotPasswordLink}}", url).replace("{{tokenLife}}", tokenLife), alternative: true }],
    });

    try {
        await client.sendAsync(msg);
    } catch (error) {
        console.log(error);
    }
}

export async function sendPurchaseConfirmEmail(to, username) {
    const msg = new Message({
        from: sendingEmail,
        text:`Thank you for your purchase of PCC Premium. You are now a premium user. Enjoy!`,
        to,
        subject:"Thank you for your purchase!",
        attachment: [{ data:boughtPremiumTemplate.replace("{{username}}", username), alternative: true }],
    });

    try {
        await client.sendAsync(msg);
    } catch (error) {
        console.log(error);
    }
}