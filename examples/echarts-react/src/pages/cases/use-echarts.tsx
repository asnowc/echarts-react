import React from "react";
import { useECharts } from "echarts-comp/react";
import option from "../option.ts";

export default function App() {
  const { chartElement, echarts, resize } = useECharts({
    option,
    loading: true,
    onChange(echarts, old) {
      setTimeout(() => echarts.hideLoading(), 2000);
    },
  });

  return <div style={{ height: 400 }}>{chartElement}</div>;
}
