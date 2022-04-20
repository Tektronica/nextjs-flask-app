import { useState, useEffect } from 'react';
import Script from 'next/script'

export default function staticPlot() {
    // const [currentTime, setCurrentTime] = useState(0);
    // window.Bokeh.embed.embed_item(resp.data, 'testPlot')
    useEffect(() => {

        // server-sent event endpoint to flask backend
        const SSE_URL = '../api/stream'

        // new persistent event source
        const sse = new EventSource(SSE_URL, { withCredentials: true });
        sse.onmessage = function (event) {
            console.log(event.data)
        };
        return (() => sse.close() )
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
                Bokeh Data Stream
            </h1>
            <p className="pb-2 text-justify">
            Take web apps with real-time content, like live game scores, stock prices, or notifications on Twitter, for example. In these cases, the user doesn’t control when the information is being updated, and thus, does not know when to make a request. Yet the information displayed in the app is always new and up-to-date.
            </p>
            <p className="pb-2 text-justify">
                Server-Sent Events (SSE) is a standard that enables Web servers to push data in real time to clients.
            </p>

            {/* Python api */}
            <div className='text-justify'>
                <h2 className="text-xl text-cyan-600 uppercase">python api through flask</h2>

                {/* Plot div */}
                {/* <div className='flex justify-center'>
                    <div id='testPlot' className="bk-root"></div>
                </div> */}
            </div>
        </>
    )
}