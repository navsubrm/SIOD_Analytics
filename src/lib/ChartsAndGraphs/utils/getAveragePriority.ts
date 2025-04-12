export function getAveragePriority(priorityAssignments: TrackingItemPriority[]) {
	let sum = 0;
	priorityAssignments.forEach((el) => (sum += el.priority));
	return sum / priorityAssignments.length;
}
