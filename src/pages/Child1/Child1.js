import React,{Component} from 'react'
import './Child1.scss'
import {name} from './Child1.json'
console.log(name)
import { connect } from 'react-redux'
import { add } from '@actions/user'
import { Button } from 'antd'
import { text } from '@modules/text'
// console.log(text)


class Child1  extends Component{
    componentWillMount(){
        // this.props.add(2)
    }
    componentDidMount(){
        console.log('did mount')
        this.props.add(2)
        // explain: react-redux的connect使用的是属性继承的方式(PPHoc)，connect组件是在componentDidMount里执行subscribe的，但是由于会先执行connect的componentDidMount，再执行当前组件的componentDidMount，这样就会出现如果在当前组件的componentDidMount里执行dispatch的话，那么其实redux是还没有subscribe到当前组件的高阶组件的。也就是说当前组件其实接收到的store是dispatch前的数据。react-redux的解决方法是在subscribe后如果state有改变重新将setState方法重新执行一遍。
    }
    shouldComponentUpdate(){
        console.log('update')
        return true
        // return false
    }
    render(){
        return (<div className="">
            <h1 className='childa'>我是chlid1</h1>
            <div>
                我是store上的数据{this.props.user}
                <button onClick={this.props.add.bind(this,222)}>点击我增加</button>
            </div>
            {/* <Button>子页面按钮</Button> */}
        </div>)
    }
}

const mapStateToProps = (state) => ({
  	user: state.user,
})



const mapDispatchToProps = {
    add :(value)=>add(value)
}


// const mapDispatchToProps = (
//   dispatch,
//   ownProps
// ) => {
//   return {
//     add: (value) => {
//       dispatch(add(value));
//     }
//   };
// }


export default connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Child1)
