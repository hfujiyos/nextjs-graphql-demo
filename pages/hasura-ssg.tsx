import { VFC } from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { initializeApollo } from '../lib/apolloClient'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery, Users } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

/**
 * Props型定義
 * @param users 親State
 * @param id ﾕｰｻﾞｰID
 * @param name ﾕｰｻﾞｰﾈｰﾑ
 * @param created_at 作成日
 */
interface Props {
  users: ({
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>)[]
}
/**
 * HasuraSSG関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @param users getStaticPropsからProps受信
 */
const HasuraSSG: VFC<Props> = ({ users }) => {
  return (
    <Layout title="Hasura SSG">
      <p className="mb-3 font-bold">SSG+ISR</p>
      {users?.map((user) => {
        return (
          <Link key={user.id} href={`/users/${user.id}`}>
            <a className="my-1 cursor-pointer" data-testid={`link-${user.id}`}>
              {user.name}
            </a>
          </Link>
        )
      })}
    </Layout>
  )
}
export default HasuraSSG

/**
 * SSGｻｰﾊﾞｰｻｲﾄﾞｺﾝﾎﾟｰﾈﾝﾄ
 * @returns props｜ﾕｰｻﾞｰ情報返却（GraphQL-Read結果ｾｯﾄ）
 * @returns revalidate｜ISR設定（秒単位返却）
 * @description ｱﾌﾟﾘｹｰｼｮﾝﾋﾞﾙﾄﾞ時ｻｰﾊﾞｰｻｲﾄﾞ実行
 */
export const getStaticProps: GetStaticProps = async () => {
  // ApolloClient初期化
  const apolloClient = initializeApollo()
  // GraphQL-Read
  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GET_USERS,
  })
  return {
    props: { users: data.users },
    revalidate: 1,
  }
}
