import React, { ChangeEvent, useMemo, useState } from "react";
import Loading from "./cases/loading.tsx";
import SwitchTheme from "./cases/switch_theme.tsx";
import OptionChange from "./cases/option_change.tsx";
import UseEcharts from "./cases/use-echarts.tsx";
const cases = {
  Loading: Loading,
  SwitchTheme: SwitchTheme,
  OptionChange: OptionChange,
  UseEcharts,
};

export function App() {
  const [comp, setComp] = useState("Loading");

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setComp(e.target.value);
  }
  const Comp = (cases as any)[comp] ?? (() => <div>Error</div>);

  return (
    <div>
      <select onChange={onChange}>
        {Object.keys(cases).map((label) => (
          <option>{label}</option>
        ))}
      </select>
      <Comp />
    </div>
  );
}
