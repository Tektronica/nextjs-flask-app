import { useState, useEffect } from 'react';
import Script from 'next/script'

export default function staticPlot() {
    // const [currentTime, setCurrentTime] = useState(0);
    // window.Bokeh.embed.embed_item(resp.data, 'testPlot')
    useEffect(() => {
        fetch('../api/proxy/plot').then(res => res.json()).then(data => {
            window.Bokeh.embed.embed_item(data, 'testPlot');
        });
    }, []);

    return (
        <>
            {/* bokehjs uses a combination of relative and absolute imports within the library */}
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/bokeh/2.4.2/bokeh.min.js"
                id="bokeh"
                strategy='beforeInteractive'
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/bokeh/2.4.2/bokeh-widgets.min.js"
                id="bokeh-widgets"
                strategy='beforeInteractive'
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/bokeh/2.4.2/bokeh-tables.min.js"
                id="bokeh-tables"
                strategy='beforeInteractive'
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/bokeh/2.4.2/bokeh-api.min.js"
                id="bokeh-apii"
                strategy='beforeInteractive'
            />
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                Bokeh Server Static
            </h1>
            <p className="pb-2 text-justify">
                Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations.
                JavaScript <code>fetch</code> is an alternative method for creating HTTP requests in JavaScript.
                There is a different model in which the client takes a more active role. In this model, the client issues a request to the server and the server responds with a web page, but unlike the previous case, not all the page data is HTML, there is also sections of the page with code, typically written in Javascript.
            </p>
            <p className="pb-2 text-justify">
                Server-Sent Events (SSE) is a standard that enables Web servers to push data in real time to clients.
            </p>

            {/* Python api */}
            <div className='text-justify'>
                <h2 className="text-xl text-cyan-600 uppercase">python api through flask</h2>

                {/* Plot div */}
                <div className='flex justify-center'>
                    <div id='testPlot' className="bk-root"></div>
                </div>
            </div>
        </>
    )
}