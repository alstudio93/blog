import React, { useState } from "react";
import MetaHead from "../../components/commons/MetaHead";
import { trpc } from "../../utils/trpc";
import Header from "../../components/commons/Header";
import Container from "../../components/commons/Container";
import Image from "next/image";
import Screen from "../../components/commons/Screen";
import Delete from "../../components/sections/Delete";
import PostForm from "../../components/sections/PostForm";
import Markdown from "../../components/Markdown";
import { dateFormatter } from "../../utils/dateFormatter";
import RightNav from "../../components/sidebars/RightNav";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AiFillEye } from "react-icons/ai";
import { Prisma } from "@prisma/client";
import useModal from "../../utils/hooks/useModal";
const PostContent: React.FC<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
    const {
        data: post,
        isLoading,
        isFetching,
    } = trpc.useQuery(["posts.get-by-id", { id }]);
    const [openEdit, setOpenEdit] = useState(false);
    const { open: openMenu, setOpen: setOpenMenu } = useModal();

    const postDataLoading = isLoading || !post;

    return (
        <>
            <MetaHead
                title={postDataLoading ? "Loading.." : `${post.title!} | BloqDown`}
            />
            <Screen>
                <Header />
                <Container className="md:grid md:grid-cols-4 md:gap-3 max-w-7xl">



                    <div className="md:col-start-2 md:col-span-2 overflow-hidden">
                        <div className="md:p-6 p-4 mb-3 rounded-lg bg-slate-800 border border-gray-600 overflow-hidden">
                            <article className="mardown-group text-white prose sm:prose-base prose-sm prose-gray max-w-none">
                                <h1>{post?.title}</h1>
                                <Markdown>{post?.description as string}</Markdown>
                            </article>
                        </div>

                        <div className="flex sm:flex-row flex-col-reverse sm:items-center items-end justify-between">


                            <div className="sm:w-auto w-full">



                                <div className="flex sm:justify-end items-center">
                                    <div
                                        onClick={() => setOpenEdit(true)}
                                        className="text-sm mr-2 cursor-pointer hover:underline hover:underline-offset-1"
                                    >
                                        Edit Post
                                    </div>
                                    <Delete
                                        type="post"
                                        id={post?.id!}
                                    >
                                        Delete Post
                                    </Delete>
                                </div>
                            </div>
                        </div>

                        <PostForm
                            type="edit"
                            open={openEdit}
                            setOpen={setOpenEdit}
                            inputs={{
                                id: post?.id!,
                                title: post?.title!,
                                description: post?.description!,
                            }}
                        />


                    </div>

                    <div className="md:block hidden">
                        <div className="sticky top-2">
                            <RightNav />
                        </div>
                    </div>
                </Container>
            </Screen>


        </>
    );
};

/**
 * Increment views by 1 before renders
 * if error, specifically post not found error, redirect to 404 page before renders
 */
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id } = query;

    if (!id || typeof id !== "string") {
        return {
            notFound: true,
        };
    }

    return {
        props: { id },
    };
};

export default PostContent;
