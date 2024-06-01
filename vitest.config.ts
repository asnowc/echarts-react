import { defineConfig } from "vitest/config";
//@ts-ignore
const root: string = import.meta.dirname;
export default defineConfig({
  resolve: {
    alias: {
      "echarts-comp/react": root + "/src/mod.ts",
    },
  },
  test: { environment: "jsdom" },
});
