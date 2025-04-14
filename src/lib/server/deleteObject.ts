import { ObjectId } from 'mongodb';
import { Db, Collection } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';

const db: Db = await mongoInit();

async function deleteObject(collectionName: string, id: string) {
	const Collection: Collection = db.collection(collectionName);

	try {
		const response = await Collection.deleteOne({ _id: new ObjectId(id) });

		console.log('Mongo delete Response: ', response);

		//if (response.modifiedCount == 0) console.log('Error from update, record not modified.');
		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { deleteObject };
