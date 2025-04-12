function validatePriority(priority: number) {
	const validations: TrackingItemValidations = {};
	if (!priority) validations.missingPriority = true;
	if (isNaN(priority)) validations.invalidPriority = true;

	return validations;
}

export { validatePriority };
