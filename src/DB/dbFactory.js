import 'whatwg-fetch'
import param from 'object-param'
function isPlainObject(obj) {
	return Object.getPrototypeOf(obj) === Object.prototype
}
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}
class fetchPlus {
	constructor() {
		this.context = {}

		// 发送请求之前的回调函数
		this.beforeSendMiddleWare = {}

		// 发送请求之后的回调函数
		this.afterSendMiddleWare = {}
	}
	// 创建一个请求块，例如所有课程相关的请求可以指定course，调用的时候(new fetchPlus()).course.getList。
	create(name, reqList) {
		// this.context[name] = Object.assign((this.context[name] || {}),this.handleReqList(reqList))
		this.context[name] = this.handleReqList(reqList, name)
	}
	handleReqList(reqList, contextName) {
		let t = this
		for (let reqName in reqList) {
			let reqConfig = reqList[reqName]
			reqList[reqName] = t.transConfigToFetch(reqConfig, contextName)
		}
		return reqList
	}
	transConfigToFetch(config, contextName) {
		let t = this
		return data => {
			// 调用发送前回调函数
			let cb =
				t.beforeSendMiddleWare[contextName] ||
				t.beforeSendMiddleWare.total ||
				null
			if (typeof cb === 'function') {
				let cbData = cb(data)
				// 如果回调函数返回对象，将以返回结果作为本次请求参数
				if (cbData && isPlainObject(cbData)) {
					data = cbData
				}
			}

			let { url = '', method = '' } = config
			// 默认请求带上cookie
			const option = {
				credentials: 'same-origin',
			}
			if (method.toUpperCase() === 'POST') {
				Object.assign(option, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'post',
					body: JSON.stringify(data),
				})
			} else {
				url += `?${param(data)}`
			}
			return fetch(url, option)
				.then(data => data.json())
				.then(
					data => {
						// 调用请求发送后的成功回调函数
						let cb =
							t.afterSendMiddleWare[contextName] ||
							t.afterSendMiddleWare.total ||
							null
						if (isArray(cb) && typeof cb[0] === 'function') {
							// 如果结果是promise那么return出去，如果不是，直接return data
							let result = cb[0](data)
							if (
								result &&
								result.then &&
								typeof result.then === 'function'
							) {
								return result
							}
						}
						return data
					},
					error => {
						// 调用请求发送后失败回调函数
						let cb =
							t.afterSendMiddleWare[contextName] ||
							t.afterSendMiddleWare.total ||
							null
						// 如果返回的是数组，说明有请求回调处理
						if (
							isArray(cb) &&
							cb[1] &&
							typeof cb[1] === 'function'
						) {
							cb[1]({ errorMsg: '请求错误' })
						}
						return Promise.reject({ errorMsg: '请求错误' })
					},
				)
		}
	}
	// 添加发送请求之前要执行的回调函数
	beforeUse() {
		let reqCb = arguments[0]
		let contextName = arguments[1] || 'total'
		if (typeof reqCb === 'function') {
			this.beforeSendMiddleWare[contextName] = reqCb
		}
	}
	// 添加发送请求后要执行的回调函数
	afterUse() {
		let resSuccessCb = arguments[0]
		let resFailCb = arguments[1]
		let contextName = arguments[2] || 'total'
		if (
			typeof resSuccessCb === 'function' ||
			typeof resFailCb === 'function'
		) {
			this.afterSendMiddleWare[contextName] = [resSuccessCb, resFailCb]
		}
	}
}

export default new fetchPlus()
