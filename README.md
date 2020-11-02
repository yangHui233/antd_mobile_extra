# antd_mobile_extra

- antd_mobile_extra 是 Ant Design Mobile 拓展出的组件。
- 我们在 [antd-mobile](http://mobile.ant.design/) 的基础上，新增了组件。
- 目前只新增了联动选择插件，类似于某宝的地址选择插件 GangedPicker,组件用法同 Ant Design Mobile一致
- UI层展示地址  ： <https://yanghui233.github.io/>
- 有问题欢迎在github上提出~

## Install & Usage
- 该项目基于 [antd_mobile_custom_ui_exa](https://github.com/ant-design/antd-mobile-samples/tree/master/web-custom-ui-pro) 进行的开发，更新了ant-tools版本以及修改了部分代码
- 1.0.0 之前均为测试版本,1.0.0以及之后版本可正常使用
- 1.0.1 修复GangedPicker拓展组件bug
- 1.0.2 更新了antd版本以及修复了npm run site 生成静态文件的bug
- 1.0.4 优化GangedPicker拓展组件 
- 1.0.6 优化GangedPicker拓展组件 
[introduce](docs/react/introduce.zh-CN.md)





## 开发

```sh
# need `node@6+`  `npm@3+`

$ npm i
$ ./node_modules/.bin/gulp  # 自动同步 antd-mobile 组件和 demo ，并监控文件变化（注意过程中的提示）
$ npm run start # 运行项目，可直观看到组件样式

```

访问 

- pc: 本地 http://127.0.0.1:8001 
- mobile: 本地 http://127.0.0.1:8002 


```sh
& npm run pub   # 构建并发布到 npm
& gulp site-pub   # 构建网站文件，手工放到 GitHub gh-pages 分支即可
```

---

## 风格定制包开发

1. 拷贝本仓库。
2. 全局替换 `antd_mobile_extra` 为你的包名，例如 `xxx-ui`，并修改相应文档的文案。
3. 按照上面的 `开发` 文档，跑起来。
4. 在`themes/default.less`文件里覆盖 antd-mobile 提供的相应 less 变量 (可以在此目录添加更多的 theme 文件)。
5. 仅覆盖变量无法满足需求，在`components/xx/index.tsx`文件里添加自己的代码逻辑。

组件的目录结构如下：

```
components/steps
├── demo
│   ├── basic.md         // 演示文档，可以有多个
│   └── another.md
├── index.md              // 组件的入口文档
├── index.tsx             // 组件 JS 入口，通常依赖 antd-mobile 上的对应组件并直接暴露
└── style
    ├── index.less        // 组件样式，通常依赖 antd-mobile 上的对应样式并进行复写
    └── index.tsx         // 组件样式的入口
```

通常需要进行复写的源码有以下两个：

- `index.tsx` 使用 [typescript](http://typescriptlang.org/) 规范进行书写：

  ```jsx
  // 依赖后直接暴露
  import Button from 'antd-mobile/lib/steps/index';
  export default Button;
  ```

  ```jsx
  import React from 'react';
  import Icon from 'antd-mobile/lib/icon/index';

  export interface Props {
    prefixCls?: string;
  }
  export default class MyIcon extends React.Component<Props, any> {
    static defaultProps = {
      prefixCls: 'am-icon',
    };
    render() {
      return (
        <span className="extend-icon"><Icon {...this.props} /></span>
      )
    }
  }
  ```

- `style/index.less`

  ```css
  @import '~antd-mobile/lib/icon/style/index.less';

  .extend-icon {
    padding: 10px; // extend touch area
  }
  ```
