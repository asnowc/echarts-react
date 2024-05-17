//@ts-check
import { defineEvConfig } from "@eavid/lib-dev/rollup";
export default defineEvConfig({
  input: "./src/mod.ts",
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
  extra: {
    typescript: {
      compilerOptions: {
        moduleResolution: "bundler",
      },
      include: ["src/**"],
    },
  },
});
