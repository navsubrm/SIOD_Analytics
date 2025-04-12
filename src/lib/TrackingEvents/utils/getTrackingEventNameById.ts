import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { mongoInit } from '$lib/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const TrackingEventCollection: Collection = db.collection('tracking_events');

async function getTrackingEventNameById(id: string) {
	try {
		const response = await TrackingEventCollection.findOne({ _id: new ObjectId(id) });
		return response?.name || false;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { getTrackingEventNameById };
