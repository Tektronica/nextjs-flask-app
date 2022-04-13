import '../styles/globals.css'
import Layout from '../components/layout'
function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
