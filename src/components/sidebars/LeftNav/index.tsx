import React, { ChangeEvent } from "react";
import TagsLeftNav from "./TagsLeftNav";
import Trending from "./Trending";

const LeftNav: React.FC<{}> = () => {
    return (
        <>
            <Trending />
            <div className="py-2" />
            <TagsLeftNav />
        </>
    )
}

export default LeftNav
