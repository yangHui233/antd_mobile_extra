---
order: 0
title: 弹框组件
---


````jsx
import { DialogComBottom } from 'antd_mobile_extra';
import { Button, WhiteSpace, WingBlank } from 'antd_mobile_extra';

class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    handleCli(info){
        DialogComBottom.dialogBottom(info)
    }
    render(){
        let data = [
            {
                title:'单个按钮',
                list:[{
                    hit:'样式一',
                    param:{
                        dialogContent:DialogComBottom,
                        title:'标题',
                        content:'内容',
                        onMaskClick: () => {
                            DialogComBottom.hideBottom('dialog')
                        },
                        btnParam:{
                            type:1,
                            list:[{
                                customAttr:{
                                    ['data-zybd']:'1'
                                },
                                txt:'ok',
                                onClick:()=>{
                                    DialogComBottom.hideBottom('dialog')
                                }
                            }]
                        }, 
                    },
                }]
            }
        ]
        return (
             <WingBlank>
                {
                    data.map((item,index)=>{
                        return (
                            <div key={index}>
                                {item.title}
                                <WhiteSpace />
                                {
                                    item.list.map((info,i)=>{
                                        return <div key={i}>
                                            <Button onClick={
                                                this.handleCli.bind(this,info.param)
                                            }>{info.hit}</Button><WhiteSpace />
                                        </div>
                                    })
                                }
                            </div>
                        )
                    })
                }
               
             </WingBlank>
        )
    }
}

ReactDOM.render(<Test/>, mountNode);
````
