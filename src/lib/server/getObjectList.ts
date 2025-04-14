import { Db, Collection, type MongoOptions } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function getObjectList(
	collectionName: string,
	options: MongoOptions | undefined = undefined
) {
	const Collection: Collection = db.collection(collectionName);

	try {
		const response = await Collection.find({}, { ...options })
			.map(({ _id, ...d }) => ({ _id: _id.toString(), ...d }))
			.toArray();

		return response;
	} catch (err) {
		console.log(err);
		return null;
	}
}

export { getObjectList };
