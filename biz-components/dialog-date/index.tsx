import React from 'react'
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import zhCN from 'antd-mobile/lib/date-picker-view/locale/zh_CN';
import DialogBtn from '../dialog-btn'
import DialogTitle from '../dialog-title'
import DatePickerView from 'antd-mobile/lib/date-picker-view';
import GetDialogBase from '../_util/getDialogBase'
import './style/index.less'


let MAXDATE = new Date()
let MINDATE = new Date(2000, 1, 1, 0, 0, 0)

const PRECLASS = 'biz-'

class DialogDate extends GetDialogBase{
    constructor(props){
        super(props)
        let {
            dateParam={}
        } = props
        let defaultVal = dateParam.minDate || MINDATE
        this.state={
            value: defaultVal,
            postData: defaultVal
        }
    }
    onChange = (value) => {
        this.setState({ value },()=>{
            this.props.onChange && this.props.onChange(value)
        });
    }
    /**
     * 该函数修复了日期选择最大年份时，日期默认跳转选中最大日期的问题
     * @param {*} val 当前选中的时间
     * @param {*} index 当前操作的项
     */
    onValueChange=(val,index)=>{
        let MaxYear = MAXDATE.getFullYear()
        let MinYear = new Date().getFullYear()
        if((MaxYear != MinYear) && (index==0) && (val[0]>MinYear)){
            this.setState({
                 value: new Date(val[0], 0, 1)
            });
        }
        this.setState({
            postData:this.state.value
        })
        this.props.onValueChange && this.props.onValueChange(this.state.value)
    }

    render(){
        let { 
            title,
            titleType=1,  
            className='',
            themeColor='#1890ff',
            dateParam={
                minDate:new Date(2000, 1, 1, 0, 0, 0),
                maxDate:MAXDATE
            },
            btnParam={
                type:1,
                list:[{
                    txt:'cancel',
                    onClick:()=>{
                        GetDialogBase.hide('dialog')
                    }
                },
                {
                    txt:'ok',
                    onClick:()=>{
                        GetDialogBase.hide('dialog')
                    }
                }]
            },
            locale=enUs,
            isReversal=false
        } = this.props;
        let {
            postData
        } = this.state
        return (
            this.domRender(<div className={`${PRECLASS}dialog-com ${className}`}>
             <DialogTitle title={title}
                     type={titleType}
                     themeColor={themeColor}/>
             <DatePickerView
                    className={`date-picker-wrapper ${isReversal?'date-picker-wrapper-revert':''}`}
                    locale={locale}
                    mode='date'
                    minDate={dateParam.minDate || MINDATE}
                    maxDate={dateParam.maxDate || new Date()}
                    value={this.state.value}
                    onChange={this.onChange}
                    onValueChange={this.onValueChange}
                />
             <DialogBtn btnParam={btnParam}
                        postData={postData}
                        GetDialogBase={GetDialogBase}
                        themeColor={themeColor}></DialogBtn>
            </div>)
            
        )
    }
}

export default DialogDate

