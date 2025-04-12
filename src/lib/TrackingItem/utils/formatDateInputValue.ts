function formatDateInputValue(date: Date | string) {
	const dateValue = new Date(date);
	const year = dateValue.getUTCFullYear();
	const month = dateValue.getUTCMonth();
	const day = dateValue.getUTCDate();
	const returnDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

	return returnDate;
}

export { formatDateInputValue };
