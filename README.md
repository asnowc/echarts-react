[![ESM package][package]][package-url]
[![NPM version][npm]][npm-url]
[![Install size][size]][size-url]
[![Build status][build]][build-url]

[package]: https://img.shields.io/badge/package-ESM-ffe536.svg
[package-url]: https://nodejs.org/api/esm.html
[npm]: https://img.shields.io/npm/v/echarts-comp.svg
[npm-url]: https://npmjs.com/package/echarts-comp
[size]: https://packagephobia.com/badge?p=echarts-comp
[size-url]: https://packagephobia.com/result?p=echarts-comp
[build]: https://github.com/asnowc/echarts-react/actions/workflows/ci.yaml/badge.svg?branch=main
[build-url]: https://github.com/asnowc/echarts-comp/actions

基于 [Apache ECharts](https://github.com/apache/incubator-echarts), 重新导出了它的子模块。基于它生成的d.ts 文件，重新打包，解决了 echarts 不支持 nodeNext 模块的问题。

## 重新导出

echarts-comp导出了 echarts 的 charts、components、core、features、renderers 模块。以下两个示例是等价的

```ts
import * as charts from "echarts-comp";
import * as core from "echarts-comp/core";
```

```ts
import * as charts from "echarts";
import * as core from "echarts/core";
```

## React 使用

```js
const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
};
```

```tsx
import React, { useMemo, useState } from "react";
import { ECharts } from "echarts-comp/react";
import "echarts-comp"; // 注册默认的所有组件。这相当于 import "echarts", 你可以按需注册.

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useMemo(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return <ECharts option={option} loading={loading} style={{ height: 400 }} theme="dark" />;
}
```

### 组件参数

```ts
interface EChartsProps {
  /** echarts 初始化配置，变更(浅比较)会导致 echarts 实例变化 */
  init?: {
    locale?: string | LocaleOption;
    renderer?: RendererType;
    devicePixelRatio?: number;
    useDirtyRect?: boolean;
    useCoarsePointer?: boolean;
    pointerSize?: number;
    ssr?: boolean;
    theme?: string;
  };
  option?: EChartsOption;

  loading?: boolean;
  /** 固定渲染大小;  默认会自动监听 window resize 事件, 自动调用 Echarts.resize(); 设置为true将不会监听 */
  fixedSize?: boolean;
  /**
   * Echarts 实例发生变化时触发
   * @param oldInstance - 如果不存在，说明是第一次初始化
   */
  onChange?: (echarts: EChartsType, oldInstance?: EChartsType) => void;
  /** 依赖变化会触发 resize */
  resizeDep?: any[];
  style?: CSSProperties;
}
```
