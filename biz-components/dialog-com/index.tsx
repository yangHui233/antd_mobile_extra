import React from 'react'
import GetDialogBase from '../_util/getDialogBase'
import './style/index.less'

class DialogCom extends GetDialogBase{
    constructor(props){
        super(props)
    }

    getContent(){
        let { 
            title, 
            imgClass,
            content,
            btnParam={
                type:1,
                list:[{
                    customAttr:{},
                    txt:'ok',
                    onClick:()=>{
                        GetDialogBase.hide('dialog')
                    }
                }]
            }, 
            className,
            contentHtml,
            themeColor='#1890ff'
        } = this.props;
        let btnList = btnParam.list;
        return  this.domRender(<div className={`dialog1${className ? ' ' + className : ''}`}>
        {
            title
            ?
            <div className='dialog-title'>
                {title}
            </div>
            :
            ''

        }
        {
            imgClass
            ?
            <div className={'img-icon '+imgClass}></div>
            :
            ''
        }
        {
            contentHtml
            ?
            <div className='dialog-content'
                 dangerouslySetInnerHTML = {{ __html: contentHtml}}>
            </div>
            :
            ''
        }
        {
            content
            ?
            <div className='dialog-contenttxt'>
                    {content}                      
            </div>
            :
            ''
        }
        {
            btnList.length>0
            ?
            <div className={'btn-wrapper'+btnParam.type+'_'+btnList.length}>
                {
                    btnList.map((item,index)=>{
                        return  <div style={{color:((btnList.length==2 && index==1)||(btnList.length==1))?themeColor:'#666'}}
                                    className='btn-item'
                                    key={index}
                                    onClick={item.onClick}
                                    {...item.customAttr}>
                                    {item.txt}
                                </div>
                    })
                }
            </div>
            :
            ''
        }
       
    </div>)
    }
}

export default DialogCom

