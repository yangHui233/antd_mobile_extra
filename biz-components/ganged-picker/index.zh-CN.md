---
category: Components
type: Extra
title: GangedPicker
subtitle: 联动
---


## API

| 成员        | 说明           | 类型      | 默认值       |
|------------|----------------|--------------------|--------------|
| urlArr     | `{title:选择当前项时的标题,url:接口请求url,paramfromt:()=>{}}`  |   array   |   -  |
| dealData   |   接口返回数据的回调 ，需返回对象，且必须有label字段  | Function |      |
| getResult    | 选择最后一项时的回调，返回结果 | Function|   无  |
| onClose    | 关闭弹框回调 | Function|   无  |
| themeColor    | 主题色 | string|   #ff9933  |
| transparent    | 透明背景 | boolean|   true  |
| animationType    | 可选: 'slide-down / up' / 'fade' / 'slide' | string|   slide-up  |
| className    | 手动设置 Modal 的 className | string|   无  |
| visible    | 对话框是否可见 | Boolean|   false  |


