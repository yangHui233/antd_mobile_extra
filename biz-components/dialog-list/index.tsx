import React from 'react'
import Icon from 'antd-mobile/lib/icon/index'
import {
    colorRgb
} from '../_util/utils'
import './style/index.less'


interface param{
    listParam:any
    selectCallback?:Function
    themeColor:string
    iconType?:string
}
const PRECLASS = 'biz-dialog-'
class DialogList extends React.Component<param,any>{
    constructor(props){
        super(props)
        this.state={
            selectIndex:props.listParam ? props.listParam.selectIndex:''
        }
        this.handleItemCli(this.state.selectIndex)
    }

    handleItemCli(index){
        let {
            selectCallback,
            listParam
        } = this.props
        if(index>=0 && index<listParam.list.length){
            this.setState({
                selectIndex:index
            })
            selectCallback && selectCallback(listParam.list[index],index)
        }else{
            console.log('索引值不合法==')
        }

    }
    handleItemstyle(index){
        let {
            selectIndex,
        } = this.state
        let {
            themeColor,
            listParam
        } = this.props
        let {
            type
        } = listParam
        switch(type*1){
            case 1:
                if(index==selectIndex){
                    return {
                        background:`rgba(${colorRgb(themeColor)},0.2)`,
                        color:themeColor,
                        border:`1.5px solid ${themeColor}`
                    }
                }
                return {}
            default:
                return {}
        }
        
    }
    handleKey(index){
        return this.props.listParam.type==4 ? (index > 10 ? index:('0'+index)) :''
    }
    handleIconStyle(){
        let {
            themeColor,
            listParam
        } = this.props
        let {
            type,
        } = listParam
        if(type == 4){
            return {
                color:`rgba(${colorRgb(themeColor)},0.3)`
            }
        }else if(type == 5){
            return {
                background:themeColor
            }
        }
        
    }

    render(){
        let {
            selectIndex,
        } = this.state

        let {
            iconType='check-circle',
            themeColor,
            listParam
        } = this.props
        let {
            type,
            list,
            hit
        } = listParam
        const selectTypeArr = [1,2,3]
        return (
            <div className={`${PRECLASS}list-wrapper`}>
                {
                    hit
                    ?
                    <div className={`${PRECLASS}list-hit`}>
                        {hit}
                    </div>
                    :
                    ''
                }
                
                <div className={`${PRECLASS}list-box ${PRECLASS}list-box${type}`}>
                    {
                        list.map((item,index)=>{
                            return (
                                <div key={index}
                                     style={this.handleItemstyle(index)}
                                     className={`${PRECLASS}item-wrapper ${selectIndex==index?(PRECLASS+'item-selected'):''}`}
                                     {...item.customAttr}
                                     onClick={this.handleItemCli.bind(this,index)}>
                                     {
                                         [4,5].includes(type*1)
                                         ?
                                         <div className={`${PRECLASS}item-icon`}
                                              style={this.handleIconStyle()}>
                                             {this.handleKey.call(this,index)}
                                         </div>
                                         :
                                         ''
                                     }
                                     <div className={`${PRECLASS}item-txt`}>
                                        {item.txt}
                                     </div>
                                     {
                                         selectTypeArr.includes(type*1)
                                         ?
                                         selectIndex==index
                                         ?
                                        <Icon type={iconType} 
                                              color={themeColor}
                                              size='md' />
                                         :
                                         <div className={`${PRECLASS}item-select-circle`}/>
                                         :
                                         ''
                                     }
                                     
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        )
    }
}

export default DialogList

