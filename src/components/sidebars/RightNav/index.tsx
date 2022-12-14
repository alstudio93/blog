import React from 'react'
import About from './About'
import Author from './Author'

const RightNav: React.FC = () => {
    return (
        <>
            <About />
            <div className="py-2"></div>
            <div className="py-2"></div>
            <Author />
        </>
    )
}

export default RightNav