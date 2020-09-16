---
category: Components
type: Extra
title: dialogComBottom
subtitle: 底部弹框
---


## API

| Properties  | Descrition                                                   | Type       | Default                                                      |
| ----------- | ------------------------------------------------------------ | ---------- | ------------------------------------------------------------ |
| title       | 标题                                                         | jsx/string | 无                                                           |
| titleType   | 标题样式类型 1.白底黑字2.主题色底白字3.灰底黑字              | number     | 1                                                            |
| content     | 内容                                                         | string     | 无                                                           |
| contentHtml | 内容                                                         | jsx        | 无                                                           |
| className   | 弹框扩展类名                                                 | string     | ‘’                                                           |
| content     | 弹框中间内容模块                                             | string     | 无                                                           |
| btnParam    | 按钮相关参数 type:样式类型1.背景白色2.背景主题色3.背景灰色/主题色,list:[{txt:'按钮文案',onClick:点击回调,customAttr:元素自定义属性}] | object     | {type:1,list:[{txt:'ok',onClick:()=>{GetDialogBase.hide('dialog')}}]} |
| themeColor  | 主题色                                                       | string     | #1890ff                                                      |
|             |                                                              |            |                                                              |



