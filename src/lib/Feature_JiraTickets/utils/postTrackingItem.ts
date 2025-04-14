import { Collection, MongoClient, Db } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const collection: Collection = db.collection('tracking_items');

async function postTrackingItem(item: TrackingItem) {
	try {
		const response = await collection.insertOne({ ...item });
		return response;
	} catch (err) {
		console.log('Error from tracking item: ', err);
		return { status: 500 };
	}
}

export { postTrackingItem };
