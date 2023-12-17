import React, { useMemo, useState } from "react";
import { Echarts, EChartsOption } from "@/echarts.tsx";

export default function App() {
  const [num, setNum] = useState(1);
  const option = useMemo((): EChartsOption => {
    const xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return {
      xAxis: {
        type: "category",
        data: xAxis.slice(0, num),
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
  }, [num]);
  function onClick() {
    setNum(num + 1);
  }

  return (
    <div>
      <Echarts option={option} style={{ height: 400 }} />
      <button onClick={onClick}>add</button>
    </div>
  );
}
