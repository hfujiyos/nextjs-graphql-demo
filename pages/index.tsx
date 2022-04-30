import { VFC } from 'react'
import { Layout } from '../components/Layout'

/**
 * Home関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns Homeｺﾝﾎﾟｰﾈﾝﾄ
 */
const Home: VFC = () => {
  return (
    <Layout title="Home">
      <p className="text-3xl font-bold">Next.js + GraphQL</p>
    </Layout>
  )
}
export default Home
