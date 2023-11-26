import { e as exchangeRatesRef } from "../../../../chunks/db.js";
async function POST({ locals }) {
  if (!locals?.user?.isAdmin)
    return new Response(JSON.stringify({ message: "Forbidden", ok: false }), { status: 403, statusText: "Forbidden" });
  const currencies = ["AED", "AUD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EGP", "EUR", "GBP", "HKD", "HUF", "IDR", "INR", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "VND", "ZAR"];
  await exchangeRatesRef.deleteMany({});
  let doc = [];
  await exchangeRatesRef.insertOne({ updatedAt: /* @__PURE__ */ new Date() });
  for await (const currency of currencies) {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
    const data = await res.json();
    doc.push({ currency, rates: data.rates });
  }
  await exchangeRatesRef.insertOne({ updatedAt: /* @__PURE__ */ new Date(), rates: doc, id: 1 });
  return new Response(JSON.stringify({ message: "Done !", ok: true }), { status: 200, statusText: "OK" });
}
export {
  POST
};
