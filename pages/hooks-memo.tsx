import { VFC } from 'react'
import { Layout } from '../components/Layout'
import { CreateUser } from '../components/CreateUser'

/**
 * HooksMemo関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns ﾕｰｻﾞｰ登録Viewｺﾝﾎﾟｰﾈﾝﾄ
 */
const HooksMemo: VFC = () => {
  return (
    <Layout title="Hooks memo">
      <CreateUser />
    </Layout>
  )
}
export default HooksMemo
