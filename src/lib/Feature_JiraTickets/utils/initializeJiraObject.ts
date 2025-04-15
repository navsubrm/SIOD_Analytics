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
		milestones: [],
		createdAt: new Date()
	};

	if (!inputs?.id) {
		newJiraTicket.releaseStages = [
			{
				_id: new ObjectId().toString(),
				stage: 'Customer Requirements',
				date: new Date(),
				projectedTime: 0.25,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'Story Boarding',
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
				stage: 'In Testing',
				date: null,
				projectedTime: 0.15,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'User Accepted',
				date: null,
				projectedTime: 0.05,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'Closed',
				date: null,
				updatedAt: null
			}
		];
	}

	if (inputs?.milestones.toString() !== '')
		newJiraTicket.milestones = [...JSON.parse(inputs?.milestones?.toString())];

	if (inputs?.id) newJiraTicket.updatedAt = new Date();

	return newJiraTicket;
}

export { initializeJiraObject };
