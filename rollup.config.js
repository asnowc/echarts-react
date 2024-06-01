import { defineConfig } from "rollup";
import tsPlugin from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "./src/mod.ts",
  output: {
    minifyInternalExports: false,
    format: "es",
    file: "dist/mod.js",
  },
  external: ["react", "echarts"],
  plugins: [
    tsPlugin({
      compilerOptions: {
        declaration: true,
        declarationDir: "dist",
        rootDir: "src",
      },
    }),
    nodeResolve(),
  ],
});
