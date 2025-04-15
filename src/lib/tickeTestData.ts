export const features = [
	{
		_id: '00000000000000000',
		name: 'Alerts',
		details: 'System health checks.',
		startDate: '07/19/23',
		priority: '3',
		plannedReleaseDate: '05/17/2025',
		coreCapability: 'Integrate Data',
		associatedJiraTickets: [],
		releaseStages: []
	}
];

export const milestones = [
	{
		_id: '235723409675906',
		name: 'PI0',
		details: 'The first Planning Increment for EM&C',
		startDate: '07/19/2023',
		endDate: '10/17/2023'
	}
];

export const estimate = {
	_id: '375198043765980670',
	completionPercentile: 20,
	milestoneId: '235723409675906',
	estimateDate: '10/10/23',
	createdAt: '04/11/2025'
};

export const jiraTickets = [
	{
		_id: '0000000000000111111',
		name: 'KAH-3400',
		details: 'PI0 EEM Alerts Discovery (Data Ingestion/Interfaces, Frontend, Backend)',
		startDate: '07/19/23',
		originalPlannedEndDate: '10/26/23',
		featureId: '00000000000000000',
		releaseStages: [],
		milestones: [],
		OPR: 'Kahless',
		estimates: [],
		createdAt: '04/11/2025',
		updatedAt: '04/11/2025'
	}
];

// Feature	Epic Decription	JIRA Ticket	Start Date	Start PI	Planned End Date	Latest End Date	Progress
// Alerts	PI0 EEM Alerts Discovery (Data Ingestion/Interfaces, Frontend, Backend)	KAH-3400	7/19/23 10:22	PI0	10/26/2023	10/24/23 14:22	Released to Master
// Spectra/EEM Browser	PI0 EEM Browser Discovery (Data Ingestion, Interfaces, Frontend, Backend)	KAH-3399	7/19/23 10:20	PI0	10/26/2023	10/24/23 14:23	Released to Master
// EEM Workup	PI0 EMI Workup Discovery (Data Ingestion/Interfaces, Frontend, Backend)	KAH-3402	7/19/23 12:30	PI0	10/26/2023	10/24/23 14:23	Released to Master
// Spectra/EEM Browser	PI1 EEM Browser- provide search, filter, and paging for EEM Service, * provide a way to visualization geolocations,  EEM events on transitioning to the EEM Browser tile from an EEM alert	KAH-3594	10/17/23 7:43	PI1	2/1/2024	1/30/24 2:25	Released to Dev
// Alerts	PI2 Alerts - Search Alers Description and Spectra Integration	KAH-3873	1/25/24 10:46	PI2	4/25/2024	4/1/24 18:44	Released to Dev
// Global View	PI2 Global View- Object Display Panel, Longitude Add, Handle inconsistent geolocation data	KAH-3937	1/26/24 13:30	PI2	4/25/2024	4/22/24 9:09	Released to Dev
// Spectra/EEM Browser	PI2 EEM Browser- Updates for blank spectra fields, live updates	KAH-3871	1/25/24 9:11	PI2	4/25/2024	5/3/24 0:20	Released to Dev
// Alerts	Alerts Backlog- Updates Available Button, Alerts subtype, Reorg	KAH-4234	4/30/24 9:19	PI3	7/31/2024	8/1/24 0:00	Released to Dev

// Alerts	PI3 Alerts- Revise alert description, collapsible alets	KAH-4249	5/2/24 12:28	PI3	7/31/2024	8/1/24 0:00	Released to Dev
// Spectra/EEM Browser	PI3 EEM Browser- Performance issue, edge case of NATO disseminations	KAH-4248	5/2/24 12:13	PI3	7/31/2024	8/1/24 0:00	Released to Dev
// Alerts	PI4 Alerts- display both ACK'ed and UNACK'ed alerts and Kratos progress on Integrating EMI summary information via UDL	KAH-4504	7/16/24 10:01	PI4	10/28/2024	11/4/24 14:40	Released to Dev
// EEM Workup	EMI Workup- Create API for EMI workup, Update Spectrum Service to Query RFO by UUID, Add more satellites to mock service for spectra responses, Mock / Experiment with full Event Evolution 'Engineering Tile' UI	KAH-4560	7/23/24 12:07	PI4	10/28/2024	11/4/24 18:21	Released to Dev
// Satellite Manager	PI5 manage satellite transponder data: ingestion, storage, and consumption of satellite transponder Spike and Discovery	KAH-4808	10/31/24 18:17	PI5	2/13/2025	2/6/25 1:19	Released to Dev
// System Health Monitor	"PI5 Enterprise Service Health Monitoring MVP:
// Update Service Health Monitor Configs to include missing services, Enterprise Health UI Tiles, UI Create Enterprise Health Monitoring Tile - Services Tab and Health Statuses
// "	KAH-4824	11/1/24 16:04	PI5	2/13/2025	2/8/25 0:39	Released to Dev
// Alerts	PI5 Alerts: change Alert sources of Kahless and Spectra to SIOD, Add Originating Organization & System Fields to Kahless Header	KAH-4847	11/4/24 13:47	PI5	2/13/2025	2/5/25 17:27	Released to Dev
// Satellite Manager	"PI6 manage satellite transponder data: manage the ingestion, storage, and consumption of satellite transponder data from multiple sources including EMS, Kratos, and user input. Improvements and Feasibility
// "	KAH-5156	2/6/25 1:01	PI6	2/3/2025		Ice Box
// SVU	PI6 Event Evolution & SVU Improvements	KAH-5199	2/10/25 13:21	PI6	2/3/2025		Ice Box
// System Health Monitor	"PI6 Enterprise Service Health Monitoring Future Updates: User guide update for process based health monitoring indicators, UX revisions for global UI/UX health monitoring, Add config loader to Event Monitor Service to load event metadata
// "	KAH-5155	2/6/25 0:30	PI6	2/3/2025		Ice Box
// Alerts	PI6 Alerts: UX for displaying RBAC impacted components, Add originating system and originating organization for alerts	KAH-5153	2/5/25 17:23	PI6	2/3/2025		Ice Box
// EEM Workup	PI6 EEM Workup/Browser: SEIT and backend tasks for RKF (25+ tasks)	KAH-5149	2/4/25 14:24	PI6	2/3/2025		Ice Box
