function isJSON(str: string) {
	if (str == '') return false;
	try {
		JSON.parse(str);
		return true;
	} catch (err) {
		console.log(JSON.parse(str));
		console.log('error from isJSON', err);
		return false;
	}
}

export { isJSON };
