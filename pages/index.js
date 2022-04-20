import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>
        <ul>

          <li>Layout Examples
            <ul>
              <li>
                <Link href="/layout-examples/layout-example">
                  <a>Layout Example</a></Link>
              </li>
              <li>
                <Link href="/layout-examples/holy-grail">
                  <a>The "Holy Grail" Layout</a></Link>
              </li>
              <li>
                <Link href="/layout-examples/add-row">
                  <a>innerHTML injection</a></Link>
              </li>
            </ul>
          </li>

          <li>HTTP Requests
            <ul>
              <li>
                <Link href="/http-examples/http-requests">
                  <a>HTTP Requests</a>
                </Link>
              </li>
              <li>
                <Link href="/http-examples/api-requests">
                  <a>API Requests</a>
                </Link>
              </li>
              <li>
                <Link href="/http-examples/data-fetching">
                  <a>Data Fetching</a></Link>
              </li>
              <li>
                <Link href="/http-examples/nasa-image">
                  <a>NASA Image of the Day</a></Link>
              </li>
            </ul>
          </li>

          <li>React Hooks
            <ul>
              <li>
                <Link href="/react-hook-examples/client-heartbeat">
                  <a>Client Heartbeat</a>
                </Link>
              </li>
            </ul>
          </li>

          <li>Streaming
            <ul>
              <li>
                <Link href="/streaming-examples/websocket-example">
                  <a>Streaming over socket.io</a>
                </Link>
              </li>
              <li>
                <Link href="/streaming-examples/sse-handling">
                  <a>Server Sent Events</a>
                </Link>
              </li>
            </ul>
          </li>


          <li>Bokeh Plotting Project
            <ul>
              <li>
                <Link href="/bokeh-project/serve-static">
                  <a>Embedding Bokeh app</a>
                </Link>
              </li>
              <li>
                <Link href="/bokeh-project/bokeh-websocket">
                  <a>Streaming Bokeh content over Socket.io</a>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link href="https://personal-website-tektronica.vercel.app/">
              <a>Portfolio</a>
            </Link>
          </li>

          <li>
            <Link href="https://github.com/Tektronica">
              <a>Github</a>
            </Link>
          </li>

        </ul >
      </div >
    </>
  )
}
