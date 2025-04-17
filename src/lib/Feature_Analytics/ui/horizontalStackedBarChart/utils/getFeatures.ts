async function getFeatures() {
	const response = await fetch('/api/features/get-feature-list');
	const data = await response.json();

	return data;
}

export { getFeatures };
