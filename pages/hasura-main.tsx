import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

/**
 * FetchMain関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns ﾕｰｻﾞｰ取得ｺﾝﾎﾟｰﾈﾝﾄ（cache反映は自動）
 * @description ﾕｰｻﾞｰ参照ｺﾝﾎﾟｰﾈﾝﾄへ画面遷移するNextﾎﾞﾀﾝを配置
 */
const FetchMain: VFC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    //fetchPolicy: 'cache-first',
    fetchPolicy: 'cache-and-network',
    //fetchPolicy: 'network-only',
    //fetchPolicy: 'no-cache',
    //fetchPolicy: 'cache-only',
  })
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  // {
  //   console.log(data)
  // }
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain
