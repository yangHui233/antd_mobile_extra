import React from 'react'
import './style/index.less'

class btnItem{
    customAttr:object
    txt:string
    [propName: string]: any
}
interface btnParam{
    list:Array<btnItem>,
    type:1 | 2 | 3
}
interface param{
    btnParam:btnParam,
    themeColor:string,
    GetDialogBase:any,
    postData?:any
}

const PRECLASS = 'biz-'

class DialogBtn extends React.Component<param,any>{
    constructor(props){
        super(props)
    }
    handleBtnStyle(index){
        let {
            btnParam,
            themeColor
        } = this.props

        let type = btnParam.type
        let len = btnParam.list.length
        if(type == 1){
            switch (len){
                case 1:
                 return {
                     color:themeColor
                 };
                case 2:
                    if(index===1){
                        return{
                            color:themeColor 
                        }
                    }
                default:
                    break;
            }
        }else if(type == 2){
            switch (len){
                case 1:
                 return {
                     background:themeColor
                 };
                case 2:
                    if(index===0){
                        return{
                            background:themeColor
                        }
                    }
                break;
                default:
                    break;
            }
        }else if(type == 3){
            switch (len){
                case 1:
                 return {
                     background:themeColor
                 };
                case 2:
                    if(index === 1){
                        return{
                            background:themeColor
                        }
                    }
                break;
                default:
                    break;
            }
        }else if(type == 4){
            switch (len){
                case 1:
                 return {
                     color:themeColor,
                     borderColor:themeColor
                 };
                case 2:
                    if(index === 1){
                        return{
                            background:themeColor
                        }
                    }else if(index === 0){
                        return{
                            color:themeColor,
                            borderColor:themeColor
                        }
                    }
                break;
                default:
                    break;
            }
        }
        
    }
    handleBtnCli(fun){
        let {
            postData
        } = this.props
        fun && (postData ? fun(postData) : fun())
    }
    render(){
        let { 
            btnParam={
                type:1,
                borderRadius:0,
                style:{},
                list:[{
                    customAttr:{},
                    txt:'ok',
                    onClick:()=>{
                        this.props.GetDialogBase && this.props.GetDialogBase.hide('dialog')
                    }
                }]
            }
        } = this.props;
        let {
            list = []
        } = btnParam
        return (
            list.length>0
            ?
            <div className={PRECLASS+'dialog-btn-wrapper'+btnParam.type+'_'+list.length}>
                {
                    list.map((item,index)=>{
                        return  <div style={
                                            {
                                            ...(this.handleBtnStyle(index)||{}),
                                            ...(item.style||{})
                                            }
                                        }
                                    className={PRECLASS+'dialog-btn-item'}
                                    key={index}
                                    onClick={this.handleBtnCli.bind(this,item.onClick)}
                                    {...item.customAttr}
                                    dangerouslySetInnerHTML={{__html:item.txt}}>
                                </div>
                    })
                }
            </div>
            :
            ''
        )
    }
}

export default DialogBtn

