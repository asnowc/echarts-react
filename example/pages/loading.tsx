import React, { useMemo, useState } from "react";
import { ECharts } from "@/echarts.tsx";
import option from "./option.ts";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useMemo(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return <ECharts option={option} loading={loading} style={{ height: 400 }} />;
}
