import { ObjectId } from 'mongodb';

function initializePriority(priority: number) {
	return {
		_id: new ObjectId().toString(),
		priority: Number(priority),
		createdAt: new Date()
	};
}

export { initializePriority };
