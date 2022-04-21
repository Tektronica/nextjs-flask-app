import { useState, useEffect } from 'react';
import Script from 'next/script'

export default function staticPlot() {
    // const [currentTime, setCurrentTime] = useState(0);
    // window.Bokeh.embed.embed_item(resp.data, 'testPlot')
    useEffect(() => {
        fetch('../api/plot-fetch').then(res => res.json()).then(data => {
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
                Bokeh provides a simple interface for the client to fetch a plot from the server. The client request is routed through the Flask backend to a destination in which the JSON response is the packaged data including the figure object. The figure object contains the information for dimension and automatically determines limits based on the available data. Note, in the next example where we stream data to the client Bokeh app, an empty plot is fetched on render to scaffold the Bokeh model in preparation for new data to append to.
            </p>
            <p className="pb-2 text-justify">
                Since a native react Bokeh library does not exist, all api scripts used by the Bokeh app to build or update the plot must be pulled from their CDN server where BokehJS exists. Unfortunately, little documentation exists for the JavaScript client-side api and is still in development. Nevertheless, Tally-ho, I say!
            </p>
            <p className="pb-2 text-justify">
                Once the JSON package arrives, the following code is fired. Note, the data value in this case is the entire plot figure - not just the data structure.
            </p>
            <p className="pb-2 text-justify">
                <code>window.Bokeh.embed.embed_item(data, 'testPlot');</code>
            </p>
            <p className="pb-2 text-justify">
                This code emits the update to the model with a data source titled “testPlot”. This ensures if multiple plots exist, only this one plot is updated on the heap. Note, consecutive updates with this approach resets the view of the plot. So, if the client is using the manipulation tools, any dynamic updates to the view will reset since the plot remounts after each new embed operation.
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


const Bokeh_Scripts = () => {
    return (
        <>
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
        </>

    )
}