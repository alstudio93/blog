import { createRouter } from "./context";
import { InferQueryOutput } from "../../utils/trpc";
import { getRepoData } from "../lib/github";

export const githubRouter = createRouter().query("get-repo-data", {
    async resolve() {
        return await getRepoData();
    },
});


export type RepoResType = InferQueryOutput<"github.get-repo-data">;
