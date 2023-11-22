import { j as json } from "../../../../../chunks/index.js";
import "cors";
import { e as exchangeRatesRef } from "../../../../../chunks/db.js";
let cache = {};
let lastUpdated = {};
async function GET({ setHeaders, params }) {
  const now = Date.now();
  if (!params.currency)
    return json({ error: "No currency provided" }, { status: 400 });
  const currency = params.currency.toUpperCase();
  if (!lastUpdated[currency] || now - lastUpdated[currency] > 60 * 60 * 24 * 1e3) {
    console.log("Fetching new data...");
    cache[currency] = await exchangeRatesRef.find({ currency }).project({ _id: 0 }).toArray();
    lastUpdated[currency] = now;
  } else {
    console.log("Using cached data...");
  }
  setHeaders({
    "cache-control": `max-age=${60 * 60 * 24}`,
    "Access-Control-Allow-Origin": "*",
    // Allow all origins
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  return json(cache[currency]);
}
export {
  GET
};
