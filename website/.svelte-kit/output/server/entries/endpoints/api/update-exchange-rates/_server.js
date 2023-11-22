import { e as exchangeRatesRef } from "../../../../chunks/db.js";
async function POST({ locals }) {
  if (!locals?.user?.isAdmin)
    return new Response("Forbidden", { status: 403, statusText: "Forbidden" });
  const currencies = ["AED", "AUD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EGP", "EUR", "GBP", "HKD", "HUF", "IDR", "INR", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "VND", "ZAR"];
  await exchangeRatesRef.deleteMany({});
  for await (const currency of currencies) {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
    const data = await res.json();
    await exchangeRatesRef.insertOne({ currency, rates: data.rates });
  }
  return new Response({ message: "Done !" }, { status: 200, statusText: "OK" });
}
export {
  POST
};
