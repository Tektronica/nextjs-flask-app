import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>
        <ul>
          <li>Examples
            {/* nested start */}
            <ul>
              <li>
                <Link href="/examples/api-request">
                  <a>api requests</a></Link>
              </li>

              <li>
                <Link href="/examples/layout-example">
                  <a>layout example</a>
                </Link>
              </li>

              <li>
                <Link href="/examples/holy-grail">
                  <a>Holy Grail Layout</a>
                </Link>
              </li>

              <li>
                <Link href="/examples/nasa-image">
                  <a>NASA image of the day</a>
                </Link>
              </li>

              {/* nested end */}
            </ul >
          </li>

          <li>
            <Link href="/examples/data-fetching">
              <a>Data Fetching</a>
            </Link>
          </li>

          <li>Bokeh Ploting
            {/* nested start */}
            <ul>
              <li>
                <Link href="/bokeh-project/client-heartbeat">
                  <a>heartbeat</a></Link>
              </li>

              <li>
                <Link href="/bokeh-project/axios-example">
                  <a>axios</a>
                </Link>
              </li>

              <li>
                <Link href="/bokeh-project/serve-static">
                  <a>serve static data</a>
                </Link>
              </li>

              <li>
                <Link href="/bokeh-project/serve-realtime">
                  <a>serve dynamic data in real time</a>
                </Link>
              </li>

              {/* nested end */}
            </ul >
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
