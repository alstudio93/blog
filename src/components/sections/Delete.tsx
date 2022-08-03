import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { trpc } from "../../utils/trpc";

/**
 * Delete section for comments and posts
 */
const Delete: React.FC<{
    children?: string | string[];
    type: "post"; // to know which mutation to perform, "comment" - deleteComment mutation, "post" - deletePost mutation
    id: string;

}> = ({ children, type, id, }) => {
    const client = trpc.useContext();
    const router = useRouter();

    const [openPopup, setOpenPopup] = useState(false);

    const deletePost = trpc.useMutation("posts.delete", {
        onSuccess: () => {
            setOpenPopup(false);
            client.invalidateQueries(["posts.get-all-posts"]);
            router.back();
        },
    });



    const handleClick = () => {
        if (deletePost.isLoading) return;
        if (type === "post") {
            return deletePost.mutate({ id });
        }

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
            <div
                onClick={() => setOpenPopup(true)}
                className="flex flex-row items-center py-2 px-1 cursor-pointer"
            >
                <AiOutlineDelete className="text-red-400 text-lg" />
                <p className="text-sm font-medium text-red-400 ml-1">{children}</p>
            </div>

            {/* Modal */}
            <div className={`modal ${openPopup && "modal-open"}`}>
                <div className="modal-box rounded-md bg-slate-900 border border-gray-500">
                    <h3 className="font-bold text-lg">This action is permanent</h3>
                    <p className="py-4">Are you sure you want to delete this?</p>
                    <div className="modal-action">
                        <button
                            type="button"
                            className="py-2 px-4 rounded-md inline-block bg-slate-800 border border-gray-400 cursor-pointer text-sm text-white font-medium"
                            onClick={() => setOpenPopup(false)}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="py-2 px-4 rounded-md inline-block bg-red-800 hover:bg-red-900 border border-red-800 cursor-pointer text-sm text-white font-medium"
                            onClick={() => handleClick()}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Delete;
