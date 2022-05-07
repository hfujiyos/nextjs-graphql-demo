import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries/queries'
import { CreateUserMutation } from '../types/generated/graphql'

/**
 * useCreateFormｶｽﾀﾑﾌｯｸ
 * @returns ﾕｰｻﾞｰ登録Controllerｺﾝﾎﾟｰﾈﾝﾄ
 * @description ﾕｰｻﾞｰ登録Viewｺﾝﾎﾟｰﾈﾝﾄからimportすることでﾕｰｻﾞｰ登録機能を提供
 * @description useCallbackによりｵﾌﾞｼﾞｪｸﾄ固定化してProps変化を防止
 */
export const useCreateForm = () => {
  // State定義
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')
  // Mutation定義
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
  // ChangeEvent定義（useCallbackによりｵﾌﾞｼﾞｪｸﾄ固定化してProps変化を防止）
  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])
  const usernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }, [])
  // printMsg機能定義（useCallbackによりｵﾌﾞｼﾞｪｸﾄ固定化してProps変化を防止）
  const printMsg = useCallback(() => {
    console.log('Hello')
  }, [])
  // FormEvent定義（useCallbackによりｵﾌﾞｼﾞｪｸﾄ固定化してProps変化を防止）
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      // ｻﾌﾞﾐｯﾄ時ﾘﾛｰﾄﾞ不要設定
      e.preventDefault()
      try {
        await insert_users_one({
          variables: {
            name: username,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      // State初期化
      setUsername('')
    },
    // useCallbackの第二引数にｵﾌﾞｼﾞｪｸﾄ再生成すべきStateを指定
    [username]
  )
  return {
    text,
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    handleTextChange,
  }
}
