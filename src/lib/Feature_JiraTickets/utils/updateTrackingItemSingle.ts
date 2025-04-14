import { Collection, MongoClient, Db, ObjectId } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const collection: Collection = db.collection('tracking_items');

async function updateTrackingItemSingle(item: TrackingItem) {
	const id = item._id as string;
	try {
		const response = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					name: item.name,
					details: item.details,
					startDate: item.startDate,
					coreCapability: item.coreCapability,
					updatedAt: new Date()
				}
			}
		);
		return response;
	} catch (err) {
		console.log('Error fro Tracking Item Update Single: ', err);
		return { status: 500 };
	}
}

export { updateTrackingItemSingle };
