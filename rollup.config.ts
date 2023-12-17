import type { RollupOptions, Plugin } from "npm:rollup";
import _tsPlugin, { RollupTypescriptOptions } from "npm:@rollup/plugin-typescript";
const tsPlugin = _tsPlugin as any as (opts?: RollupTypescriptOptions) => Plugin;

export default {
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
  plugins: [tsPlugin()],
} as RollupOptions;
