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
