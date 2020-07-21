---
category: Components
type: Biz
title: GangedPicker
subtitle: 联动
---


## API

| 成员        | 说明           | 类型      | 默认值       |
|------------|----------------|--------------------|--------------|
| urlArr     | `{title:选择当前项时的标题,url:接口请求url,paramfromt:()=>{}}`  |   array   |   -  |
| dealData   |   接口返回数据的回调 ，需返回对象，且必须有label字段  | Function |      |
| getResult    | 选择最后一项时的回调，返回结果 | Function|   无  |
