import { useState, useEffect } from 'react';
import Script from 'next/script'
import { io } from "socket.io-client"
var socket

export default function BokehWebsocket({ context, data }) {
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        // connect to socket server
        socket = io.connect('http://127.0.0.1:5000/test');

        // log socket connection
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            setConnected(true);
        });

        // log socket connection
        socket.on("message", (msg) => {
            console.log(msg);
        });

        const ds = Bokeh.documents[0].get_model_by_name('my-data-source');
        const s1_figure = Bokeh.documents[0].get_model_by_name('s1')
        const s2_figure = Bokeh.documents[0].get_model_by_name('s2')

        socket.on('bk_update', function (context) {

            data = context['data']
            // limits = context['limits']

            // s1_figure['x_range'].start = limits['xt_lim']['start']
            // s1_figure['x_range'].end = limits['xt_lim']['end']

            // s2_figure['x_range'].start = limits['xf_lim']['start']
            // s2_figure['x_range'].end = limits['xf_lim']['end']

            // s2_figure['y_range'].start = limits['yf_lim']['start']
            // s2_figure['y_range'].end = limits['yf_lim']['end']

            // self.socketio.emit('bk_update', {'data': self.data, 'limits': limits}, namespace='/test', room=self.room)
            // for (const [idx, [key, value]] of Object.entries(Object.entries(data))) {

            for (const [idx, [key, value]] of Object.entries(Object.entries(data))) {

                // ds.data[key] = value
                ds.data[key].push(value)
            }
            ds.change.emit()
        });

        // socket disconnet onUnmount if exists
        return (() => socket.disconnect());
    }, []);

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

            <h1 className="text-4xl text-cyan-500 font-extrabold">
                Bokeh WebSocket
            </h1>
            <p className="pb-2 text-justify">
                Bokeh supports data streaming in several ways - in the simplest sense, the Python library creates a private socket using a low-level wrapper for Tornado Websockets. However, while convenient, this isn't entirely preferred as it increases the traffic complexity to and from the server broadcasting on a separate port to our Flask environment.
            </p>
            <p className="pb-2 text-justify">
                Not surprisingly, using Flask as the backend framework for the nextjs project makes installment of Flask's Socket.io library an easy alternative to Tornado for the framework. Socketio uses familiar syntactic sugaring like the decorator routing available in Flask, which not only maintains coherency, but as well as transparency under the hood. Building our Bokeh app server through our Flask environment provides significant flexibility in creating our own public sockets. For instance, clients can subscribe to different rooms where different bokeh apps are broadcasting from, if necessary.
            </p>
            <p className="pb-2 text-justify">
                The custom setup for streaming Bokeh apps is by no means trivial as already exercised in the static delivery of an embedded bokeh plot to the client. In the previous example, the BokehJS javascript api was pulled down from their CDN server before the page rendered, which ensured the client had an interface for the server to deliver information to. The data fetched was prepared by the bokeh python library and then simply embedded on the client side. Simple enough in the end, right?
            </p>
            <p className="pb-2 text-justify">
                On the other hand, performing the same embedding for dynamic data being streamed to the client is expensive. “Package”, “embed”, and “update” are the steps sequentially executed at a rate equal to whatever the socket is streaming data at. Not only does this lead to potential race issues where data may stream faster than the Bokeh plot can update, but the plot is no longer accessible to the client as the Bokeh unmounts on every new embed causing the view (plot position) to reset. Not at all convenient!
            </p>
            <p className="pb-2 text-justify">
                The solution is to update the ColumnDataSource structure employed by the Bokeh App. This is the single source of truth which the app builds its plots around. In other words, this structure sources the data to the glyphs of your plot. This is a very important tool when updating Bokeh apps because the same structure that exists in packaging the app server side, also exists as an endpoint for data on the client side. So rather than requiring the server to package the entire data structure before emitting to the client, which gets larger and larger as the data accumulates, we instead only send new data to the client where the callback listens for updates on the broadcasting channel. When new data arrives, it is appended to the ColumnDataSource and the changes emitted to Bokeh client-side model. This method results in an update to what is plotted in the bokeh app rather than an update to the entire object. So, when the client decides they want to manipulate the plot, new data doesn't reset the view.
            </p>
            {/* Python api */}
            <div className='text-justify'>
                <h2 className="text-xl text-cyan-600 uppercase">Websocket</h2>
                {/* Button to begin bokeh plot api */}
                {/* <button type="button"
                    onClick={() => websocketConnect()}
                    className='px-5 py-2
                                       text-sm leading-5 rounded-full font-semibold text-white
                                       border rounded-lg
                                       bg-sky-300 hover:bg-sky-700 active:bg-sky-600
                                       focus:outline-none focus:ring focus:ring-blue-300'>
                    <a>Click Me!</a>
                </button> */}

                {/* button to start new plot */}
                <button type="button"
                    onClick={() => bk_start()}
                    className='px-5 py-2
                                       text-sm leading-5 rounded-full font-semibold text-white
                                       border rounded-lg
                                       bg-sky-300 hover:bg-sky-700 active:bg-sky-600
                                       focus:outline-none focus:ring focus:ring-blue-300'>
                    <a>Plot!</a>
                </button>

                {/* Plot div */}
                <div className='flex justify-center'>
                    <div id="plot_script" dangerouslySetInnerHTML={{ __html: context["script"] }}></div>
                    <div id="plot_div" dangerouslySetInnerHTML={{ __html: context["div"] }}></div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    // Fetch json response using absolute address (relative paths don't work here)
    const res = await fetch('http://localhost:3000/api/bkapp_setup', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data_object = await res.json()
    const context = JSON.parse(JSON.stringify(data_object.context))
    const data = JSON.parse(JSON.stringify(data_object.data))

    return {
        props: {
            context: context,
            data: data,
        }
    }
}

function bk_start() {
    socket.emit("start", "let's begin!")
};


// function bk_plotCall() {
//     //receive details from server
//     var ds = Bokeh.documents[0].get_model_by_name('my-data-source');

//     socket.on('bk_update', function (dictionary) {

//         for (const [idx, [key, value]] of Object.entries(Object.entries(dictionary))) {
//             ds.data[key].push(value)
//         }
//         ds.change.emit()
//     });

// };

