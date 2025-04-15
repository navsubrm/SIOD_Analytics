interface JIRATicket {
	_id?: string;
	name?: string; //Use JIRA Ticket ID
	startDate?: Date;
	feature?: string;
	plannedReleaseDate?: Date;
	opr?: string;
	milestones?: string[];
	details: string;
	releaseStages?: ReleaseStage[];
	createdAt?: Date;
	updatedAt?: Date;
	closed?: Date;
}

interface JIRATicketValidations {
	missingName?: boolean;
	missingDetails?: boolean;
	invalidStartDate?: boolean;
	invalidFeature?: boolean;
	invalidPlannedReleaseDate?: boolean;
	invalidMilestones?: boolean;
	invalidOPR?: boolean;
	dbFail?: boolean;
}

interface JIRAForm extends FormDataEntryValue {
	id?: string;
	name: string;
	startDate: string;
	feature: string;
	plannedReleaseDate: string;
	opr?: string;
	milestones: string;
	details: string;
	releaseStages: ReleaseStage[];
}

export type { JIRATicketValidations, JIRATicket, JIRAForm };
