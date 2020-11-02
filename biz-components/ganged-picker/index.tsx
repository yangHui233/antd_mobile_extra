import React from 'react'
import Modal from 'antd-mobile/lib/modal/index'
import Icon from 'antd-mobile/lib/icon/index'
import Toast from 'antd-mobile/lib/toast/index'
import axios from 'axios'
import $q from 'q'
import './style/index.less'

class GangedPicker extends React.Component<any, any> {
    refs: any;
    constructor(props) {
        super(props);
        this.state = {
            currentShowIndex: -1,//当前展示列表的级数
            resultData: [],
            listData: [],
            initStatus:0,//首次获取数据接口状态 pending
            isInitShowLoading:false,//数据初始化加载中，loading加载状态
        };
    }
    componentWillMount() {
        // 界面加载获取数据
        this.getDataAjax(false,true)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible && (this.state.currentShowIndex<0) ){
            if(this.state.initStatus==2){
                // 初次接口请求状态为失败
                this.getDataAjax(true)
            }else{
                this.setState({
                    isInitShowLoading:true
                },()=>{
                    // 初次接口请求状态为pending
                    this.handleLoading(true,true)
                })
                
            }
            
        }
    }

    getData(val) {
        let {
            resultData,
            listData,
            currentShowIndex
        } = this.state
        let {
            urlArr
        } = this.props

        let maxLayer = urlArr.length;

        resultData = resultData.slice(0, currentShowIndex * 1 + 1)
        // 取出value对应的项
        resultData[currentShowIndex] = listData[currentShowIndex].filter(item => {
            return item.value === val
        })[0]

        this.setState({
            resultData
        }, () => {
            this.props.onChange(resultData)
            // 当前选择层为最后一层，则返回数据
            if ((currentShowIndex === (maxLayer - 1)) && (resultData.length === maxLayer)) {
                this.sendResult()
                return;
            }

            this.getDataAjax(true)
        })
    }
    sendResult() {
        let {
            resultData
        } = this.state
        // 关闭弹框，返回数据
        this.props.getResult(resultData)
        this.props.onClose && this.props.onClose()
    }

    getStyle(index) {
        let {
            themeColor = '#ff9933'
        } = this.props;
        let {
            resultData
        } = this.state
        if (index !== false && index < resultData.length) {
            return { 
                border: `2px solid ${themeColor}`,
                background: themeColor 
            }
        } else {
            return { 
                border: `2px solid ${themeColor}`,
                background: `#fff`
            }
        }
    }
    getDataAjax = (isLoading:boolean=true,isFirst:boolean=false) => {
        let {
            currentShowIndex,
            resultData,
            listData
        } = this.state
        let {
            urlArr,
            dealData=()=>{
                return []
            },
            toastFunc,
            errorTxt='请求超时请稍后再试'//接口请求失败，toast提示文案
        } = this.props
        let currentUrlParam =  urlArr[currentShowIndex * 1 + 1]
        let {
            type='get',//ajax请求类型
            url,//请求url
            paramfromt=()=>{
                return {}
            }//发送参数
        } = currentUrlParam

        this.handleLoading(true,isLoading)
        
        this.handleHttp({
            type:type,
            url:url,
            data:paramfromt(resultData[currentShowIndex])
        }).then((res:any) => {
            let data = dealData(res.data) || []
            listData = listData.slice(0, currentShowIndex * 1 + 1)
            listData[currentShowIndex * 1 + 1] = data || [];
            this.setState({
                listData,//渲染数据赋值
                currentShowIndex: currentShowIndex + 1,//修改渲染级数
            })
            // 接口请求参数回来
            if(isFirst){
                this.setState({
                    initStatus:1
                })
            }
            this.handleLoading(false,isLoading)

        }).catch(()=>{
                listData = listData.slice(0, currentShowIndex * 1 + 1)
                listData[currentShowIndex * 1 + 1] = [];
                this.setState({
                    listData,//渲染数据赋值
                })
                if(toastFunc){
                    this.handleLoading(false,isLoading)
                    toastFunc(errorTxt)

                }else{
                    Toast.info(errorTxt,3,()=>{
                        this.handleLoading(false,isLoading)
                    })
                }
                // 接口请求参数回来
                if(isFirst){
                    this.setState({
                        initStatus:2
                    })
                }
        })
    }
    /**
     * 
     * @param isShow true:展示loading/false:隐藏loading
     * @param isLoading 是否展示loading 
     */
    handleLoading(isShow:boolean=false,isLoading:boolean=false){
        let {
            loadingFunc,
            hideLoadingFunc
        } = this.props
        let {
            isInitShowLoading
        } = this.state
        if(isShow){
            if(isLoading){
                loadingFunc ? loadingFunc() : Toast.loading('');
            }
        }else{
            if(isLoading || isInitShowLoading){

                hideLoadingFunc ? hideLoadingFunc() : setTimeout(() => {
                    Toast.hide()
                }, 100);

                if(isInitShowLoading){
                    this.setState({
                        isInitShowLoading:false
                    })
                }
            }
           
        }
    }
    handleHttp = (params)=>{
        const defer = $q.defer()
        let {
            url,
            type,
            data
        } = params
        interface theObj {
            url: string;
            type: string;
            [x: string]: any; //动态添加属性
        }
        let paramsData:theObj = {
            url,
            type
        }
        switch (params.type) {
            case 'get':
                paramsData.params = data
                break
            case 'post':
                paramsData.data = data
                break
            default:
                break
        }
        axios(paramsData).then(res=>{
            defer.resolve(res)
        }).catch(err=>{
            defer.reject(err)
        })
        return defer.promise;
    }

    handleCli(item) {
        this.getData(item.value)
    }
    handleTitleCli(index) {
        let {
            currentShowIndex,
            listData,
            resultData
        } = this.state
        let {
            urlArr
        } = this.props

        let maxLayer = urlArr.length;

        if (index === currentShowIndex) {
            return;
        }
        if (index < listData.length) {
            // 获取选中项展示界面
            this.setState({
                currentShowIndex: index
            })
            return;
        }
        // 请求获取当前项数据
        if (index < maxLayer) {
            this.getData(resultData[listData.length - 1].value)
        }

    }
    getStyleTxt(index) {
        let {
            currentShowIndex
        } = this.state
        let {
            themeColor = '#ff9933'
        } = this.props
        if (Number(index) === Number(currentShowIndex)) {
            return {
                color: themeColor
            }
        }
        return {
            color: '#666'
        }
    }
    render() {
        let {
            listData = [],
            currentShowIndex = 0,
            resultData
        } = this.state
        let {
            themeColor = '#ff9933',
            title = '请选择',
            urlArr = [],
            className = '',
            animationType = 'slide-up',
            onClose = () => {},
            transparent = true,
            visible
        } = this.props

        return (
            currentShowIndex >= 0 ?
                <Modal
                    popup
                    className={'am-list-address-modal ' + className}
                    visible={visible}
                    animationType={animationType}
                    onClose={onClose}
                    transparent={transparent}
                >
                    <div className='am-list-address-modal-wrapper'>
                        <div className='am-list-address-modal-title'>
                            <div className='am-list-address-modal-title-txt'>
                                {title}
                            </div>

                            <Icon type='cross'
                                color={'#ccc'}
                                onClick={() => {
                                    onClose()
                                }} />
                        </div>
                        <div className='am-list-address-modal-title-list-wrapper'>
                            {
                                resultData.length == 0 || !resultData[0].label
                                    ?
                                    <div className='am-list-address-modal-title-item'>
                                        <div className='am-list-address-modal-title-item-round unselect'
                                            style={this.getStyle(false)}></div>

                                        <div className='am-list-address-modal-title-item-txt'
                                            style={this.getStyleTxt(0)}>
                                            {urlArr[0].title}
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        {
                                            resultData.map((item, index) => {
                                                return item && item.label && <div className='am-list-address-modal-title-item'
                                                    style={
                                                        {
                                                            borderLeft: index > 0 ? `2px solid ${themeColor}` : `2px solid rgba(0,0,0,0)`
                                                        }
                                                    }
                                                    onClick={this.handleTitleCli.bind(this, index)}
                                                    key={index}>
                                                    <div className={`am-list-address-modal-title-item-round ${index === resultData.length - 1 ? 'unselect' : 'selected'}`}
                                                        style={this.getStyle(index)}>
                                                    </div>
                                                    <div className={`am-list-address-modal-title-item-txt`}
                                                        style={this.getStyleTxt(index)}>
                                                        {item.label}
                                                    </div>
                                                </div>
                                            })
                                        }
                                        {
                                            resultData.length < urlArr.length
                                                ?
                                                <div className='am-list-address-modal-title-item'
                                                    style={
                                                        {
                                                            borderLeft: `2px solid ${themeColor}`
                                                        }
                                                    }
                                                    onClick={this.handleTitleCli.bind(this, resultData.length)}>
                                                    <div className='am-list-address-modal-title-item-round unselect'
                                                        style={this.getStyle(false)}></div>
                                                    <div className='am-list-address-modal-title-item-txt'
                                                        style={this.getStyleTxt(resultData.length)}>
                                                        {urlArr[resultData.length].title}
                                                    </div>
                                                </div>
                                                :
                                                ''
                                        }


                                    </div>
                            }
                        </div>
                        <div className='am-list-address-modal-list-hit'>
                            {urlArr[currentShowIndex].title}
                        </div>
                        <div className='am-list-address-modal-list'>
                            {
                                listData[currentShowIndex] && listData[currentShowIndex].length>0
                                ?
                                listData[currentShowIndex].map((item, index) => {
                                    return <div className='am-list-address-modal-item'
                                        key={index}
                                        onClick={this.handleCli.bind(this, item)}>
                                        <div className={`am-list-address-modal-item-txt ${(resultData[currentShowIndex] && resultData[currentShowIndex].label && resultData[currentShowIndex].label === item.label) ? 'isselect' : ''}`}
                                            style={{ 'color': (resultData[currentShowIndex] && resultData[currentShowIndex].label && resultData[currentShowIndex].label === item.label) ? (themeColor || '#ff9933') : '#666' }}>
                                            {item.label}
                                        </div>
                                        {
                                            (resultData[currentShowIndex] && resultData[currentShowIndex].label && resultData[currentShowIndex].label === item.label)
                                                ?
                                                <Icon type='check'
                                                    color={themeColor} />
                                                :
                                                ''

                                        }

                                    </div>
                                })
                                :
                                ''
                            }

                        </div>
                    </div>



                </Modal>
                :
                ''
        )

    }
}


export default GangedPicker;
