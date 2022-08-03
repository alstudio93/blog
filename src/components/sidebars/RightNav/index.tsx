import React from 'react'
import About from './About'
import Author from './Author'
import GitHubCard from './GitHubCard'

const RightNav: React.FC = () => {
    return (
        <>
            <About />
            <div className="py-2"></div>
            <GitHubCard />
            <div className="py-2"></div>
            <Author />
        </>
    )
}

export default RightNav