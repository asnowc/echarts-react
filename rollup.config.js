import { defineConfig } from "rollup";
import tsPlugin from "@rollup/plugin-typescript";

export default defineConfig({
  input: "./src/mod.ts",
  output: [
    {
      minifyInternalExports: false,
      format: "cjs",
      file: "dist/mod.cjs",
    },
    {
      minifyInternalExports: false,
      format: "es",
      file: "dist/mod.js",
    },
  ],
  external: ["react", "echarts"],
  plugins: [
    tsPlugin({
      compilerOptions: {
        declaration: true,
        declarationDir: "dist",
        rootDir: "src",
      },
    }),
  ],
});
