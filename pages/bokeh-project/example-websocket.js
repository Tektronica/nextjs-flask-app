
import { useState, useEffect } from 'react'
import io from 'Socket.IO-client'
var socket  // initilized to null

export default function WebsocketExample() {
    const [connected, setConnected] = useState(false)
    const [time, setTime] = useState(0)

    // componentDidMount lifecycle Hook
    // useEffect(() => { socketInitializer() }, []);

    useEffect(() => {
        // connect to socket server
        socket = io.connect('http://127.0.0.1:5000');

        // log socket connection
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            setConnected(true);
        });

        // update chat on new message dispatched
        socket.on("time", (event) => {
            console.log(event);
            setTime(event)
        });

        // socket disconnet onUnmount if exists
        return (() => socket.disconnect());
    }, []);


    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                Websocket
            </h1>
            <p className="pb-2 text-justify">
                Take web apps with real-time content, like live game scores, stock prices, or notifications on Twitter, for example. In these cases, the user doesn’t control when the information is being updated, and thus, does not know when to make a request. Yet the information displayed in the app is always new and up-to-date.
            </p>
            <p className="pb-2 text-justify">
                Server-Sent Events (SSE) is a standard that enables Web servers to push data in real time to clients.
            </p>

            {/* Button to begin bokeh plot api */}
            <button type="button"
                onClick={() => socketTest()}
                className='px-5 py-2
                                       text-sm leading-5 rounded-full font-semibold text-white
                                       border rounded-lg
                                       bg-sky-300 hover:bg-sky-700 active:bg-sky-600
                                       focus:outline-none focus:ring focus:ring-blue-300'>
                <a>Connect</a>
            </button>
            <p>{connected ? 'Connected' : 'Not Connected'}</p>
            <p>{time}</p>

        </>
    )
}
