function calcAverage(total: number, item: number): number {
	if (item == 0) return 0;
	return (total / item) * 100;
}

export { calcAverage };
