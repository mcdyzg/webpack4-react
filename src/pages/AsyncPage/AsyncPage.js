import React,{PureComponent} from 'react'
import { Button } from 'antd'
import { text } from '@modules/text'
// console.log(text)

class AsyncPage extends PureComponent{
    render(){
        return (
            <div className="">
                async page
                {/* <Button>子页面按钮</Button> */}
            </div>
        )
    }
}

export default AsyncPage
