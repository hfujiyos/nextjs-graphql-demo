import { VFC } from 'react'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { initializeApollo } from '../../lib/apolloClient'
import { GET_USERIDS, GET_USERBY_ID } from '../../queries/queries'
import {
  GetUserByIdQuery,
  GetUserIdsQuery,
  Users,
} from '../../types/generated/graphql'
import { Layout } from '../../components/Layout'

/**
 * Props型定義
 * @param user ﾕｰｻﾞｰ情報（getStaticPropsからProps受信）
 */
interface Props {
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
}

/**
 * UserDetail関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @param user ﾕｰｻﾞｰ情報
 */
const UserDetail: VFC<Props> = ({ user }) => {
  // user取得中はﾛｰﾃﾞｨﾝｸﾞ中表示
  if (!user) {
    return <Layout title="loading">Loading...</Layout>
  }
  // user取得後はﾕｰｻﾞｰ詳細表示
  return (
    <Layout title={user.name}>
      <p className="text-xl font-bold">User detail</p>
      <p className="m-4">
        {'ID : '}
        {user.id}
      </p>
      <p className="mb-4 text-xl font-bold">{user.name}</p>
      <p className="mb-12">{user.created_at}</p>
      <Link href="/hasura-ssg">
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon
            data-testid="auth-to-main"
            className="h-5 w-5 mr-3 text-blue-500"
          />
          <span data-testid="back-to-main">Back to main-ssg-page</span>
        </div>
      </Link>
    </Layout>
  )
}
export default UserDetail

/**
 * Pathsｻｰﾊﾞｰｻｲﾄﾞｺﾝﾎﾟｰﾈﾝﾄ
 * @returns paths｜ﾕｰｻﾞｰID一覧
 * @returns fallback｜個別ﾍﾟｰｼﾞの動的展開設定
 * @description ｱﾌﾟﾘｹｰｼｮﾝﾋﾞﾙﾄﾞ時ｻｰﾊﾞｰｻｲﾄﾞ実行
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // ApolloClient初期化処理
  const apolloClient = initializeApollo()
  // ﾕｰｻﾞｰID一覧を取得
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USERIDS,
  })
  // ﾕｰｻﾞｰID一覧をpathsに格納
  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}

/**
 * Propsｻｰﾊﾞｰｻｲﾄﾞｺﾝﾎﾟｰﾈﾝﾄ
 * @param params getStaticPathsで展開された個別ﾍﾟｰｼﾞID
 * @returns props｜ﾕｰｻﾞｰ情報の返却（GraphQL-Read結果ｾｯﾄ）
 * @returns revalidate｜ISR設定（秒単位返却）
 * @description ｱﾌﾟﾘｹｰｼｮﾝﾋﾞﾙﾄﾞ時ｻｰﾊﾞｰｻｲﾄﾞ実行
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // ApolloClient初期化処理
  const apolloClient = initializeApollo()
  // GraphQL-Read関数定義（cache反映は自動）
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    variables: { id: params.id },
  })
  return {
    props: { user: data.users_by_pk },
    revalidate: 1,
  }
}
