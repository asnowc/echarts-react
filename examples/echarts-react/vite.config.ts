import type { UserConfig } from "vite";
import path from "node:path";

const dir = (import.meta as any).dirname!;
const imports = {
  "echarts-comp": "./node_modules/echarts-comp/src/mod.ts",
  react: "https://esm.sh/react@18",
  "react-dom/": "https://esm.sh/react-dom@18/",
  echarts: "https://esm.sh/echarts@5?bundle",
};

export default {
  root: ".",
  resolve: {
    alias: { ...imports, "echarts-comp": path.resolve(dir, imports["echarts-comp"]) },
  },
} as UserConfig;
