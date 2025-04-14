import type { ReleaseStage } from '$lib/Feature_Releases/types';
import { ObjectId } from 'mongodb';
import { Db, Collection } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function updateRelease(id: string, stageId: string, object: ReleaseStage) {
	const Collection: Collection = db.collection('features');

	try {
		const response = await Collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					'releaseStages.$[x].date': object.date,
					'releaseStages.$[x].updatedAt': object.updatedAt
				}
			},
			{
				arrayFilters: [
					{
						'x._id': stageId
					}
				]
			}
		);

		if (response.modifiedCount == 0) console.log('Error from update, record not modified.');
		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { updateRelease };
