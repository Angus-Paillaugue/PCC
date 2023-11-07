import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST({ locals }) {
    if(!locals.user) return json({ error:true, message:"You need to be logged-in:" })

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 999,
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: {
            username: locals.user.username
        }
    });
    
    return json({ clientSecret: paymentIntent.client_secret });
}