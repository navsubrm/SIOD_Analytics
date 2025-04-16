import type { ReleaseStage } from '$lib/Feature_Releases/types';
import { ObjectId } from 'mongodb';
import { Db, Collection } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function postFeatureRelease(id: string, object: ReleaseStage, collection: string) {
	const Collection: Collection = db.collection(collection);

	try {
		const response = await Collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$push: { releaseStages: object }
			}
		);

		if (response.modifiedCount == 0) console.log('Error from update, record not modified.');
		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { postFeatureRelease };
