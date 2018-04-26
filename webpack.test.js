const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 项目大的时候提升明显，项目小反而增加了打包时间
const HappyPack = require('happypack')

module.exports = {
	entry: {
		home: './src/app/home.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				// use: 'babel-loader',
				use: 'happypack/loader?id=jsx',
				exclude: [/node_modules/],
			},
			{
				test: /\.(css|scss)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { importLoaders: 1, minimize: true },
					},
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
					{
						loader: 'css-loader',
						options: { importLoaders: 1, minimize: true },
					},
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
		},
	},
	optimization: {},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		'react-router-dom': 'ReactRouterDOM',
	},
	plugins: [
		new webpack.DefinePlugin({
			// 'process.env': {
			//     NODE_ENV: '"production"'  // 制定了mode=production,默认NODE_ENV=production
			// },
			__LOCAL__: false,
			__TEST__: true,
			__PRO__: false,
		}),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'src/template/index.html',
		}),
		new HappyPack({
			id: 'jsx',
			use: [
				{
					path: 'babel-loader',
				},
			],
			threads: 4,
		}),
		// production环境下自动压缩,下面这行可以注释掉
		// new UglifyJSPlugin(),
	],
}
