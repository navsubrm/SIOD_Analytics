import { Db, Collection, ObjectId, type MongoOptions } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function getObjectById(
	collectionName: string,
	id: string,
	options: MongoOptions | undefined = undefined
) {
	const Collection: Collection = db.collection(collectionName);

	try {
		const response = await Collection.findOne({ _id: new ObjectId(id) }, options);

		return response || false;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { getObjectById };
