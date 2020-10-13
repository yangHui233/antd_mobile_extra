---
order: 0
title: loading弹框
---


````jsx
import { DialogLoad } from 'antd_mobile_extra';
import { Button } from 'antd_mobile_extra';
const centerImg = require('./img/money_icon.png')
const roundImg = require('./img/credit-loading.png')
class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    handleCli(info){
       let params={
            dialogContent:DialogLoad,
            title:'title',
            hit:'hit',
            themeColor:'#FFDB52',
            centerImg:centerImg,
            roundImg:roundImg
        }
        DialogLoad.dialog(params)
    }
    render(){
        return <Button onClick={
                                this.handleCli.bind(this)
                            }>loading弹框</Button>
    }
}

ReactDOM.render(<Test/>, mountNode);
````
