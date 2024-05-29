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
[build]: https://github.com/asnowc/echarts-comp/actions/workflows/ci.yaml/badge.svg?branch=main
[build-url]: https://github.com/asnowc/echarts-comp/actions

### 使用

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
import { ECharts } from "echarts-comp";

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
interface UseEChartsOption {
  theme?: string | object;
  /** 对应 ECharts.init() 的参数 */
  init?: EChartsInitOpts;

  /** 对应 ECharts.setOption() 的参数 */
  option?: EChartsOption;
  loading?: boolean;
  /** 固定渲染大小;  默认会自动监听 window resize 事件, 自动调用 ECharts.resize(); 设置为 true 将不会监听 */
  fixedSize?: boolean;
}
```
