import { Collection, MongoClient, Db, ObjectId } from 'mongodb';
import { mongoInit } from '$lib/mongoConnect';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const collection: Collection = db.collection('tracking_items');

async function postNewEndDate(id: string, endDateObject: ProjectedEndDate) {
	try {
		const response = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$push: {
					estimates: {
						$each: [{ ...endDateObject }],
						$sort: { createdAt: -1 }
					}
				}
			}
		);

		return response;
	} catch (err) {
		console.log('Error from end date push: ', err);
		return { status: 500 };
	}
}

export { postNewEndDate };
