import { ObjectId } from 'mongodb';

function initializeEndDate(date: Date | string) {
	return {
		_id: new ObjectId().toString(),
		date: new Date(date),
		createdAt: new Date()
	};
}

export { initializeEndDate };
