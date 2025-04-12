const testJSON = (str: string) => {
	if (str == '') return false;
	try {
		JSON.parse(str);
		return true;
	} catch (err) {
		console.log('error from testJSON', err);
		return false;
	}
};

export { testJSON };
