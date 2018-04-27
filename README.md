## Introduction

项目开发脚手架

技术栈：

*   webpack
*   antd
*   React
*   React-Router-Dom
*   fetch(whatwg-fetch)

特性：

*   可使用动态 import 或 bundle-loader(require.ensure)进行页面异步加载
*   使用 react-hot-loader 实现热加载
*   请求模块封装 fetch，并支持添加请求前后的回调事件。

## catelog(目录)

```
├── docs              // 文档文件夹
├── dist              // 打包后的资源文件夹
├── src               // 项目
│   ├── app           // 项目入口
│   ├── components    // 公共组件
│   ├── db            // 请求统一管理
│   ├── modules       // 业务组件
│   ├── pages         // 页面
│   └── template      // 模板html文件夹
├── package.json
└── README            // 项目简介
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
