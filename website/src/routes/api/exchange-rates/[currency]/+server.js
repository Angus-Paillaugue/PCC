import { json } from "@sveltejs/kit";
import { exchangeRatesRef } from "$lib/server/db";

let cache = {};
let lastUpdated = {};

/** @type {import('./$types').RequestHandler} */
export async function GET({ setHeaders, params }) {
    const now = Date.now();
    if(!params.currency) return json({ error: "No currency provided" }, { status: 400 });
    const currency = params.currency.toUpperCase();

    // If cache is more than a day old or doesn't exist, fetch new data
    if (!lastUpdated[currency] || now - lastUpdated[currency] > 60 * 60 * 24 * 1000) {
        cache[currency] = await exchangeRatesRef.find({ currency }).project({ _id:0 }).toArray() // fetch data from your database
        lastUpdated[currency] = now;
    }

    // Set cache-control header to 1 day
    setHeaders({
        "cache-control": `max-age=${60 * 60 * 24}`,
    });
    
    return json(cache[currency]);
};