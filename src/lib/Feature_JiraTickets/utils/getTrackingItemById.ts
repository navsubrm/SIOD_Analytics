import { Collection, MongoClient, Db, ObjectId } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const collection: Collection = db.collection('tracking_items');

async function getTrackingItemById(id: string) {
	try {
		const response = await collection.findOne({ _id: new ObjectId(id) });

		return response;
	} catch (err) {
		console.log('Error from get tracking item by ID: ', err);
		return '';
	}
}

export { getTrackingItemById };
