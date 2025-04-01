import { MongoClient, ObjectId as ObjectIdConvert } from 'mongodb';
import { mongoInit } from './connect';
import { coreCapability } from '$lib/stores/coreCapability';

const client: MongoClient = await mongoInit();
const db = client.db('siod_analytics');
const TrackingItemsCollection = db.collection('tracking_items');

export async function setNewFields() {
	try {
		const response = await TrackingItemsCollection.updateMany({}, { $set: { details: '' } });
		console.log(response);
	} catch (err) {
		console.log(err);
	}
}

//setNewFields();

export async function createTrackingItem(item: TrackingItem) {
	try {
		const response = await TrackingItemsCollection.insertOne({ ...item });
		return response;
	} catch (err) {
		console.log(err);
		return { status: 500 };
	}
}

export async function editTrackingItem(item: TrackingItem) {
	try {
		const response = await TrackingItemsCollection.updateOne(
			{ _id: new ObjectIdConvert(item._id) },
			{
				$set: {
					name: item.name,
					details: item.details,
					startDate: item.startDate,
					coreCapability: item.coreCapability,
					updatedAt: new Date()
				}
			}
		);
		return response;
	} catch (err) {
		console.log(err);
		return { status: 500 };
	}
}

export async function fetchTrackingItems() {
	try {
		const response = await TrackingItemsCollection.find({})
			.map(({ _id, ...d }) => ({ _id: _id.toString(), ...d }))
			.toArray();

		return response;
	} catch (err) {
		console.log(err);
		return [];
	}
}

export async function postNewEstimate(id: string, newEstimate: TrackingItemEstimate) {
	try {
		const response = await TrackingItemsCollection.updateOne(
			{ _id: new ObjectIdConvert(id) },
			{
				$push: {
					estimates: {
						$each: [{ ...newEstimate }],
						$sort: { createdAt: -1 }
					}
				}
			}
		);

		console.log('Response from find: ', response);

		return response;
	} catch (err) {
		console.log(err);
		return { status: 500 };
	}
}
