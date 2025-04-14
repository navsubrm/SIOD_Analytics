function formatDateInputValue(date: Date | string | undefined) {
	if (!date) return;
	const dateValue = new Date(date);
	const year = dateValue.getUTCFullYear();
	const month = dateValue.getUTCMonth();
	const day = dateValue.getUTCDate();
	const returnDate = `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`;

	return returnDate;
}

export { formatDateInputValue };
