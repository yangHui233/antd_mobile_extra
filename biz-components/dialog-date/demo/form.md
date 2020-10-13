---
order: 0
title: 弹框按钮组件-日历选择
---


````jsx
import { DialogDate } from 'antd_mobile_extra';
import { Button } from 'antd_mobile_extra';


class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
      handleCli(){
       let btnParam={
                    type:1,
                    list:[{
                        txt:'cancel',
                        onClick:(val)=>{
                            console.log('得到结果===',val)
                            DialogDate.hide('dialog')
                        }
                    },
                    {
                        txt:'ok',
                        onClick:(val)=>{
                            console.log('得到结果===',val)
                            DialogDate.hide('dialog')
                        }
                    }]
                }
        DialogDate.dialog({
            dialogContent:DialogDate,
            btnParam,
            title:'title',
            titleType:3
        })
    }
    render(){
        return <Button onClick={
                                this.handleCli.bind(this)
                            }>日历选择</Button> 
    }
}

ReactDOM.render(<Test/>, mountNode);
````
