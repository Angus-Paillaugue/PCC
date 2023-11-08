import { usersRef } from "$lib/server/db";
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

const stripe = new Stripe(env.SECRET_STRIPE_KEY);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const payload = await request.text();
    const sig = request.headers.get('stripe-signature');
    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.warn('⚠️  Webhook signature verification failed.', err.message);

        return new Response("⚠️  Webhook signature verification failed.", { status: 400 });
    }

    if (event.type === 'charge.succeeded') {
        await usersRef.updateOne({ username: event.data.object.metadata.username }, { $set: { isPremium: true } });
        return new Response("Ok");
    }

    return new Response("An error occurred.");
};