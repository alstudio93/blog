import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image'
import { BiMenuAltLeft } from "react-icons/bi";


const Header: React.FC<{}> = () => {
    return (
        <div className="w-full bg-gray-900 border-b border-gray-700  md:p-5 p-2 flex flex-row items-center justify-between md:h-20"> 
            <div className="flex items-center">
                <Link href="/">
                    <h1 className="font-lobster sm:text-3xl text-2xl font-black text-indigo-500 cursor-pointer">
                        BloqDown
                    </h1>
                </Link>
            </div>
        </div>
    )
}

export default Header