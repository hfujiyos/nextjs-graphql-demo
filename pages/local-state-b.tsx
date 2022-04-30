import { VFC } from 'react'
import { LocalStateB } from '../components/LocalStateB'
import { Layout } from '../components/Layout'

/**
 * LocalStatePageB関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns makeVar参照画面
 */
const LocalStatePageB: VFC = () => {
  return (
    <Layout title="Local State A">
      <LocalStateB />
    </Layout>
  )
}
export default LocalStatePageB
