import { Message, SMTPClient } from 'emailjs';
import { EMAIL_APP_PASSWORD } from "$env/static/private";
import forgotPasswordTemplate from "$lib/components/email-templates/forgot-password.html?raw";

// Use the emailjs library to set up an SMTP client using your credentials
const client = new SMTPClient({
    user: "pandabuycurrencyconversion@gmail.com",
    password: EMAIL_APP_PASSWORD,
    host: `smtp.gmail.com`,
    ssl: true,
});

// General function to send an email to a single address 
// from your chosen `from` email
export async function sendEmail({ subject, text, attachment }) {
    const msg = new Message({
        text,
        from: 'pandabuycurrencyconversion@gmail.com',
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
        from: 'pandabuycurrencyconversion@gmail.com',
        text:`<div>Click the link below to reset your password: <br/><br/><a href="${url}">Reset password</a><br>This link is only available for ${tokenLife} minutes. After that, you will need to to another request.<br>If you did not request a password reset, please disregard this e-mail.</div>`,
        to,
        subject:"Reset Password",
        attachment: [{ data:forgotPasswordTemplate.replace("{{forgotPasswordLink}}", url), alternative: true }],
    });

    try {
        await client.sendAsync(msg);
        console.log(("Email sent successfully"));
    } catch (error) {
        console.log(error);
    }
}