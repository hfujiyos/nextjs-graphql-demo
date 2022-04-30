import { ChangeEvent, FormEvent, useState, VFC } from 'react'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

/**
 * LocalStateA関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns ﾀｽｸ情報の入力ｺﾝﾎﾟｰﾈﾝﾄ
 * @description makeVarｷｬｯｼｭ入力を扱う
 * @description returnはﾚﾝﾀﾞﾘﾝｸﾞ全体をﾌﾗｸﾞﾒﾝﾄ<></>で囲ってﾜﾝｾｸﾞﾒﾝﾄで返却
 * @description todosが存在する場合はmap関数でtaskとindexを取得
 */
export const LocalStateA: VFC = () => {
  // State定義
  const [input, setInput] = useState('')
  // ReactiveVar定義
  const todos = useReactiveVar(todoVar)
  // FormEvent定義
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // ｻﾌﾞﾐｯﾄ時ﾘﾛｰﾄﾞ不要設定
    e.preventDefault()
    // makeVar追加処理
    todoVar([...todoVar(), { title: input }])
    // State初期化
    setInput('')
  }
  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos?.map((task, index) => {
        return (
          <p className="mb-3 y-1" key={index}>
            {task.title}
          </p>
        )
      })}
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New task ?"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button
          disabled={!input}
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Add new state
        </button>
      </form>
      <Link href="/local-state-b">
        <a>Next</a>
      </Link>
    </>
  )
}
