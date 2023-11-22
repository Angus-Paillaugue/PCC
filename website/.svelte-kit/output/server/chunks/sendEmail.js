import { SMTPClient, Message } from "emailjs";
import { E as EMAIL_APP_PASSWORD } from "./private.js";
const client = new SMTPClient({
  user: "pandabuycurrencyconversion@gmail.com",
  password: EMAIL_APP_PASSWORD,
  host: `smtp.gmail.com`,
  ssl: true
});
async function sendEmail({ subject, text, to, attachment }) {
  const msg = new Message({
    text,
    from: "pandabuycurrencyconversion@gmail.com",
    to,
    subject,
    // attachment lets us send html
    // in which case, `text` will be use as a fallback
    attachment: attachment ?? []
  });
  try {
    await client.sendAsync(msg);
  } catch (error) {
    console.log(error);
  }
}
export {
  sendEmail as s
};
