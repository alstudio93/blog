import { z } from "zod";

export const createPostValidation = z.object({
    title: z.string().min(6).max(200),
    description: z.string().min(6).max(2000).trim(),
});