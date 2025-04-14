async function fetchFeature(id: string) {
	const response = await fetch(`/api/features/get-feature-by-id?id=${id}`);

	const data = await response.json();

	return data;
}

export { fetchFeature };
