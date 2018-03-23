import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from '@reducers'
import middlewares from './middlewares'
// import syncHistoryWithStore from './syncHistoryWithStore'




// ======================================================
// Middleware Configuration
// ======================================================
const middleware = middlewares

// ======================================================
// Store Enhancers
// ======================================================
const enhancers = []
if(__LOCAL__&&window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

// ======================================================
// 实例化 Store
// ======================================================
const store = createStore(
    createRootReducer(),
    window.__INITIAL_STATE__ || {
        user: 10,
        counter: {
            title: '我是原始title',
            urllist: {
                url: '原始url',
            },
            // 是否正在加载中
            loading:false,
            date: Date.now()
        },
    }, // 前后端同构（服务端渲染）数据同步
    compose(
        applyMiddleware(...middlewares),
        ...enhancers
    )
)

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
    });
}

export default store

// ======================================================
// 增强版 history
// ======================================================
// export const history = syncHistoryWithStore(store)
