import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>
        <ul>
          <li>Examples
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
