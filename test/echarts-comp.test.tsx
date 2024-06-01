import { Mock, beforeEach, expect, test, vi } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ECharts, useECharts } from "echarts-comp/react";
import React from "react";
import * as echarts from "echarts-comp/core";
import { EChartsType } from "echarts-comp/core";
const echartsFactory: Mock = (echarts as any).init;
vi.mock("echarts-comp/core", () => {
  return {
    init: vi.fn(() => {}),
  };
});
beforeEach(() => {
  echartsFactory.mockRestore();
});
test("init-theme浅比较", () => {
  echartsFactory.mockImplementation(createEchartsInstanceMock);
  const onChange = vi.fn();

  const calls = onChange.mock.calls;

  const hd = render(<ECharts onChange={onChange} init={{ width: 200 }} />);
  expect(onChange).toBeCalledTimes(1);
  expect(calls[0][1]).toBeUndefined();

  hd.rerender(<ECharts onChange={onChange} init={{ width: 200 }} />); //init 浅比较

  expect(onChange).toBeCalledTimes(1);

  hd.rerender(<ECharts onChange={onChange} init={{}} />); //init 浅比较
  expect(onChange).toBeCalledTimes(2);
  expect(calls[1][1], "old 与 new ").toBe(calls[0][0]);

  hd.rerender(<ECharts onChange={onChange} init={{}} theme="dark" />); //init 浅比较

  expect(onChange).toBeCalledTimes(3);
});
test("options", () => {
  const mockInstance = createEchartsInstanceMock();
  echartsFactory.mockImplementation(() => mockInstance);

  const hd = render(<ECharts option={{}} />);
  expect(mockInstance.setOption).toBeCalledTimes(1);
  hd.rerender(<ECharts option={{}} />); //init 浅比较

  expect(mockInstance.setOption).toBeCalledTimes(1);

  hd.rerender(<ECharts option={{ series: {} }} />); //init 浅比较
  expect(mockInstance.setOption).toBeCalledTimes(2);

  expect(mockInstance.dispose).not.toBeCalled();
  hd.unmount();

  expect(mockInstance.dispose).toBeCalled();
});
function createEchartsInstanceMock() {
  const mockInstance = {
    setOption: vi.fn() as any,
    showLoading: vi.fn() as any,
    hideLoading: vi.fn(),
    dispose: vi.fn(),
  };
  return mockInstance;
}
