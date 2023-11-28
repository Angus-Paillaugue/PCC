import { usersRef } from "$lib/server/db";
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import { sendPurchaseConfirmEmail } from "$lib/server/sendEmail";

const stripe = new Stripe(env.SECRET_STRIPE_KEY);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const payload = await request.text();
    const sig = request.headers.get('stripe-signature');
    let event;

    console.log(env.STRIPE_WEBHOOK_SECRET);

    try {
        event = stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.warn('⚠️  Webhook signature verification failed.', err.message);

        return new Response("⚠️  Webhook signature verification failed.", { status: 400 });
    }

    if (event.type === 'charge.succeeded') {
        const user = await usersRef.findOne({ username: event.data.object.metadata.username });
        await usersRef.updateOne({ username: user.username }, { $set: { isPremium: true } });
        sendPurchaseConfirmEmail(user.email, user.username);
        // Sending email to the admin (me) to notify of a new premium user
        sendEmail({ subject:"New premium PCC user", text:`A new user (${username}) has bought PCC premium.`, to:"angus.paillaugue40@gmail.com" });
        return new Response("Ok");
    }

    return new Response("An error occurred.");
};