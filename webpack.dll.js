var path = require("path");
const webpack = require('webpack');

module.exports = {
	context: __dirname,
    mode:'production',
	entry: ["react","react-dom",'react-router-dom'],
	output: {
		filename: "vendor-1.0.0.js", // best use [hash] here too
		path: path.resolve(__dirname, "dist"),
		library: "vendor_lib_[hash]"
	},
	plugins: [
		new webpack.DllPlugin({
			name: "vendor_lib_[hash]",
			path: path.resolve(__dirname, "dist/vendor-manifest.json")
		})
	]
};
