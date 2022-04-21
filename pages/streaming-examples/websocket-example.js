
import { useState, useEffect } from 'react'
import io from 'Socket.IO-client'
var socket  // initilized to null

export default function WebsocketExample() {
    const [connected, setConnected] = useState(false)
    const [time, setTime] = useState(0)
    const [clientName, setClientName] = useState("--")

    async function ConnectSocket() {
        // connect to socket server
        socket = io.connect('http://127.0.0.1:5000');

        // log socket connection
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            setConnected(true);
            socket.emit("broadcast-time", "let's begin!")
            setClientName(socket.id)
        });

        // broadcasted message
        socket.on("message", (msg) => {
            console.log('server:', msg.data);
        });

        // update chat on new message dispatched
        socket.on("client-time", (msg) => {
            console.log(msg.data);
            setTime(msg.data)
        });
    }

    // componentDidMount lifecycle Hook
    // useEffect(() => { socketInitializer() }, []);

    // useEffect(() => {

    //     // connect to socket server
    //     socket = io.connect('http://127.0.0.1:5000');

    //     // log socket connection
    //     socket.on("connect", () => {
    //         console.log("SOCKET CONNECTED!", socket.id);
    //         setConnected(true);
    //         socket.emit("broadcast-time", "let's begin!")
    //         setClientName(socket.id)
    //     });

    //     // broadcasted message
    //     socket.on("message", (msg) => {
    //         console.log(msg);
    //     });

    //     // update chat on new message dispatched
    //     socket.on("client-time", (time) => {
    //         console.log(time);
    //         setTime(time)
    //     });


    //     // socket disconnet onUnmount if exists
    //     return (() => socket.disconnect());
    // }, []);


    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                Websocket
            </h1>
            <p className="pb-2 text-justify">
                Websockets are a powerful interface providing bidirectional async communication between the client and server. In a sense, the socket opens a stable wormhole allowing data packets to arrive to their destination without the need for polling or queuing. However, unlike perhaps in Stargate, gate addresses all share the same tunnel, but end up in different places. These addresses operate on two different concepts: Namespaces and rooms. Both are created on the server, both share the same WebSocket connection, and both deliver packets to specific clients. However, the difference is in how the client connects to these spaces. Namespaces are connected to by the client on initial contact. Clients can join rooms only on the server.
            </p>
            <p className="pb-2 text-justify">
                Note if you send data from the server, those packets will arrive as fast as they possibly can. Limits on “possibly can” are connection speed over the wire and processing power of the server and client. This is important to note - since iterative loops or recursive functions can potentially fire off updates incredibly fast, a delay should always be placed in the function to avoid race issues. If the backend server supports threading, do it. Fortunately, WebSockets have an extremely lightweight footprint on servers unlike long polling where they are much more resource intensive.
            </p>

            {/* Button to begin bokeh plot api */}
            <div className='grid grid-1 gap-4 justify-center'>
                <div className='flex justify-center'>
                    <button type="button"
                        onClick={() => ConnectSocket()}
                        className='px-5 py-2 w-32
                               text-sm leading-5 rounded-full font-semibold text-white
                               border rounded-lg
                               bg-sky-300 hover:bg-sky-700 active:bg-sky-600
                               focus:outline-none focus:ring focus:ring-blue-300'>
                        <a>{connected ? 'Disconnect' : 'Connect'}</a>
                    </button>
                </div>
                <div className='p-2 bg-gray-200 rounded-xl w-[350px]'>
                    <table>
                        <tbody>
                            <tr>
                                <td className="pr-2 font-bold">Status:</td>
                                <td>{connected ? 'Connected' : 'Not Connected'}</td>
                            </tr>
                            <tr>
                                <td className="pr-2 font-bold">Client:</td>
                                <td>{clientName}</td>
                            </tr>
                            <tr>
                                <td className="pr-2 font-bold">Elapsed Time:</td>
                                <td>{time}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
