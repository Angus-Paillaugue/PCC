import Stripe from "stripe";
import { S as SECRET_STRIPE_KEY } from "../../../chunks/private.js";
import { j as json } from "../../../chunks/index.js";
const stripe = new Stripe(SECRET_STRIPE_KEY);
async function POST({ locals }) {
  try {
    if (!locals.user)
      return json({ error: true, message: "You need to be logged-in!" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 399,
      currency: "eur",
      payment_method_types: ["card"],
      metadata: {
        username: locals.user.username
      }
    });
    return json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return json({ error: true, message: error.message });
  }
}
export {
  POST
};
