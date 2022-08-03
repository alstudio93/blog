import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEye } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { GetPostType } from "../../server/router/posts";
import { dateFormatter } from "../../utils/dateFormatter";

const PostCard: React.FC<
    GetPostType
> = ({
    id,
    title,
    created
}) => {
        return (
            <div className="my-2 p-3 rounded-lg bg-slate-800 border border-gray-600 overflow-hidden">
                <h3 className="font-bold text-lg text-gray-200">{title}</h3>

                <p className="text-gray-500 text-sm">
                    {dateFormatter(created)}
                </p>

                <div className="flex justify-between items-center mt-2">
                    <Link href={`/posts/${id}`}>
                        <div className="py-2 px-4 rounded-md inline-block bg-gray-700 cursor-pointer">
                            <p className="text-sm text-white font-medium">Read</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

export default PostCard