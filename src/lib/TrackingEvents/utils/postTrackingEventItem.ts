import { MongoClient, Db, Collection } from 'mongodb';
import { mongoInit } from '$lib/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const TrackingEventCollection: Collection = db.collection('tracking_events');

async function postTrackingEvent(item: TrackingEvent) {
	try {
		const response = await TrackingEventCollection.insertOne({ ...item });
		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { postTrackingEvent };
