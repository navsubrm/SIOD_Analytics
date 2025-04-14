//External Imports:
import { MongoClient, Db } from 'mongodb';
import { CONNECTION_STRING, DB_NAME } from '$env/static/private';

let client: null | MongoClient = null;
let db: null | Db = null;

export async function mongoInit() {
	if (!db) {
		try {
			client = new MongoClient(CONNECTION_STRING);
			await client.connect();
			db = client.db(DB_NAME);
			console.log(`Connected to ${DB_NAME} Database.`);
		} catch (err) {
			console.log('Mongo connection failed.', err);
			throw Error('DB failed to connect.');
		}
	}
	return db as Db;
}
