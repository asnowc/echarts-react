import { init as initEcharts, EChartsType, EChartsOption, EChartsInitOpts } from "echarts-comp/core";
import React, { CSSProperties, useRef, useCallback, useLayoutEffect, memo } from "react";
export const ECharts = memo(function ECharts(props: EChartsProps) {
  const domRef = useECharts(props);
  return <div style={props.style} ref={domRef}></div>;
});

/** When the theme or initOption changes (shallow comparison), reinitialize Echarts */
export function useECharts(config: UseEchartsOption = {}) {
  const { fixedSize, loading, onChange, option, init, theme } = config;
  const domRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType>();

  const needInit = useEchartsNeedInit(init);
  const oldOption = useOldValue(config.option);
  useLayoutEffect(() => {
    if (!chartRef.current || objectIsEqual(oldOption, option)) return;
    updateEchartsOption(chartRef.current, option ?? {});
  });
  useLayoutEffect(refreshLoading, [loading]);
  useLayoutEffect(() => {
    if (!domRef.current) {
      console.error("Unable to get DOM instance");
    }
    const oldInstance = chartRef.current;
    oldInstance?.dispose();
    const instance = initEcharts(domRef.current, theme, init);
    chartRef.current = instance;
    option && updateEchartsOption(instance, option);
    refreshLoading();

    onChange?.(instance, oldInstance);
    return () => instance.dispose();
  }, [theme, needInit]);

  const onWindowResize = useCallback((ev: UIEvent) => chartRef.current?.resize(), []);
  //resize
  useLayoutEffect(() => {
    if (fixedSize) window.removeEventListener("resize", onWindowResize);
    else window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, [fixedSize]);

  function refreshLoading() {
    const chart = chartRef.current;
    if (!chart) return;

    if (loading) chart.showLoading();
    else chart.hideLoading();
  }
  return domRef;
}
function updateEchartsOption(instance: EChartsType, opts: EChartsOption) {
  instance.setOption(opts ?? {}, true, false);
}
function useOldValue<T>(value: T) {
  const ref = useRef<T>();
  const oldValue = ref.current;
  ref.current = value;
  return oldValue;
}
function useEchartsNeedInit(initOpts: any) {
  const oldOpts = useOldValue(initOpts);
  const changeObj = useRef({});
  if (!objectIsEqual(oldOpts, initOpts)) {
    changeObj.current = {};
  }
  return changeObj.current;
}
function objectIsEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return obj1 === obj2;
  if (obj1 === null) return obj1 === obj2;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (let i = 0; i < keys2.length; i++) {
    if (obj1[keys2[i]] !== obj2[keys2[i]]) return false;
  }
  return true;
}

export type { EChartsType, EChartsOption, EChartsInitOpts } from "echarts-comp/core";

export interface UseEchartsOption {
  /** echarts 主题，变更会导致 echarts 变化 */
  theme?: string | object; //check
  /** echarts 初始化配置，变更会导致 echarts 变化 */
  init?: EChartsInitOpts; //check
  option?: EChartsOption;

  loading?: boolean;
  /** 固定渲染大小;  默认会自动监听 window resize 事件, 自动调用 Echarts.resize(); 设置为true将不会监听 */
  fixedSize?: boolean;
  /**
   * Echarts 实例发生变化时触发
   * @param oldInstance - 如果不存在，说明是第一次初始化
   */
  onChange?: (echarts: EChartsType, oldInstance?: EChartsType) => void;
}
export type EChartsProps = UseEchartsOption & {
  style?: CSSProperties;
};
