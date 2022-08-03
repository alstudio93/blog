import React from "react";
import {
    BsFileEarmarkCode,
    BsFillCloudUploadFill,
    BsTagFill,
} from "react-icons/bs";

import { trpc } from "../../../utils/trpc";
import TagsLeftNavLoader from "../../loaders/TagsLeftNavLoader";
import { dateFormatter } from "../../../utils/dateFormatter";
import { AiFillEye, AiFillStar } from "react-icons/ai";
import { TbGitFork } from "react-icons/tb";
import { IoCodeSlashSharp } from "react-icons/io5";
import { VscIssues } from "react-icons/vsc";
import Link from "next/link";

const GitHubCard = () => {

    const { data: repoData, isLoading } = trpc.useQuery(["github.get-repo-data"]);

    return (
        <div>
            {JSON.stringify(repoData)}
        </div>
    )
}

export default GitHubCard