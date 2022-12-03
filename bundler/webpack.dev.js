const path = require('path');
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(commonConfiguration, {
	stats: 'errors-warnings',
	mode: 'development',
	devServer: {
		static: {
			watch: true,
			directory: path.join(__dirname, 'dist'),
		},
		watchFiles: ['src/**', 'public/**'],
		port: 3000,
		open: true, // opens the browser automatically
		hot: true, // enables hot reloading
		compress: true, // compresses the code
		historyApiFallback: true, // enables history API fallback
	},
});
