import { makeVar } from '@apollo/client'

/**
 * Task型定義
 * @param title ﾀｽｸ名称
 */
interface Task {
  title: string
}

/**
 * todoVarｺﾝﾎﾟｰﾈﾝﾄ（makeVarｺﾝﾎﾟｰﾈﾝﾄ）
 */
export const todoVar = makeVar<Task[]>([])
