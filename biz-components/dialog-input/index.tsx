import React from 'react'
import InputItem from 'antd-mobile/lib/input-item/index'
import './style/index.less'

const PRECLASS = 'biz-'

class DialogInput extends React.Component<any, any>{
    constructor(props){
        super(props)
        this.state = {
            dataInputCon: ''
        }
    }

    componentDidMount(){
        if(this.props.dataInput != this.state.dataInputCon){
            this.setState({
                dataInputCon: this.props.dataInput
            })
        }
    }

    getInputData= (data)=>{
        this.setState({
            dataInputCon: data
        })
        this.props.changeInput && this.props.changeInput(data)
    }

    render(){
        const {
            className='',
            placeholder='',
            style={},
            type=1
        } = this.props;

        return  <div className={`${PRECLASS}dialog-input ${className}`}>
            <InputItem
                style={style}
                className={`${PRECLASS}input-${type}`}
                placeholder={placeholder}
                onChange={this.getInputData}
                value={this.state.dataInputCon}
            ></InputItem>
        </div>
    }
}

export default DialogInput

