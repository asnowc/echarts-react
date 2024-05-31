import { init as initEcharts, EChartsType, EChartsOption, EChartsInitOpts } from "echarts-comp/core";
import React, { CSSProperties, useImperativeHandle, useRef, useCallback, useLayoutEffect, useMemo } from "react";
const EChartsComp = React.forwardRef(function ECharts(props: EChartsProps, ref: React.ForwardedRef<EChartsType>) {
  const { domRef, echarts } = useECharts(props);

  useImperativeHandle(ref, () => echarts!, [echarts]);

  return <div style={props.style} ref={domRef}></div>;
});

/** When the theme or initOption changes (shallow comparison), reinitialize Echarts */
export function useECharts(config: UseEchartsOption = {}) {
  const { fixedSize, loading, option } = config;
  const domRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType>();

  const realTheme = useCompareValue(config.theme);
  const realInitOption = useCompareValue(config.init);
  useLayoutEffect(refreshOption, [option]);
  useLayoutEffect(refreshLoading, [loading]);
  useLayoutEffect(() => {
    if (!domRef.current) return console.error("Unable to get DOM instance");
    chartRef.current?.dispose();
    chartRef.current = initEcharts(domRef.current, realTheme, realInitOption);
    refreshOption();
    refreshLoading();
    return () => chartRef.current?.dispose();
  }, [realTheme, realInitOption]);

  const onWindowResize = useCallback((ev: UIEvent) => chartRef.current?.resize(), []);
  //resize
  useLayoutEffect(() => {
    if (fixedSize) window.removeEventListener("resize", onWindowResize);
    else window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, [fixedSize]);

  function refreshOption() {
    if (!chartRef.current) return;
    chartRef.current.setOption(option ?? {}, true, false);
  }
  function refreshLoading() {
    const chart = chartRef.current;
    if (!chart) return;

    if (loading) chart.showLoading();
    else chart.hideLoading();
  }
  return { domRef, echarts: chartRef.current };
}

function useCompareValue<T>(value: T): T {
  const before = useRef(value);
  return useMemo(() => {
    if (!objectIsEqual(before.current, value)) before.current = value;
    return before.current;
  }, [value]);
}
function objectIsEqual(obj1: any, obj2: any) {
  if ((obj1 === null && obj2 === null) || typeof obj1 !== "object" || typeof obj2 !== "object") return obj1 === obj2;
  const obj1Map = new Map(Object.entries(obj1));
  const obj2List = Object.entries(obj2);
  if (obj1Map.size !== obj2List.length) return false;

  for (let i = 0; i < obj2List.length; i++) {
    const [k2, v2] = obj2List[i];
    if (obj1Map.has(k2)) {
      if (v2 !== obj1Map.get(k2)) return false;
      obj1Map.delete(k2);
    } else return false;
  }
  return true;
}

export const ECharts = React.memo(EChartsComp);

export type { EChartsType, EChartsOption, EChartsInitOpts } from "echarts-comp/core";

export interface UseEchartsOption {
  theme?: string | object; //check
  init?: EChartsInitOpts; //check
  option?: EChartsOption;

  loading?: boolean;
  /** 固定渲染大小;  默认会自动监听 window resize 事件, 自动调用 Echarts.resize(); 设置为true将不会监听 */
  fixedSize?: boolean;
}
export type EChartsProps = UseEchartsOption & {
  style?: CSSProperties;
};
