import { Message, SMTPClient, } from 'emailjs';
import { EMAIL_APP_PASSWORD } from "$env/static/private"

// Use the emailjs library to set up an SMTP client using your credentials
const client = new SMTPClient({
    user: "angus.paillaugue40@gmail.com",
    password: EMAIL_APP_PASSWORD,
    host: `smtp.gmail.com`,
    ssl: true,
});

// General function to send an email to a single address 
// from your chosen `from` email
export async function sendEmail({ subject, text, to, attachment }) {
    const msg = new Message({
        text,
        from: 'angus.paillaugue40@gmail.com',
        to,
        subject,
        // attachment lets us send html
        // in which case, `text` will be use as a fallback
        attachment: attachment ?? [],
    });

    try {
        await client.sendAsync(msg);
    } catch (error) {
        console.log(error)
    }
}