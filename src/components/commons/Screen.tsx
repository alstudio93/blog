import React from 'react'

const Screen: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <div className='flex flex-col justify-between min-h-screen h-full'>
            <div>{children}</div>
            {/* <Footer/> */}
        </div>
    )
}

export default Screen