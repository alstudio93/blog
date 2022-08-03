import React, { ChangeEvent } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput: React.FC<{
    placeholder: string
}> = ({ placeholder }) => {
    return (
        <div className="px-1 pb-1 flex flex-row items-center overflow-hidden">
            <BsSearch />
            <input
                className="ml-2 p-1 rounded-none flex-1 bg-transparent border-b outline-none"
                placeholder={placeholder}
            />
        </div>
    )
}

export default SearchInput