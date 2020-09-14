---
order: 0
title: 弹框组件
---


````jsx
import { DialogCom } from 'antd_mobile_extra';


class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        DialogCom.dialog({
            dialogContent:DialogCom,
            opacity:'0.2',
            title:'标题',
            content:'内容',
            btnParam:{
                type:1,
                list:[{
                    customAttr:{
                        ['data-zybd']:'1'
                    },
                    txt:'cancel',
                    onClick:()=>{
                        GetDialogBase.hide('dialog')
                    }
                },{
                    txt:'ok',
                    onClick:()=>{
                        GetDialogBase.hide('dialog')
                    }
                }]
            },
        })
    }
    render(){
        return ''
    }
}

ReactDOM.render(<Test/>, mountNode);
````
