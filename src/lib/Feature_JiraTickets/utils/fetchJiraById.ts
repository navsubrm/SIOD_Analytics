async function fetchJiraById(id: string) {
	const response = await fetch(`/api/jira-tickets/get-jira-by-id?id=${id}`);

	const data = await response.json();

	return data;
}

export { fetchJiraById };
