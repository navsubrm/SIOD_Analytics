interface JIRATicket {
	_id?: ObjectId | string | undefined;
	name: string; //Use JIRA Ticket ID
	details: string;
	startDate: Date;
	originalPlannedEndDate: Date;
	featureId?: string;
	releaseStages: ReleaseStage[];
	milestones: string[];
	OPR?: string;
	estimates?: TrackingItemEstimate[];
	createdAt?: Date;
	updatedAt?: Date;
	closed?: Date;
}

interface JIRATicketValidations {
	missingName?: boolean;
	missingDetails?: boolean;
	missingStartDate?: boolean;
	invalidStartDate?: boolean;
	missingPlannedEndDate?: boolean;
	invalidPlannedEndDate?: boolean;
	missingCoreCapability?: boolean;
	missingFeature?: boolean;
	missingReleaseStage?: boolean;
	invalidReleaseStage?: boolean;
}

export type { JIRATicketValidations, JIRATicket };
