---
category: Components
type: Extra
title: GangedPicker
subtitle: 联动
---


## API

| Properties                | Descrition                                                         | Type     | Default             |
| --------------- | :----------------------------------------------------------- | -------- | ------------------ |
| urlArr          | `{type:接口请求类型,默认get,title:选择当前项时的标题,url:接口请求url,paramfromt:function 需返回请求参数，该函数默认参数为上一级用户选择的数据,即dealData返回的数据,isLoading:当前请求是否需要loading,默认false}` | array    | -                  |
| dealData        | 接口返回数据的回调 ，需返回对象，且必须有label字段           | Function | 无                 |
| getResult       | 选择最后一项时的回调，返回结果                               | Function | 无                 |
| onClose         | 关闭弹框回调                                                 | Function | 无                 |
| themeColor      | 主题色                                                       | string   | #ff9933            |
| transparent     | 透明背景                                                     | boolean  | true               |
| animationType   | 可选: 'slide-down / up' / 'fade' / 'slide'                   | string   | slide-up           |
| className       | 手动设置 Modal 的 className                                  | string   | 无                 |
| visible         | 对话框是否可见                                               | Boolean  | false              |
| toastFunc       | 接口请求异常（非200），执行该函数，默认参数为提示文案，若无该值，默认执行 Toast.info，其他接口异常可在dealData回调中自行处理 | Function | Toast.info         |
| errorTxt        | 接口请求异常（非200），提示文案                              | string   | 请求超时请稍后再试 |
| loadingFunc     | 组件内部异步请求时执行该函数，可传入loadingFunc方法,若无该值，默认执行Toast.loading('') | Function | Toast.loading('')  |
| hideLoadingFunc | 组件内部异步请求结束时执行该函数，可传入hideLoadingFunc方法,若无该值，默认执行Toast.hide() | Function | Toast.hide()       |


