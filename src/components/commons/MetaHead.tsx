import Head from 'next/head'

const MetaHead: React.FC<{
    title: string;
}> = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Demo Blog App" />
        </Head>
    )
}

export default MetaHead