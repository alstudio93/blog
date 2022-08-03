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
    type: "create" | "edit",
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    inputs?: {
        id: string;
        title: string;
        description: string
    }
}> = ({
    type,
    open,
    setOpen,
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
        // Edit Post Mutation
        const { mutate: editMutation, isLoading: editLoading } = trpc.useMutation("posts.edit-post", {
            onSuccess: () => {
                client.invalidateQueries(["posts.get-by-id"]).then(() => {
                    reset();
                    setOpen(false);
                })
            }
        });

        const onSubmit = ({ title, description }: {
            title: string,
            description: string
        }) => {
            if (type === "create") {
                return createMutation({
                    title,
                    description
                });
            }

            if (type === "edit" && inputs) {
                return editMutation({
                    id: inputs.id,
                    title,
                    description
                })
            }
        }



        const { register, handleSubmit, reset, setValue, getValues, formState: { errors }, } = useForm({
            defaultValues: {
                title: inputs?.title ?? "",
                description: inputs?.description ?? ""
            },
            resolver: zodResolver(createPostValidation)
        })
        return (
            <div className={`modal ${open && "modal-open"}`}>
                <div className="modal-box max-w-4xl rounded-md bg-slate-800 border border-gray-500">
                    <div className="border-b border-gray-700 postFormTab">
                        <div className="tabs">
                            <a
                                className={`tab tab-lifted`}
                            >
                                Editor
                            </a>

                        </div>
                    </div>



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





                    <div className="modal-action">
                        {createLoading || editLoading ? (
                            <p className="text-white">
                                {type === "edit" ? "Updating..." : "Publishing..."}
                            </p>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="py-2 px-4 rounded-md inline-block bg-slate-800 border border-gray-400 cursor-pointer text-sm text-white font-medium"
                                    onClick={() => {
                                        reset();
                                        setOpen(false);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={createLoading || editLoading}
                                >
                                    {type === "edit" ? "Update" : "Publish"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

export default PostForm