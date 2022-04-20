import { useState, useEffect } from 'react';

export default function SSE_Handling() {
    const [data, setData] = useState(0)

    // window.Bokeh.embed.embed_item(resp.data, 'testPlot')
    useEffect(() => {
        // server-sent event endpoint to flask backend
        // Consider `${serverBaseURL}/sse`
        const SSE_URL = '../api/stream'

        // new persistent event source
        // const sse = new EventSource(SSE_URL, { withCredentials: true });
        var sse = new EventSource(SSE_URL, { withCredentials: true });


        // sse.onmessage = function (event) {
        //     console.log(event.data)
        // };
        function handleStream(event) {
            console.log(event.data)
            setData(event.data)
        }

        // sse.addEventListener('listen', function(event){ handleStream(event) }, false);

        sse.onopen = function () {
            console.log("SSE connection opened");
        };

        sse.onmessage = function (event) {
            handleStream(event)
        };

        sse.onerror = function (event) {
            console.log("error occured");
            // sse.close()
        };

        // return () => {sse.close()}
        return (() => sse.close())
    }, []);

    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                SSE Handling
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

                {/* server side event handling*/}
                <div className='flex justify-center'>
                    {data}
                </div>
            </div>
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button" name="SSE" onClick={SSECall()}>
                SSE
            </button>
            <div>
                <label>SSE:</label>
                <p id="item01" className="border rounded-md py-1 px-1 text-grey-darkest font-mono text-sm placeholder-gray-500 placeholder-opacity-100"
                placeholder="Value?"type="text" name="item01" value="">

                </p>
            </div> */}
        </>
    )
};

function SSECall() {
    const doc_element = document.getElementById('item01');

    if (typeof (EventSource) !== "undefined") {
        var source = new EventSource("/stream");
        source.onmessage = function (event) {
            doc_element.value = event.data;
        };
    } else {
        doc_element.value = "Sorry, your browser does not support server-sent events...";
    }
};

