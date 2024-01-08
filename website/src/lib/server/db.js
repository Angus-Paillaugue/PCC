import { MongoClient } from 'mongodb';
import { MONGODB_CONNEXION_STRING } from '$env/static/private';

const client = new MongoClient(MONGODB_CONNEXION_STRING);
await client.connect();

const database = client.db('PCC');

const newsletterRef = database.collection('newsletter');
const exchangeRatesRef = database.collection('exchangeRates');

export { newsletterRef, exchangeRatesRef };
