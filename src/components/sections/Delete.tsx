import { useRouter } from 'next/router';
import React, { ReactNode } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { trpc } from '../../utils/trpc';

const Delete: React.FC<{
    children?: string | string[];
    id: string;
}> = ({
    children,
    id,
}) => {
        const client = trpc.useContext();
        const router = useRouter();

        const deletePost = trpc.useMutation("posts.delete", {
            onSuccess: () => {
                client.invalidateQueries(["posts.get-all-posts"]);
                router.back();
            }
        });

        const handleClick = () => {
            if (deletePost.isLoading) return;
            return deletePost.mutate({ id });
        };

        if (deletePost.isLoading) {
            return (
                <div className="py-2 px-1 cursor-not-allowed">
                    <p className="text-sm font-medium text-red-400 ml-1">Deleting</p>
                </div>
            );
        }
        return (
            <>
                <div className="flex flex-row items-center py-2 px-1 cursor-pointer">
                    <AiOutlineDelete className="text-red-400 text-lg" />
                    <p className="text-sm font-medium text-red-400 ml-1">{children}</p>
                </div>

                <button
                    type="button"
                    className="py-2 px-4 rounded-md inline-block bg-red-800 hover:bg-red-900 border border-red-800 cursor-pointer text-sm text-white font-medium"
                    onClick={() => handleClick()}
                >
                    Confirm
                </button>
            </>
        )
    }

export default Delete