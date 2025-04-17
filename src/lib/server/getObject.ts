import { Db, Collection, type MongoOptions } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function getObject(
	collectionName: string,
	query: any,
	options: MongoOptions | undefined = undefined
) {
	const Collection: Collection = db.collection(collectionName);

	try {
		const response = await Collection.find(query, options);

		return response || false;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { getObject };
