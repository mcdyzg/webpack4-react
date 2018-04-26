import React from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import { Button } from 'antd'
import store from '@store/index.js'
import { Provider } from 'react-redux'

// dynamic import实现异步加载
import DynamicImport from '@modules/DynamicImport'
const Counter = DynamicImport(() =>
	import(/* webpackChunkName: "Counter" */ '@pages/Counter'),
)

// dynamic import实现异步加载
const AsyncPage = DynamicImport(() =>
	import(/* webpackChunkName: "AsyncPage" */ '@pages/AsyncPage'),
)

// bundle-loader实现异步加载
// import Bundle from '@modules/Bundle'
// import CounterC from 'bundle-loader?lazy&name=counter!@pages/Counter';
// const Counter = Bundle(CounterC)

import Child1 from '@pages/Child1'
import { text } from '@modules/text'
// console.log(text)

// import Counter from '@pages/Counter'
// import AsyncPage from '@pages/AsyncPage'

class App extends React.Component {
	componentDidMount() {}
	render() {
		return (
			<Provider store={store}>
				<HashRouter>
					<div>
						主页
						<Button>主页按钮</Button>
						<Child1 />
						<Route path="/counter" component={Counter} />
						<Route path="/async1" component={AsyncPage} />
					</div>
				</HashRouter>
			</Provider>
		)
	}
}

export default hot(module)(App)
