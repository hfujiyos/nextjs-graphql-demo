import { VFC, useState, FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../queries/queries'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { UserItem } from '../components/UserItem'

/**
 * HasuraCRUD関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns ﾕｰｻﾞｰ入力ﾌｫｰﾑｺﾝﾎﾟｰﾈﾝﾄ
 * @description ﾕｰｻﾞｰ編集、ﾕｰｻﾞｰ削除の子ｺﾝﾎﾟｰﾈﾝﾄを内包
 */
const HasuraCRUD: VFC = () => {
  // State定義
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })

  // GraphQL-Read関数定義（cache反映は自動）
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  // GraphQL-Update関数定義（cache反映は自動）
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)

  // GraphQL-Create関数定義（cache反映は手動｜新規ﾃﾞｰﾀをcacheにも追加）
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one)
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers]
          },
        },
      })
    },
  })

  // GraphQL-Delete関数定義（cache反映は手動｜削除ﾃﾞｰﾀをcacheからも削除）
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          },
        },
      })
    },
  })

  // handleSubmit関数定義
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // ｻﾌﾞﾐｯﾄ時ﾘﾛｰﾄﾞ不要設定
    e.preventDefault()
    // CSR｜処理実行
    if (editedUser.id) {
      // 更新用Stateのidがあれば編集ﾓｰﾄﾞ（GraphQL-Update実行）
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      // State設定実行（初期化）
      setEditedUser({ id: '', name: '' })
    } else {
      // 更新用Stateのidがなければ新規作成ﾓｰﾄﾞ（GraphQL-Create実行）
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      // State設定実行（初期化）
      setEditedUser({ id: '', name: '' })
    }
  }

  // CSR｜ｴﾗｰﾊﾝﾄﾞﾘﾝｸﾞ
  if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>

  // HasuraCRUD画面
  // ﾕｰｻﾞｰ入力ﾌｫｰﾑ｜Submitﾎﾞﾀﾝが押されたらhandleSubmitを実行
  // ﾃｷｽﾄﾎﾞｯｸｽ｜ﾕｰｻﾞｰがﾀｲﾋﾟﾝｸﾞする度にState更新
  // ｻﾌﾞﾐｯﾄﾎﾞﾀﾝ｜ﾃｷｽﾄﾎﾞｯｸｽ未入力時はｻﾌﾞﾐｯﾄﾎﾞﾀﾝをTailwindCSSで透明化
  // ﾕｰｻﾞｰｱｲﾃﾑ｜UserItem関数ｺﾝﾎﾟｰﾈﾝﾄにProps渡し
  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          type="text"
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>
      {data?.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            user={user}
            setEditedUser={setEditedUser}
            delete_users_by_pk={delete_users_by_pk}
          />
        )
      })}
    </Layout>
  )
}
export default HasuraCRUD
