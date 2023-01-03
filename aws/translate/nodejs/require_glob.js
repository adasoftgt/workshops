module.exports = (express, app) => {
	var glob = require('glob')
	var path = require('path')
	const config = require('./config')

	app.config = config

	glob.sync('./routes/**/*.js',{
		ignore: [
			'./routes/**/*.test.*',
			'./routes/**/*.spec.*',
		]
	}).forEach(function (file) {
		require(path.resolve(file))(express, app);
	});
};

