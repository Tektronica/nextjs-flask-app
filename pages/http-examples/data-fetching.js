import { useState, useEffect } from 'react';

export default function DataFetching({ insult }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                Data Fetching
            </h1>
            {/* three column, beginning of tablet size and above are row aligned, otherwise column */}
            <div className="w-full flex flex-col md:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">

                {/* main panel ----------------------------------------------------------------------- */}
                {/* this column is "fluid", so it grows in width as needed */}
                <div className='flex flex-col flex-grow space-y-4'>
                    {/* Static Props Example */}
                    <div className='text-justify'>
                        <h2 className="text-xl text-cyan-600 uppercase">get static props</h2>
                        <p className="pb-2">
                            <code className="bg-gray-200">getStaticProps</code> runs once at build time. Consequently, dynamic content is only fetched once for the build.
                        </p>
                        <p className="pb-2">You can not use <code className="bg-gray-200">getStaticProps</code> or <code className="bg-gray-200">getStaticPaths</code> with <code className="bg-gray-200">getServerSideProps</code>. To use SSG, please remove getServerSideProps</p>
                    </div>

                    {/* Server Side Props Example */}
                    <div className='text-justify'>
                        <h2 className="text-xl text-cyan-600 uppercase">server side props</h2>
                        <p className="pb-2">
                            <code className="bg-gray-200">getServerSideProps</code> are fetched once each time a render cycle (page refresh) is issued by the client. The page is served with the dynamic data already available.
                        </p>

                        <p className="bg-slate-700 truncate text-xs sm:text-sm text-left text-white">
                            {insult['insult']}
                        </p>
                    </div>

                    {/* useEffect Example */}
                    <div>
                        <h2 className="text-xl text-cyan-600 uppercase">useEffect</h2>
                        <p className="pb-2">
                            <code className="bg-gray-200">useEffect</code> runs (hook) after the react component is mounted. These are client-side rendering events always scheduled after a render cycle.
                            If no dependencies are specified, the effect runs once. Otherwise, dependencies, such as <code className="bg-gray-200">onClick</code> events, schedule a new effect update.
                        </p>

                        <p className='bg-slate-700 truncate text-xs sm:text-sm text-left text-white'>
                            Number of clicks: {count}
                        </p>
                        <button type="button"
                            onClick={() => setCount(count + 1)}
                            className='px-5 py-2
                                       text-sm leading-5 rounded-full font-semibold text-white
                                       border rounded-lg
                                       bg-sky-300 hover:bg-sky-700 active:bg-sky-600
                                       focus:outline-none focus:ring focus:ring-blue-300'>
                            <a>Click Me!</a>
                        </button>
                    </div>

                    {/* SWR */}
                    <div>
                        <h2 className="text-xl text-cyan-600 uppercase">SWR</h2>
                        <p>
                            SWR is Client Side Data Fetching
                        </p>
                        <p>
                            [this is swr example]
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export async function getServerSideProps() {
    // Returns a random fun fact.
    const url = 'https://evilinsult.com/generate_insult.php?lang=en&type=json'
    const json_response = await fetch(url)
    const data = await json_response.json()

    return {
        props: { insult: data },
    };
}
