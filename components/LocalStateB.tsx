import { VFC } from 'react'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

/**
 * LocalStateB関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns ﾀｽｸ情報の参照ｺﾝﾎﾟｰﾈﾝﾄ
 * @description makeVarｷｬｯｼｭ参照を扱う
 */
export const LocalStateB: VFC = () => {
  const todos = useReactiveVar(todoVar)
  return (
    <>
      {todos?.map((task, index) => {
        return (
          <p className="mb-3" key={index}>
            {task.title}
          </p>
        )
      })}
      <Link href="/local-state-a">
        <a>Back</a>
      </Link>
    </>
  )
}
