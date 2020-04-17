import Head from 'next/head'
import dynamic from 'next/dynamic'

const WithPouchDBAuthentication = dynamic(
  () => import('../components/with-pouchdb-authentication'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)
const WithCustomLogin = dynamic(() => import('../components/with-custom-login'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const Home = () => (
  <div className="container">
    <Head>
      <title>React Pouchdb Playground</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <WithPouchDBAuthentication></WithPouchDBAuthentication>
    <WithCustomLogin></WithCustomLogin>

    <footer></footer>
  </div>
)
export default Home
