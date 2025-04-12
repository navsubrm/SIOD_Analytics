import { MongoClient, Db, Collection } from 'mongodb';
import { mongoInit } from '$lib/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const TrackingEventCollection: Collection = db.collection('tracking_events');

async function getTrackingEventList() {
	try {
		const response = await TrackingEventCollection.find({})
			.map(({ _id, ...d }) => ({ _id: _id.toString(), ...d }))
			.toArray();

		return response;
	} catch (err) {
		console.log(err);
		return null;
	}
}

export { getTrackingEventList };
