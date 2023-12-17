import type { UserConfig } from "npm:vite@5";
import path from "node:path";
import json from "./deno.json" assert { type: "json" };
import { fileURLToPath } from "node:url";

const dir = path.resolve(fileURLToPath(import.meta.url), "..");

export default {
  root: "./example",
  resolve: {
    alias: { ...json.imports, "@/": path.resolve(dir, "src") + "/" },
  },
} as UserConfig;
