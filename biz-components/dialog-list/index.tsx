import React from 'react'
import Icon from 'antd-mobile/lib/icon/index'
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
            selectIndex:props.selectIndex
        }
    }
    colorRgb =  (str) =>{
        // 16进制颜色值的正则
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 把颜色值变成小写
        var color = str.toLowerCase();
        if (reg.test(color)) {
          // 如果只有三位的值，需变成六位，如：#fff => #ffffff
          if (color.length === 4) {
            var colorNew = "#";
            for (var i = 1; i < 4; i += 1) {
              colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
          }
          // 处理六位的颜色值，转为RGB
          var colorChange = [];
          for (var i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
          }
          return colorChange.join(",");
        } else {
          return color;
        }
    }
    handleItemCli(info,index){
        let {
            selectCallback
        } = this.props
        console.log(info,'info===')
        this.setState({
            selectIndex:index
        })
        selectCallback && selectCallback(info,index)
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
        console.log(this.colorRgb(themeColor),'themeColor==')
        switch(type*1){
            case 1:
                if(index==selectIndex){
                    return {
                        background:`rgba(${this.colorRgb(themeColor)},0.2)`,
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
                color:`rgba(${this.colorRgb(themeColor)},0.3)`
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
        console.log(this.colorRgb(themeColor),'themeColor==')
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
                                     onClick={this.handleItemCli.bind(this,item,index)}>
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

