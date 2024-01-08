import { json } from '@sveltejs/kit';
import { exchangeRatesRef } from '$lib/server/db';

let cache = {};
let lastUpdated = {};

/** @type {import('./$types').RequestHandler} */
export async function GET({ setHeaders, params }) {
  const now = Date.now();
  if (!params.currency)
    return json({ error: 'No currency provided' }, { status: 400 });
  const currency = params.currency.toUpperCase();

  // If cache for this currency is more than a day old or doesn't exist, fetch new data
  if (
    !lastUpdated[currency] ||
    now - lastUpdated[currency] > 60 * 60 * 24 * 1000
  ) {
    const doc = await exchangeRatesRef.findOne({ id: 1 }); // fetch data from your database
    cache[currency] = doc.rates.filter((rate) => rate.currency === currency)[0]; // filter data to only include the currency we want
    lastUpdated[currency] = now;
  }

  // Set cache-control header to 1 day
  setHeaders({
    'cache-control': `max-age=${60 * 60 * 24}`,
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  if (cache[currency]) {
    return json(cache[currency]);
  } else {
    return json({ error: 'No data found' }, { status: 404 });
  }
}
