const path = require('path');

module.exports = {
    entry: {
	video: './src/videoRenderer.js',
    },

    plugins: [
    ],

    output: {
	filename: '[name].bundle.js',
	path: path.resolve(__dirname, 'public'),
    }
}
