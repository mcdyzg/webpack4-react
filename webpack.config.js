const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        // 配合antd使用的时候一定要在入口里加react-hot-loader,否则热加载会报错，不使用antd的话可以在此处不加
        'react-hot-loader/patch',
        './src/app/index.js'
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // chunkFilename: '[name].[hash].js',
    },
    mode: 'development',
    // 默认eval模式
    devtool: 'cheap-module-source-map',  //这里需要替换掉默认的devtool设置eval为了兼容后面我们提到的react 的ErrorBoundary
    devServer: {
        contentBase: './',
        hot: true,
        historyApiFallback: true,   //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/$/, to: 'index.html' },
        //         { from: /^\/login/, to: '/login.html' },
        //     ]
        // },

        // 打开一个新窗口
        open:true,

        // 端口代理
        // proxy: {
        //     "/api": {
        //         target: "https://api.github.com/users",
        //         // pathRewrite: {"^/api" : ""}
        //     }
        // }
    },
    resolve: {
        extensions: [
            ".js", ".jsx"
        ],
        alias: {
            '@comp': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@DB': path.resolve(__dirname, './src/db'),
            '@store': path.resolve(__dirname, './src/store'),
            '@reducers': path.resolve(__dirname, './src/reducers'),
            '@actions': path.resolve(__dirname, './src/actions'),
            '@utils': path.resolve(__dirname, './src/utils'),
        }
    },
    optimization: {
		splitChunks: {
            // chunks: "initial",  //设置成all或者async后，会将异步加载的包也打进commons或vendors
            // minChunks: 1,  //本配置项必须>=1，当设置成1时，本模块中所有的引用的模块都会抽出来。
            // minSize: 30000,// 无论是多入口引用的公共组件(不是install的)，还是多入口的引用的node_modules里的模块(install的),只有当模块大于等于30k才能打出一个新的commons包或vendor包。 如果不在缓存组中重新赋值，缓存组默认继承上面的选项，但是还有一些参数是必须在缓存组进行配置的。
			// cacheGroups: {
            //     default: {
            //         // minChunks: 1, //如果此处指定了1并且minSize=0，那么即使单入口也会把所有用到的模块(非install)打入commons.bundle.js里。如果不指定默认按splitChunks的配置来
            //         priority: -20,
            //         reuseExistingChunk: true,
            //         // 如果不指定名字将会app-app2.bundle.js命名
            //         name:'commons',
            //     },
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,  // test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
            //         priority: -10,
            //         name:'vendors',
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
        	// 		priority: -20
            //     },
            //     vendors:{
            //         test: /[\\/]node_modules[\\/]/,
        	// 		priority: -10
            //     }
            // }






            // 改进版配置，详见markdown
            chunks: "async",
            minSize:30000,
            minChunks:1,
            maxAsyncRequests:5,
            automaticNameDelimiter:'~',
            maxInitialRequests:3,
            name:true,
			cacheGroups: {
                default: {
                    chunks:'all',
                    minChunks:2,
                    priority: -20,
                    // minSize: 0,  // 如果注释将使用上面的30000
                    reuseExistingChunk: true,
                    // 如果不指定名字将会app-app2.bundle.js命名
                    // name:'commons',
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                }
			}
		}
	},
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.(css|scss)$/,
                use:[
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    // 'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                // for antd babel-plugin-import
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    // 'less-loader'
                    // less3x版本与按需加载报以下错误
                    // Inline JavaScript is not enabled. Is it set in your options?
                    //https://github.com/ant-design/ant-design/issues/7927#issuecomment-372513256
                    // 解决方案：1:将less降到2.7.3    2:设置如下options
                    { loader: 'less-loader', options: { javascriptEnabled: true } }
                ]
            },
            // json免配置，直接可以import并且支持tree-shaking
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // 'process.env': {
            //     NODE_ENV: '"development"'
            // },
            __LOCAL__: true,
            __TEST__: false,
            __PRO__: false
        }),
        new HtmlWebpackPlugin({
            title: '1111',
            template:'index.html',
        }),

        // 以下两个配合react-hot-loader实现热加载
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
