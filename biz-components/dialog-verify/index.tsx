import React from 'react'
import DialogTitle from '../dialog-title'
import GetDialogBase from '../_util/getDialogBase'
import './style/index.less'

const PRECLASS = 'biz-dialog-verify-'
interface params{
    title:string;
    content:string;
    closeType?:string|number;
    themeColor:string;
    inputType?:string;
    placeHolder?:string;
    maxLength:string|number;
    completeCallback():void;
    totalTime?:number
}
class DialogVerify extends GetDialogBase{
    constructor(props:params) {
        super(props);
        this.state = {
            totalTime:props.totalTime || 60
        };
    }
    handleInput(e){
        let value = e.target.value;
        let {
            maxLength,
            completeCallback
        } = this.props
        if(value.length>=maxLength){
            completeCallback && completeCallback(value)
        }
    }
    render() {
        let{
            title,
            content,
            titleType,
            themeColor='#1890ff',
            closeType,
            inputType='number',
            placeHolder,
            maxLength
        } = this.props
        let {
            totalTime
        } = this.state
        return (
            this.domRender(<div>
                <DialogTitle title={title}
                     type={titleType}
                     themeColor={themeColor}
                     closeType={closeType} />
                <div className={`${PRECLASS}txt`} 
                     dangerouslySetInnerHTML={{__html:content}}></div>
                <input type={inputType}
                       placeholder={placeHolder}
                       maxLength={maxLength}
                       onChange={this.handleInput.bind(this)} />
                <div className={`${PRECLASS}btn`}>

                </div>
            </div>)
        )

    }
}


export default DialogVerify;
