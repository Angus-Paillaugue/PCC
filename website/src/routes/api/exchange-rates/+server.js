import { json } from "@sveltejs/kit";
import { exchangeRatesRef } from "$lib/server/db";

let cache = null;
let lastUpdated = null;

/** @type {import('./$types').RequestHandler} */
export async function GET({ setHeaders }) {
    const now = Date.now();

    // If cache is more than a day old or doesn't exist, fetch new data
    if (!lastUpdated || now - lastUpdated > 60 * 60 * 24 * 1000) {
        console.log("Fetching new data...");
        cache = await exchangeRatesRef.find({  }).project({ _id:0 }).toArray() // fetch data from your database
        lastUpdated = now;
    }else {
        console.log("Using cached data...");
    }

    // Set cache-control header to 1 day
    setHeaders({
        "cache-control": `max-age=${60 * 60 * 24}`,
    });
    
    return json(cache);
};