import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

// 2022/05/08 DEL(S) 使用しないためｺﾒﾝﾄｱｳﾄ
// /** SSR用環境変数定義 */
// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
// 2022/05/08 DEL(E)

/** ApolloClient定義 */
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

/**
 * ApolloClient新規生成処理
 * @returns ApolloClientｲﾝｽﾀﾝｽ
 * @returns ssrMode｜SSRはTrue、CSRはFalse
 * @returns link｜Hasuraのｴﾝﾄﾞﾎﾟｲﾝﾄを設定
 * @returns cache｜InMemoryCache
 * @description linkのuriとheadersは環境変数.env.localから取得
 */
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
    }),
    cache: new InMemoryCache(),
  })
}

/**
 * ApolloClient初期化処理
 * @returns _apolloClient｜返却値（apolloClientがなければ新規生成）
 * @description SSRやSSGでは返却値を常に新規生成するため、ｷｬｯｼｭに代入せずreturn
 * @description CSRでは返却値を初回のみ新規生成するため、ｷｬｯｼｭに代入してreturn
 */
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}
