import React from 'react'
import GetDialogBase from '../_util/getDialogBase'
import './style/index.less'


const PRECLASS = 'biz-dialog-loading-'
class DialogLoad extends GetDialogBase{
    interval: any;
    static className: string;
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            time:props.countDownTime||10,//倒计时
        };
        this.interval=null;
    }
    componentDidMount(){
        let {
            time
        } = this.state
        let {
            succFun=()=>{}
        } = this.props
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
            this.interval && clearInterval(this.interval)
            // 开始倒计时
            this.interval = setInterval(()=>{

                if(time === 0){
                    // 倒计时共10秒，倒计时结束后自动调用回调
                    clearInterval(this.interval)

                    setTimeout(()=>{
                        console.log('执行到这，关闭弹框==')
                        GetDialogBase.hide('dialog')
                        succFun()
                    },1000)
                    return;
                }

                time--;
                this.setState({
                    time
                })

            },1000)
        },4000)        
    }
    componentWillUnmount(){
        this.interval && clearInterval(this.interval)
    }
    render(){
        let { 
            title,
            hit,
            themeColor,
            centerImg,
            roundImg
        } = this.props;
        let {
            isLoading,
            time
        } = this.state
        return (
            this.domRender(<div className={PRECLASS+'wrapper'}>
            <div className={`${PRECLASS+'ani-wrapper'} ${isLoading?PRECLASS+'circle':''}`}
                 style={{
                    background:'url('+roundImg+') no-repeat center/100% 100%'
                 }}>
                <div className={`${PRECLASS+'txt'} ${isLoading?'loading':'time'}`}
                     style={{
                         color:themeColor,
                         background:isLoading?'url('+centerImg+') no-repeat center/100% 100%':''
                     }}>
                    {
                        isLoading
                        ?
                        ''
                        :
                        time
                    }
                </div>
            </div>
            <div className={PRECLASS+'txt-top'}>
                {title}
            </div>
            <div className={PRECLASS+'txt-bot'}>
                {hit}
            </div>
        </div>)


        )
    }
}
DialogLoad.className='DialogLoad'
export default DialogLoad

