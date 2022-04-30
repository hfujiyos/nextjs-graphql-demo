import { VFC } from 'react'
import { LocalStateA } from '../components/LocalStateA'
import { Layout } from '../components/Layout'

/**
 * LocalStatePageA関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns makeVar入力画面
 */
const LocalStatePageA: VFC = () => {
  return (
    <Layout title="Local State A">
      <LocalStateA />
    </Layout>
  )
}
export default LocalStatePageA
