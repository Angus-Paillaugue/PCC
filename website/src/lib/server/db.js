import { MongoClient } from "mongodb";
import { MONGODB_CONNEXION_STRING } from "$env/static/private";

const client = new MongoClient(MONGODB_CONNEXION_STRING);
await client.connect();

const database = client.db('PCC');

const usersRef = database.collection("users");
const questionsRef = database.collection("questions");
const resetPasswordTokensRef = database.collection("resetPasswordTokens");
const newsletterRef = database.collection("newsletter");

export { usersRef, questionsRef, resetPasswordTokensRef, newsletterRef }