---
order: 0
title: 联动选择picker
---


````jsx
import { GangedPicker } from 'antd_mobile_extra';
import { List } from 'antd_mobile_extra';


class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address:'请选择'
        };
    }
    getResult(res){
        console.log(res)
        let str = ''
        for(let i = 0;i<res.length;i++){
            str+=res[i].label
        }
        this.setState({
            address:str
        })
    }
    onChange(res){
        console.log(res,'变化打印参数')
    }
    render(){
        let {
            address,
            visible
        } = this.state
        return(
                <div>
                    <List.Item arrow="horizontal"
                               onClick={()=>{
                                   this.setState({
                                      visible:true 
                                   })
                               }}>{address}</List.Item>
                    <GangedPicker visible ={visible}
                      onClose={()=>{
                          this.setState({
                                      visible:false 
                                   })
                      }}
                      getResult={this.getResult.bind(this)}
                      onChange={this.onChange.bind(this)}
                      urlArr={[{
                           title:'请选择省份',
                           url:'https://XXX',
                           type:'get',
                           paramfromt:(data)=>{
                                return {}
                           }
                       },{
                           title:'请选择市',
                           url:'https://XXX',
                           type:'get',
                           paramfromt:(data)=>{
                             console.log(data,'data==')
                            return {
                                provinceId:data.value
                            }
                       }
                       }]}
                       dealData={(res)=>{
                            if(res.code==='00000'){
                                let data = res.result.map(item => {
                                    return {
                                        label: item.name,
                                        value: item.id
                                    };
                                });
                                return data
                            }else{
                                return []
                            }

                       }}/>
                </div>

        )
    }
}

ReactDOM.render(<Test/>, mountNode);
````
