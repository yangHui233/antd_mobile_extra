/**
 * dialog 基础组件
 */
import React from 'react'
import ReactDOM from 'react-dom'

import '../style/global.less'

class Global extends React.Component<any, any>{
    params: { bodyEl: HTMLElement; top: number; };
    noWrapperComArr: never[];                      
    constructor(props){
        super(props)
        this.params = {
            bodyEl: document.body,
			top: 0
        }
    }
    static dialog(options) {
		this.show('dialog', options)
    }
    static show(flag, options) {
		if (document.getElementById('dialogEle')) {
			   this.hide(flag);
		}
		let div = document.createElement('div');
		let id = document.createAttribute("id");
		div.setAttributeNode(id);
		document.body.appendChild(div);
        id.value = 'dialogEle';
		ReactDOM.render(new options.dialogContent({
            ...options
        }).getContent(), div);
    }
    static hide(type) {
		let dialogEle = document.getElementById('dialogEle');
		let ele;
		switch (type) {
			case 'dialog':
				ele = dialogEle;
				break;
			default:
				break;
		}
		if (ele) {
			try {
				ReactDOM.unmountComponentAtNode(ele);
				document.body.removeChild(ele);
			} catch (error) { }

			return;
		}
	}
    componentDidMount(){
        this.stopBodyScroll(true);
    }
    componentWillUnmount(){
        this.stopBodyScroll(false);
    }
    stopBodyScroll (isFixed) {
        if (isFixed) {
            this.params.top = window.scrollY;
            this.params.bodyEl.style.position = 'fixed';
            this.params.bodyEl.style.top = -this.params.top + 'px';
        } else {
            this.params.bodyEl.style.position = '';
            this.params.bodyEl.style.top = '';
            window.scrollTo(0, this.params.top) // 回到原先的top
        }
    }
    dialogCli(e){
        // 阻止事件冒泡
        e && e.stopPropagation()
    }
    domRender(jsx){
        let { 
            opacity=0.7
        }=this.props;
        let style={
	    	"background": `rgba(0,0,0,${opacity})`
        }
        let {
            onMaskClick = ()=>{},
            isNoWrapper,//是否用common-dialog-wrapper包裹
            dialogCalssName="",//外层包裹div类名
            borderRadius
        } = this.props;

        return <div className='common-dialogmask'
                onClick={onMaskClick}
                style={style}>
                {
                    isNoWrapper
                    ?
                    jsx
                    :
                    <div className={'common-dialog-wrapper '+dialogCalssName}
                         style={{'borderRadius':borderRadius?borderRadius:'10px'}}
                         onClick={this.dialogCli.bind(this)}>
                        {jsx}
                    </div>  
                }
                              
           </div> 
    }
}

export default Global

