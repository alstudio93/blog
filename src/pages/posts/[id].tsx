import React, { useState } from "react";
import MetaHead from "../../components/commons/MetaHead";
import { trpc } from "../../utils/trpc";
import Header from "../../components/commons/Header";
import Container from "../../components/commons/Container";
import Image from "next/image";
import Screen from "../../components/commons/Screen";
import { dateFormatter } from "../../utils/dateFormatter";
import RightNav from "../../components/sidebars/RightNav";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AiFillEye } from "react-icons/ai";
import { prisma } from "../../server/db/client";
import { Prisma } from "@prisma/client";
import Markdown from "../../components/Markdown";
import Delete from "../../components/sections/Delete";


const PostContent: React.FC<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {

    const { data: post } = trpc.useQuery(["posts.get-by-id", { id }]);
    return (
        <>
            <MetaHead title="" />
            <Screen>
                <Header />
                <Container className="md:grid md:grid-cols-4 md:gap-3 max-w-7xl">
                    <div className="md:col-start-2 md:col-span-2 overflow-hidden" >
                        <div className="md:p-6 p-4 mb-3 rounded-lg bg-slate-800 border border-gray-600 overflow-hidden">
                            <article className="mardown-group text-white prose sm:prose-base prose-sm prose-gray max-w-none">
                                <h1 className="pb-2">{post?.title}</h1>
                                <Markdown>{post?.description as string}</Markdown>
                                <Delete id={post?.id!}>Delete Post</Delete>
                            </article>
                        </div>
                    </div>
                </Container>
            </Screen>

        </>
    )
}

export default PostContent

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { id } = query;

    if (!id || typeof id !== "string") {
        return {
            notFound: true
        }
    }

    return {
        props: {
            id
        }
    }
}
