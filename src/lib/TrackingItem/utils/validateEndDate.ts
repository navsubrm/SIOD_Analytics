function validateEndDate(date: Date | string) {
	const validations: TrackingItemValidations = {};
	if (!date) validations.missingDate = true;
	if (isNaN(new Date(date).getTime())) validations.invalidDate = true;
	return validations;
}

export { validateEndDate };
