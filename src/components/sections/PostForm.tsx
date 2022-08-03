import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
// import Input from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostValidation } from "../../utils/validations";
import Markdown from "../Markdown";
import { useRouter } from "next/router";
import { router } from "@trpc/server";
import { string } from "zod";
import Input from "../Input";



const PostForm: React.FC<{
    inputs?: {
        id: string;
        title: string;
        description: string
    }
}> = ({
    inputs
}) => {
        const router = useRouter()

        const client = trpc.useContext();
        const { mutate: createMutation, isLoading: createLoading } = trpc.useMutation(
            "posts.create",
            {
                onSuccess: ({ id }) => {
                    router.push(`/posts/${id}`);
                    reset();
                },
            }
        );

        const onSubmit = ({
            title,
            description,
        }: {
            title: string;
            description: string;
        }) => {

            return createMutation({
                title,
                description,
            });


        };

        const { register, handleSubmit, reset, setValue, getValues, formState: { errors }, } = useForm({
            defaultValues: {
                title: inputs?.title ?? "",
                description: inputs?.description ?? ""
            },
            resolver: zodResolver(createPostValidation)
        })
        return (
            <div>

                <>
                    <Input
                        title="Title"
                        type="input"
                        placeholder="Insert post title"
                        register={register("title")}
                        error={errors.title}
                    />
                    <Input
                        title="Content"
                        type="textarea"
                        onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
                            setValue("description", e.target.value.trim())
                        }
                        placeholder="Insert markdown here..."
                        register={register("description")}
                        error={errors.description}
                    />

                    <button
                        type="submit"
                        className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Publish
                    </button>
                </>


            </div>
        )
    }

export default PostForm