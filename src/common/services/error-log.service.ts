const errorLog = {
	/**
	 * Will log the  error
	 * @error: error thrown
	 * @info: more info optional
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	log: function (error: any, info: any) {
		console.log(error, info);
	},
};
export default errorLog;