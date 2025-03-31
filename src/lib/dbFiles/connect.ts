//External Imports:
import { MongoClient } from 'mongodb';
import { CONNECTION_STRING } from '$env/static/private';

let client: null | MongoClient = null;

export async function mongoInit() {
	if (!client) {
		try {
			client = new MongoClient(CONNECTION_STRING);
			return (await client.connect()) as MongoClient;
		} catch (err) {
			console.log('Mongo connection failed.', err);
		}
	}
	return client as MongoClient;
}
