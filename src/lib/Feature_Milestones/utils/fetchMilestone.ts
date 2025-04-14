async function fetchMilestone(id: string) {
	const response = await fetch(`/api/milestone/get-milestone-by-id?id=${id}`);

	const data = await response.json();

	return data;
}

export { fetchMilestone };
