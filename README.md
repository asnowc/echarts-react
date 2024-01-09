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
