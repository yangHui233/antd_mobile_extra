import React from 'react'
import GetDialogBase from '../_util/getDialogBase'
import Icon from 'antd-mobile/lib/icon/index'
import './style/index.less'

const PRECLASS = 'biz-'
class DialogComBottom extends GetDialogBase{
    constructor(props){
        super(props)
    }
    
    render(){
        let {
            content,
            className='',
            contentHtml
        } = this.props;
        return  this.domRenderBotton(<div className={`${PRECLASS}dialog-com ${className}`}>
            <Icon type='cross'
                color={'#ccc'}
                onClick={() => {
                    GetDialogBase.hideBottom('dialog')
                }} />
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
        </div>)
    }
}

export default DialogComBottom

