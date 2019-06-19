const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		PluginAPI: ['./js/PluginAPI.js']
	},
	output: {
		path: __dirname + '/dist',
		filename: 'bundle-w.js'
	},
	devtool: 'source-map',
	externals: {
		jquery: 'jQuery',
		pm: 'pm'
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: './js/vendors/jquery.postmessage.js',
			to: 'jquery.postmessage.js'
		}]),
		new webpack.DefinePlugin({
			VERSION: JSON.stringify(require('./package.json').version)
		})
	]
};
