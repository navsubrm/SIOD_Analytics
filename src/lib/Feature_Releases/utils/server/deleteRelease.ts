import { ObjectId } from 'mongodb';
import { Db, Collection } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function deleteRelease(id: string, stageId: string, collection: string) {
	const Collection: Collection = db.collection(collection);

	try {
		const response = await Collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					'releaseStages.$[x].date': null,
					'releaseStages.$[x].updatedAt': new Date()
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

export { deleteRelease };
