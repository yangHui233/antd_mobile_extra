import React from 'react'
import { Icon } from 'antd-mobile';
import './style/index.less'


interface param{
    title:string;
    type:string|number;
    closeType?:string|number;
    themeColor?:string
}
const PRECLASS = 'biz-'
class DialogTitle extends React.Component<param,any>{
    constructor(props){
        super(props)
    }
    handleStyle(){
        let {
            themeColor,
            type
        } = this.props
        switch(Number(type)){
            case 1:
            case 2:
                return {}
            case 3:
                return {
                    background:themeColor
                }
        }
        
    }
    render(){
        let { 
            title,
            type,
            closeType=''
        } = this.props;

        return (
            title
            ?
            <div className={`${PRECLASS}dialog-title ${PRECLASS}dialog-title${type}`}
                 style={this.handleStyle.apply(this)}
                 dangerouslySetInnerHTML={{__html:title}}>
                 {
                     closeType == 1
                     ?
                     <Icon type="cross" color="#f8f8f8" size={'sm'} />
                     :
                     ''
                 }
            </div>
            :
            ''

        )
    }
}

export default DialogTitle

