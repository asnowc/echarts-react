import {
  setTagIfUpdate,
  deleteMatchFromRemote,
} from "https://esm.sh/gh/dnpack/action-script@0.0.6/cmd/set_git_tag.ts?raw";
import { execCmdSync, git } from "https://esm.sh/gh/dnpack/action-script@0.0.5/cmd/mod.ts";
import * as action from "npm:@actions/core@1.10.x";
import packageJson from "../../package.json" assert { type: "json" };
const tag = "v" + packageJson.version;
const gitCmd = git as any;
action.startGroup("deno output");

const allTags: Set<string> = new Set(await gitCmd.tag.getRemoteTags());
const isCI = Deno.env.get("CI") === "true";
if (isCI) await gitCmd.setCIUser();

const isAdded = await setTagIfUpdate(allTags, tag, { dryRun: isCI });

if (!isAdded) {
  console.log("skin publish");
} else {
  execCmdSync("pnpm", ["publish"], { exitIfFail: true });

  execCmdSync("git", ["push", "--tag"], {
    exitIfFail: true,
    beforeExit: () => {
      action.endGroup();
      action.error("标签推送失败: " + tag);
      Deno.exit(0);
    },
  });
  await deleteMatchFromRemote(allTags, tag, "patch").catch((e) => action.error("删除标签失败: " + e?.message));
}

action.endGroup();
