function validateString(string: stiring): boolean {
	if (!string) return true;
	if (string == '') return true;
	return false;
}

export { validateString };
