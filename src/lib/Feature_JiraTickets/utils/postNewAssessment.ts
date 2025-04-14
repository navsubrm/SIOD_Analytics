import { Collection, MongoClient, Db, ObjectId } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const collection: Collection = db.collection('tracking_items');

async function postNewAssessment(id: string, estimateObject: TrackingItemEstimate) {
	try {
		const response = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$push: {
					estimates: {
						$each: [{ ...estimateObject }],
						$sort: { createdAt: -1 }
					}
				}
			}
		);

		return response;
	} catch (err) {
		console.log('Error from Estimate Push: ', err);
		return { status: 500 };
	}
}

export { postNewAssessment };
