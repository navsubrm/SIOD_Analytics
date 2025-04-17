import { Db, Collection, type MongoOptions } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function getObjectList(
	collectionName: string,
	options: MongoOptions | undefined = undefined,
	sort: any | undefined = undefined,
	query: any | undefined = {},
	limit: number | undefined = 2000
) {
	const Collection: Collection = db.collection(collectionName);

	try {
		const response = await Collection.find(query, { ...options })
			.sort({ ...sort })
			.limit(limit)
			.map(({ _id, ...d }) => ({ _id: _id.toString(), ...d }))
			.toArray();

		return response;
	} catch (err) {
		console.log(err);
		return null;
	}
}

export { getObjectList };
