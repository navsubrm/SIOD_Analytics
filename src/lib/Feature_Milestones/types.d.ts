import type { ObjectId } from 'mongodb';

interface Milestone {
	_id?: ObjectId | string | undefined;
	name?: string;
	details?: string;
	startDate?: Date;
	endDate?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

interface MileStoneValidations {
	missingName?: boolean;
	missingDetails?: boolean;
	invalidStartDate?: boolean;
	invalidEndDate?: boolean;
	invalidEditAttempt?: boolean;
	dbFail?: boolean;
}

interface MilestoneForm extends FormDataEntryValue {
	id?: string;
	name: string;
	details: string;
	startDate: string;
	endDate: string;
}

export type { Milestone, MileStoneValidations, MilestoneForm };
