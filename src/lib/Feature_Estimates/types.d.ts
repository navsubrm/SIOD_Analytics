interface JIRATicketEstimate {
	_id: string;
	completionPercentile: number;
	milestoneId: string;
	estimateDate: Date;
	createdAt: Date;
}
interface JiraTicketEstimatesValidations {
	missingCompletionPercentile?: boolean;
	invalidCompletionPercentile?: boolean;
	missingEstimateDate?: boolean;
	invalidEstimateDate?: boolean;
	missingMilestoneId?: boolean;
}

export type { JIRATicketEstimate, JiraTicketEstimatesValidations };
