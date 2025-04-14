import { ObjectId } from 'mongodb';
import { Db, Collection, type MongoOptions } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function updateObject(
	collectionName: string,
	id: string,
	object: any,
	options: MongoOptions | undefined = undefined
) {
	const Collection: Collection = db.collection(collectionName);

	try {
		const response = await Collection.updateOne({ _id: new ObjectId(id) }, object, options);

		if (response.modifiedCount == 0) console.log('Error from update, record not modified.');
		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { updateObject };
