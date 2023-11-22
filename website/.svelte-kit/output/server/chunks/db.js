import { MongoClient } from "mongodb";
import { M as MONGODB_CONNEXION_STRING } from "./private.js";
const client = new MongoClient(MONGODB_CONNEXION_STRING);
await client.connect();
const database = client.db("PCC");
const usersRef = database.collection("users");
const questionsRef = database.collection("questions");
const resetPasswordTokensRef = database.collection("resetPasswordTokens");
const newsletterRef = database.collection("newsletter");
const exchangeRatesRef = database.collection("exchangeRates");
export {
  exchangeRatesRef as e,
  newsletterRef as n,
  questionsRef as q,
  resetPasswordTokensRef as r,
  usersRef as u
};
