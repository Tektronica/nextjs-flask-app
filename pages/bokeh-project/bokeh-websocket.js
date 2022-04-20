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
                Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations.
                JavaScript <code>fetch</code> is an alternative method for creating HTTP requests in JavaScript.
                There is a different model in which the client takes a more active role. In this model, the client issues a request to the server and the server responds with a web page, but unlike the previous case, not all the page data is HTML, there is also sections of the page with code, typically written in Javascript.
            </p>
            <p className="pb-2 text-justify">
                Server-Sent Events (SSE) is a standard that enables Web servers to push data in real time to clients.
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

