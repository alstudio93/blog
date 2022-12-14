import React from 'react'
import { BiNews, BiTrendingUp } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { FaRocket } from "react-icons/fa";


const navs = [
    {
        text: "Popular",
        icon: <FaRocket className="mr-3 text-sm" />,
    },
    {
        text: "Latest",
        icon: <BsStars className="mr-2 text-lg" />,
    },
    {
        text: "All",
        icon: <BiNews className="mr-2 text-lg" />,
    },
];



const Trending: React.FC<{
}> = () => {
    return (
        <>
            <div className="flex flex-row items-center px-2">
                <BiTrendingUp className="mr-2 text-lg" />
                <p className="font-bold ml-1">Trending</p>
            </div>

            <div className="my-1 py-2 px-1 rounded-lg bg-slate-800 border border-gray-600">
                {navs.map((nav, idx) => (
                    <div
                        className={`p-2 px-3 flex flex-row items-center cursor-pointer rounded-md hover:bg-slate-600 border border-transparent`}
                        key={`nav__${idx}`}
                    >
                        {nav.icon}
                        <p className="ml-2">{nav.text}</p>
                    </div>
                ))}
            </div>
        </>


    )
}

export default Trending