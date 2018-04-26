const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app/index.js',
		// app2: './src/app/index2.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				use: 'babel-loader',
				exclude: [/node_modules/],
			},
			{
				test: /\.(css|scss)$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					// 'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				// for antd babel-plugin-import
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					// 'less-loader'
					// less3x版本与按需加载报以下错误
					// Inline JavaScript is not enabled. Is it set in your options?
					//https://github.com/ant-design/ant-design/issues/7927#issuecomment-372513256
					// 解决方案：1:将less降到2.7.3    2:设置如下options
					{
						loader: 'less-loader',
						options: { javascriptEnabled: true },
					},
				],
			},
			// json免配置，直接可以import并且支持tree-shaking
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@comp': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@modules': path.resolve(__dirname, './src/modules'),
			'@DB': path.resolve(__dirname, './src/db'),
			'@store': path.resolve(__dirname, './src/store'),
			'@reducers': path.resolve(__dirname, './src/reducers'),
			'@actions': path.resolve(__dirname, './src/actions'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
	optimization: {
		splitChunks: {
			// 无脑将同步模块抽出来
			// chunks: "initial",
			// minChunks: 1,
			// minSize: 30000,
			// cacheGroups: {
			//     default: {
			//         priority: -20,
			//         // minSize: 0,  // 如果注释将使用上面的30000
			//         reuseExistingChunk: true,
			//         // 如果不指定名字将会app-app2.bundle.js命名
			//         name:'commons',
			//     },
			//     vendors: {
			//         test: /[\\/]node_modules[\\/]/,
			//         priority: -10,
			//         name:'vendor',
			//     }
			// }

			// // webpack4.2.0默认配置
			// chunks:'async',
			// minSize:30000,
			// minChunks:1,
			// maxAsyncRequests:5,
			// automaticNameDelimiter:'~',
			// maxInitialRequests:3,
			// name:true,
			// cacheGroups:{
			//     default:{
			//         reuseExistingChunk: true,
			// 		minChunks: 2,
			// 		priority: -20,
			//     },
			//     vendors:{
			//         test: /[\\/]node_modules[\\/]/,
			// 		priority: -10
			//     }
			// }

			// 改进版配置，详见markdown
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			automaticNameDelimiter: '~',
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				default: {
					chunks: 'all',
					minChunks: 2,
					priority: -20,
					// minSize: 0,  // 如果注释将使用上面的30000
					reuseExistingChunk: true,
					// 如果不指定名字将会app-app2.bundle.js命名
					// name:'commons',
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
			},
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			// 'process.env': {
			//     NODE_ENV: '"production"'
			// },
			__LOCAL__: false,
			__TEST__: false,
			__PRO__: true,
		}),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'react project',
			template: 'index.html',
			// filename:'projectName.html'
		}),
		// production环境下自动压缩,下面这行可以注释掉
		// new UglifyJSPlugin(),
	],
}
