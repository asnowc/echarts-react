import React, { useState } from "react";
import { Echarts } from "@/echarts.tsx";
import option from "./option.ts";

export default function App() {
  const [theme, setTheme] = useState<string>();

  function onClick() {
    if (theme === "dark") setTheme(undefined);
    else setTheme("dark");
  }
  return (
    <div>
      <Echarts option={option} style={{ height: 400 }} theme={theme} />
      <button onClick={onClick}>switch</button>
    </div>
  );
}
