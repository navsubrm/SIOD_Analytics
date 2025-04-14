import { Db, Collection, type MongoOptions } from 'mongodb';
import { mongoInit } from '$lib/server/mongoConnect';
import type { Milestone } from '$lib/Feature_Milestones/types';
import type { JIRATicket } from '$lib/Feature_JiraTickets/types';

const db: Db = await mongoInit();

async function postNewObject(
	collectionName: string,
	item: Milestone | JIRATicket,
	options: MongoOptions | undefined = undefined
) {
	const Collection: Collection = db.collection(collectionName);

	try {
		const response = await Collection.insertOne({ ...item }, { ...options });
		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { postNewObject };
