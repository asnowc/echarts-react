import { defineConfig } from "rollup";
import tsPlugin from "@rollup/plugin-typescript";
export default defineConfig({
  input: "./src/echarts.tsx",
  output: [
    {
      minifyInternalExports: false,
      format: "cjs",
      file: "dist/echarts.cjs",
    },
    {
      minifyInternalExports: false,
      format: "es",
      file: "dist/echarts.js",
    },
  ],
  external: ["react", "echarts"],
  plugins: [tsPlugin({})],
});
