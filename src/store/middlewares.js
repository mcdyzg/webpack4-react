// ======================================================
// 配置中间件
// ======================================================
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// import { historyMiddleware } from './syncHistoryWithStore'

const middlewares = [thunk]

if (__LOCAL__) {
    /** Redux Logger (P.S: 打印日志会造成轻微的卡顿) **/
    middlewares.push(logger)
}

export default middlewares
