import { Collection, MongoClient, Db, ObjectId } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const collection: Collection = db.collection('tracking_items');

async function postPriorityAssignment(id: string, priorityObject: TrackingItemPriority) {
	try {
		const response = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$push: {
					priorityAssignments: {
						$each: [{ ...priorityObject }],
						$sort: { createdAt: -1 }
					}
				}
			}
		);

		return response;
	} catch (err) {
		console.log('Error from priority push: ', err);
	}
}

export { postPriorityAssignment };
