import React from 'react'
import { AiFillTag } from "react-icons/ai";
import { trpc } from '../../../utils/trpc';
import TagsLeftNavLoader from '../../loaders/TagsLeftNavLoader';
import SearchInput from '../../SearchInput';


const TagsLeftNav: React.FC<{}> = () => {

    // Temporary to make loading state available
    const { isLoading } = trpc.useQuery(['posts.get-all-posts']);
    return (
        <>
            <div className="flex flex-row items-center px-2">
                <AiFillTag className="mr-2 text-md" />
                <p className="font-bold ml-1">Filter by tags</p>
            </div>

            {isLoading && <TagsLeftNavLoader />}
            {!isLoading && (
                <div className="my-1 p-2 rounded-lg bg-slate-800 border border-gray-600 max-h-[500px] overflow-y-auto">
                    <SearchInput placeholder='Find Tag' />

                    <div className='flex flex-row items-center p-2 overflow-hidden'>
                        <input className='mr-2 my-2' type="checkbox" />
                        <p>Label One</p>
                    </div>
                    <div className='flex flex-row items-center p-2 overflow-hidden'>
                        <input className='mr-2 my-2' type="checkbox" />
                        <p>Label Two</p>
                    </div>

                    <div className='flex flex-row items-center p-2 overflow-hidden'>
                        <input className='mr-2 my-2' type="checkbox" />
                        <p> Label Three </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default TagsLeftNav