const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
	video: './src/videoRenderer.js',
    },

    plugins: [
	new webpack.ProvidePlugin({
	    $: 'jquery',
	    jQuery: 'jquery'
	}),
    ],

    module: {
	rules: [
	    {
		use: 'imports-loader?THREE=three',
	    },
	],
    },

    output: {
	filename: '[name].bundle.js',
	path: path.resolve(__dirname, 'public'),
    }
}
