function validateDate(date: Date | string) {
	if (!date) return true;
	if (isNaN(new Date(date).getTime())) return true;
	return false;
}

export { validateDate };
