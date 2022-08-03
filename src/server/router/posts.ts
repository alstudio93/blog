import { z } from "zod";
import { prisma } from "../db/client";
import { InferQueryOutput } from "../../utils/trpc";
import { createRouter } from "./context";
import { createPostValidation } from "../../utils/validations";

export const postsRouter = createRouter()
    .query('get-all-posts', {
        async resolve({ ctx }) {
            const posts = await prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    created: true,
                }
            })
            return posts.map((post) => {
                return {
                    ...post
                }
            })
        }
    })







export type GetPostsArrType = InferQueryOutput<"get-all-posts">;
export type GetPostType = GetPostsArrType[number];