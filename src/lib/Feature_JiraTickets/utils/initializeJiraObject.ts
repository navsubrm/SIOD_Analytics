import { ObjectId } from 'mongodb';
import type { JIRATicket, JIRAForm } from '../types';

function initializeJiraObject(inputs: JIRAForm) {
	const newJiraTicket: JIRATicket = {
		name: inputs.name,
		details: inputs.details,
		startDate: new Date(inputs?.startDate?.toString() as string),
		feature: JSON.parse(inputs?.feature),
		opr: inputs?.opr,
		plannedReleaseDate: new Date(inputs?.plannedReleaseDate?.toString() as string),
		milestones: JSON.parse(inputs?.milestones?.toString()),
		createdAt: new Date()
	};

	if (!inputs?.id) {
		newJiraTicket.releaseStages = [
			{
				_id: new ObjectId().toString(),
				stage: `Cust. Req's`,
				date: new Date(inputs?.startDate),
				projectedTime: 0.25,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'Dev Start',
				date: null,
				projectedTime: 0.2,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'In Dev',
				date: null,
				projectedTime: 0.3,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'Rel to Dev',
				date: null,
				projectedTime: 0.15,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'Rel to IL6',
				date: null,
				projectedTime: 0.05,
				updatedAt: null
			}
		];
	}

	if (inputs?.id) newJiraTicket.updatedAt = new Date();

	return newJiraTicket;
}

export { initializeJiraObject };
