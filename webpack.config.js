const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 项目大的时候提升明显，项目小反而增加了打包时间
const HappyPack = require('happypack')

module.exports = {
	entry: {
		home: [
			// 配合antd使用的时候一定要在入口里加react-hot-loader,否则热加载会报错，不使用antd的话可以在此处不加
			// 'react-hot-loader/patch',
			'./src/app/home.js',
		],
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		// chunkFilename: '[name].[hash].js',
	},
	mode: 'development',
	// 默认eval模式
	devtool: 'cheap-module-source-map', //这里需要替换掉默认的devtool设置eval为了兼容后面我们提到的react 的ErrorBoundary
	devServer: {
		contentBase: './',
		hot: true,
		historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		// historyApiFallback: {
		//     rewrites: [
		//         { from: /^\/$/, to: 'index.html' },
		//         { from: /^\/login/, to: '/login.html' },
		//     ]
		// },
		// 打开一个新窗口
		open: true,
		// 端口代理
		// proxy: {
		//     "/api": {
		//         target: "https://api.github.com/users",
		//         // pathRewrite: {"^/api" : ""}
		//     }
		// }
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
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		'react-router-dom': 'ReactRouterDOM',
	},
	plugins: [
		new webpack.DefinePlugin({
			__LOCAL__: true,
			__TEST__: false,
			__PRO__: false,
		}),
		new HtmlWebpackPlugin({
			template: 'src/template/index.html',
		}),

		// 以下两个配合react-hot-loader实现热加载
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HappyPack({
			id: 'jsx',
			use: [
				{
					path: 'babel-loader',
				},
			],
			threads: 4,
		}),
	],
}
