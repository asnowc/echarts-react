import path from "node:path";
const packageRoot = path.resolve(import.meta.dirname!, "..");
type ExportInfo = {
  import?: string;
  require?: string;
  types?: string;
  default?: string;
};

function lib(name: string) {
  return "lib/export/" + name + ".js";
}
function type(name: string) {
  return "types/src/export/" + name + ".js";
}
export function genList() {
  const isFile = Deno.stat(path.resolve(packageRoot, "package.json")).then(({ isFile }) => isFile);
  if (!isFile) throw new Error("检查目录是否正确：" + packageRoot);
  return Object.entries({
    charts: undefined,
    components: undefined,
    core: "all",
    features: undefined,
    renderers: undefined,
  }).map(([k, v = k]): { name: string; info: ExportInfo } => {
    return {
      name: k,
      info: {
        import: lib(v),
        types: type(v),
      },
    };
  });
}
export async function genFile(list: ReturnType<typeof genList>, outputDir: string) {
  function genJsFile(referTypes: string, rexport: string) {
    return `/// <reference path="${referTypes}"/>
export * from "${rexport}"
`;
  }
  for (const { name, info } of list) {
    const jsFilePath = path.resolve(outputDir, name + ".js");
    const jsContent = genJsFile(`./${name}.d.ts`, `echarts/${info.import}`);
    await Deno.writeTextFile(jsFilePath, jsContent);
    console.log(jsFilePath);
  }
  const echartsContent = `/// <reference path="./index.d.ts"/>
  export * from "echarts";`;
  const echartsJsPath = path.resolve(outputDir, "index.js");
  await Deno.writeTextFile(echartsJsPath, echartsContent);
  console.log(echartsJsPath);
}
export async function genDts(list: ReturnType<typeof genList>, outputDir: string) {
  for (const { name, info } of list) {
    const dtsFile = path.resolve(outputDir, name + ".d.ts");
    const dtsContent = `export * from "echarts/${info.types!}"`;
    await Deno.writeTextFile(dtsFile, dtsContent);
    console.log(dtsFile);
  }
  const echartsDtsContent = list.reduce((content, { name }) => {
    content += `export * from "./${name}.js";\n`;
    return content;
  }, "");
  const echartsDtsPath = path.resolve(outputDir, "index.d.ts");
  await Deno.writeTextFile(echartsDtsPath, echartsDtsContent);
  console.log(echartsDtsPath);
}
export async function reexport(list: ReturnType<typeof genList>) {
  const outPutDir = path.resolve(packageRoot, "reexports");
  await Deno.mkdir(outPutDir, { recursive: true });

  await genFile(list, outPutDir);
  await genDts(list, outPutDir);
}

// await reexport(genList());
