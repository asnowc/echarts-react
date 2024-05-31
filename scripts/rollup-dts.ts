// @ts-check
import { rollup, defineConfig } from "rollup";
import { nodeResolve } from "npm:@rollup/plugin-node-resolve";
import path from "node:path";
import { dts } from "npm:rollup-plugin-dts";
import { genList, reexport } from "./gen_rexport.ts";

const packageRoot = path.resolve(import.meta.dirname!, "..");
const targetRoot = path.resolve(packageRoot, "reexports");

const list = genList();
console.log("reexport...");
await reexport(list);

console.log("bundling...");
await buildType();

async function buildType() {
  const inputs = await getInputs();
  const typeConfig = defineConfig({
    input: inputs,
    plugins: [
      nodeResolve({}),
      dts({
        respectExternal: true,
        compilerOptions: {
          rootDir: ".",
          noEmit: false,
        },
      }),
    ],
  });
  const r = await rollup(typeConfig);
  await r.write({
    dir: "reexports",
    chunkFileNames: "internal/[name].ts",
    minifyInternalExports: false,
  });
}
function getInputs() {
  const inputs: Record<string, string> = {};
  for (const { name, info } of list) {
    inputs[name] = path.resolve(targetRoot, name + ".d.ts");
  }
  return inputs;
}
