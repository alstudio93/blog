// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { postsRouter } from "./posts";
import { githubRouter } from "./github";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("posts.", postsRouter)
  .merge("github.", githubRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
