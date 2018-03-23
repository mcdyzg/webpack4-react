## Introduction

技术栈：

- webpack
- antd
- redux
- React
- React-Router-Dom
- fetch(whatwg-fetch)

特性：

- 可使用动态import或bundle-loader(require.ensure)进行页面异步加载
- 使用react-hot-loader实现热加载
- 请求模块封装fetch，并支持添加请求前后的回调事件。

babel配置

```js
"presets": [
    ["env", {
        "modules": false
    }],
    "react",
],
"env": {
    "development": {
        "plugins": ["react-hot-loader/babel"]
    }
},
"plugins": [
    "transform-decorators",
    "transform-object-rest-spread",
    "syntax-dynamic-import",
    "transform-class-properties",
    ["transform-runtime", {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": "babel-runtime"
    }]
]
```
图省事可以直接babel-preset-stage-0搞定

## webpack splitChunks配置

在默认配置上做了部分改动：对于同步加载的非node_modules模块(size>30k)，当有两个入口文件使用到该模块的时候，会抽出common包。

```js
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
        reuseExistingChunk: true
    },
    vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
    }
}
```


## Usage

development:
```
npm install

npm start
```
production:
```
npm run build
```
