import { Collection, MongoClient, Db } from 'mongodb';
import { mongoInit } from '$lib/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const collection: Collection = db.collection('tracking_items');

async function getTrackingItemList() {
	try {
		const response = await collection
			.find({})
			.map(({ _id, ...d }) => ({ _id: _id.toString(), ...d }))
			.toArray();

		return response;
	} catch (err) {
		console.log('Error from get Tracking Items: ', err);
		return [];
	}
}

export { getTrackingItemList };
