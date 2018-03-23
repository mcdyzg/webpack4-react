import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import { setNewData,getNewTitle,getNewUrl } from '@actions/counter'
import { Button } from 'antd'
import { text } from '@modules/text'
// console.log(text)

class Counter extends PureComponent{
    render(){
        console.log('render')
        return (
            <div className="">
                <h1>我是counter</h1>
                <div className="">
                    我是store上的counter: {this.props.counter.date}
                </div>
                <button onClick={this.props.setNewData.bind(this,Date.now())}>
                    设置新的时间
                </button>
                {/* <Button>子页面按钮</Button> */}



                <br />
                <br />
                <br />
                <br />
                <div className="">
                    我是store上的title: {this.props.counter.title}
                </div>
                <button onClick={this.props.getNewTitle.bind(this,'haha')}>
                    获取新的title
                </button>





                <br />
                <br />
                <br />
                <br />
                <div>
                    我是store上的原始url: {this.props.counter.urllist.url}
                </div>
                <button onClick={this.props.getNewUrl.bind(this,'haha')}>
                    获取新的url
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  	counter: state.counter,
})



const mapDispatchToProps = {
    setNewData :(value)=>setNewData(value),
    getNewTitle:(value)=>getNewTitle({name:value}),
    getNewUrl:(value)=>getNewUrl({name:value}),
}


export default connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Counter)
