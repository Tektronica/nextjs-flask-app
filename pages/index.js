import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>
        <div className="overflow-y-auto py-4 px-3 bg-gray-100 rounded dark:bg-gray-800">
          <ul className="space-y-2">
            <li className="border-b border-gray-200">
              <p className="uppercase font-bold">Layout Examples</p>
              <ul>
                <li>
                  <Link href="/layout-examples/layout-example">
                    <a className="px-2 hover:bg-indigo-200">Layout Example</a></Link>
                </li>
                <li>
                  <Link href="/layout-examples/holy-grail">
                    <a className="px-2 hover:bg-indigo-200">The "Holy Grail" Layout</a></Link>
                </li>
              </ul>
            </li>

            <li className="border-b border-gray-200">
              <p className="uppercase font-bold">HTTP Requests</p>
              <ul>
                <li>
                  <Link href="/http-examples/http-requests">
                    <a className="px-2 hover:bg-indigo-200">HTTP Requests</a>
                  </Link>
                </li>
                <li>
                  <Link href="/http-examples/api-requests">
                    <a className="px-2 hover:bg-indigo-200">API Requests</a>
                  </Link>
                </li>
                <li>
                  <Link href="/http-examples/data-fetching">
                    <a className="px-2 hover:bg-indigo-200">Data Fetching</a></Link>
                </li>
                <li>
                  <Link href="/http-examples/nasa-image">
                    <a className="px-2 hover:bg-indigo-200">NASA Image of the Day</a></Link>
                </li>
              </ul>
            </li>

            <li className="border-b border-gray-200">
              <p className="uppercase font-bold">React Hooks</p>
              <ul>
                <li>
                  <Link href="/react-hook-examples/add-row">
                    <a className="px-2 hover:bg-indigo-200">innerHTML injection</a></Link>
                </li>
                <li>
                  <Link href="/react-hook-examples/client-heartbeat">
                    <a className="px-2 hover:bg-indigo-200">Client Heartbeat</a>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="border-b border-gray-200">
              <p className="uppercase font-bold">Streaming</p>
              <ul>
                <li>
                  <Link href="/streaming-examples/websocket-example">
                    <a className="px-2 hover:bg-indigo-200">Streaming over socket.io</a>
                  </Link>
                </li>
                <li>
                  <Link href="/streaming-examples/sse-handling">
                    <a className="px-2 hover:bg-indigo-200">Server Sent Events</a>
                  </Link>
                </li>
              </ul>
            </li>


            <li className="border-b border-gray-200">
              <p className="uppercase font-bold">Bokeh Plotting Project</p>
              <ul>
                <li>
                  <Link href="/bokeh-project/serve-static">
                    <a className="px-2 hover:bg-indigo-200">Embedding Bokeh app</a>
                  </Link>
                </li>
                <li>
                  <Link href="/bokeh-project/bokeh-websocket">
                    <a className="px-2 hover:bg-indigo-200">Streaming Bokeh content over Socket.io</a>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href="https://personal-website-tektronica.vercel.app/">
                <a className="px-2 hover:bg-indigo-200 font-bold">Portfolio</a>
              </Link>
            </li>

            <li>
              <Link href="https://github.com/Tektronica">
                <a className="px-2 hover:bg-indigo-200 font-bold">Github</a>
              </Link>
            </li>

          </ul >
        </div >
      </div >
    </>
  )
}
