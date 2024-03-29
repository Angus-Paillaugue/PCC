import { u as usersRef } from "../../../chunks/db.js";
import Stripe from "stripe";
import { b as private_env } from "../../../chunks/shared-server.js";
import { s as sendPurchaseConfirmEmail } from "../../../chunks/sendEmail.js";
const stripe = new Stripe(private_env.SECRET_STRIPE_KEY);
async function POST({ request }) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");
  let event;
  console.log(private_env.STRIPE_WEBHOOK_SECRET);
  try {
    event = stripe.webhooks.constructEvent(payload, sig, private_env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.warn("⚠️  Webhook signature verification failed.", err.message);
    return new Response("⚠️  Webhook signature verification failed.", { status: 400 });
  }
  if (event.type === "charge.succeeded") {
    const user = await usersRef.findOne({ username: event.data.object.metadata.username });
    await usersRef.updateOne({ username: user.username }, { $set: { isPremium: true } });
    sendPurchaseConfirmEmail(user.email, user.username);
    sendEmail({ subject: "New premium PCC user", text: `A new user (${username}) has bought PCC premium.`, to: "angus.paillaugue40@gmail.com" });
    return new Response("Ok");
  }
  return new Response("An error occurred.");
}
export {
  POST
};
