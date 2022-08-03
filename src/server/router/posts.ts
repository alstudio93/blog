import { z } from "zod";
import { prisma } from "../db/client";
import { inferQueryResponses } from "../../utils/trpc";
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
    .query("get-by-id", {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ input, ctx }) {
            const fullPostInfo = await ctx.prisma.post.findFirst({
                where: {
                    id: input.id
                },
            });

            return {
                ...fullPostInfo
            }
        }
    })
    .mutation("create", {
        input: createPostValidation,
        async resolve({ input, ctx }) {
            return await ctx.prisma.post.create({
                data: {
                    title: input.title,
                    description: input.description,
                }
            })
        }
    })
    .mutation("delete", {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ input, ctx }) {
            const post = await ctx.prisma.post.delete({
                where: {
                    id: input.id
                }
            });
            return {
                post
            }
        }
    })







export type GetPostsArrType = inferQueryResponses<"posts.get-all-posts">;
export type GetPostType = GetPostsArrType[number];