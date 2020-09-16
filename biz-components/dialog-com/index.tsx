import React from 'react'
import DialogBtn from '../dialog-btn'
import DialogTitle from '../dialog-title'
import DialogList from '../dialog-list'
import DialogInput from '../dialog-input'
import GetDialogBase from '../_util/getDialogBase'
import './style/index.less'


const PRECLASS = 'biz-'
class DialogCom extends GetDialogBase{
    constructor(props){
        super(props)
    }
    
    render(){
        let { 
            title,
            titleType=1, 
            imgClass,
            content,
            btnParam={
                type:1,
                list:[{
                    customAttr:{},
                    txt:'ok',
                    style:{},
                    onClick:()=>{
                        GetDialogBase.hide('dialog')
                    }
                }]
            }, 
            className='',
            contentHtml,
            themeColor='#1890ff',
            listParam,
            DialogInputData
        } = this.props;
        return  this.domRender(<div className={`${PRECLASS}dialog-com ${className}`}>
        <DialogTitle title={title}
                     type={titleType}
                     themeColor={themeColor}/>

        {
            imgClass
            ?
            <div className={PRECLASS+'img-icon '+imgClass}></div>
            :
            ''
        }
        {
            contentHtml
            ?
            <div className={PRECLASS+'dialog-content'}
                 dangerouslySetInnerHTML = {{ __html: contentHtml}}>
            </div>
            :
            ''
        }
        {
            content
            ?
            <div className={PRECLASS+'dialog-contenttxt'}>
                    {content}                      
            </div>
            :
            ''
        }
        {
            (listParam && listParam.list.length>0)
            ?
            <DialogList listParam={listParam}
                    themeColor={themeColor}/>
            :
            ''
        }

        {
            DialogInputData && 
            <DialogInput
                {...DialogInputData}
            ></DialogInput>
        }
        
        <DialogBtn btnParam={btnParam}
                   GetDialogBase={GetDialogBase}
                   themeColor={themeColor}></DialogBtn>
       
    </div>)
    }
}

export default DialogCom

