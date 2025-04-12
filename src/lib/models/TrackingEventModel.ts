import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { mongoInit } from '../mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const TrackingEventCollection: Collection = db.collection('tracking_events');

export async function createTrackingEvent(item: TrackingEvent) {
	try {
		const response = await TrackingEventCollection.insertOne({ ...item });
		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function fetchTrackingEvents() {
	try {
		const response = await TrackingEventCollection.find({})
			.map(({ _id, ...d }) => ({ _id: _id.toString(), ...d }))
			.toArray();

		return response;
	} catch (err) {
		console.log(err);
		return [];
	}
}

export async function fetchTrackingEventNameById(id: string) {
	try {
		const response = await TrackingEventCollection.findOne({ _id: new ObjectId(id) });
		return response?.name || '';
	} catch (err) {
		console.log(err);
		return '';
	}
}
