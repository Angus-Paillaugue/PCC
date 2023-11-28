import { j as json } from "../../../../../chunks/index.js";
import { e as exchangeRatesRef } from "../../../../../chunks/db.js";
let cache = {};
let lastUpdated = {};
async function GET({ setHeaders, params }) {
  const now = Date.now();
  if (!params.currency)
    return json({ error: "No currency provided" }, { status: 400 });
  const currency = params.currency.toUpperCase();
  if (!lastUpdated[currency] || now - lastUpdated[currency] > 60 * 60 * 24 * 1e3) {
    const doc = await exchangeRatesRef.findOne({ id: 1 });
    cache[currency] = doc.rates.filter((rate) => rate.currency === currency)[0];
    lastUpdated[currency] = now;
  }
  setHeaders({
    "cache-control": `max-age=${60 * 60 * 24}`,
    "Access-Control-Allow-Origin": "*",
    // Allow all origins
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  if (cache[currency]) {
    return json(cache[currency]);
  } else {
    return json({ error: "No data found" }, { status: 404 });
  }
}
export {
  GET
};
