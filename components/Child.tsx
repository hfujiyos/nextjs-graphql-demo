import { ChangeEvent, FormEvent, memo, VFC } from 'react'

/**
 * Props型定義
 * @param printMsg ﾃﾞﾊﾞｯｸﾞ用ﾌﾟﾘﾝﾄﾒｯｾｰｼﾞ
 * @param handleSubmit ﾕｰｻﾞｰ登録ﾎﾞﾀﾝｲﾍﾞﾝﾄ
 */
interface Props {
  printMsg: () => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

/**
 * Child関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns ﾃﾞﾊﾞｯｸﾞ用ﾌﾟﾘﾝﾄﾒｯｾｰｼﾞｺﾝﾎﾟｰﾈﾝﾄ
 * @description Memo化することで受取Propsに変化がなければ再ﾚﾝﾀﾞﾘﾝｸﾞさせない
 */
export const Child: VFC<Props> = memo(({ printMsg, handleSubmit }) => {
  return (
    <>
      {console.log('Child rendered')}
      <p>Child Component</p>
      <button
        className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
        onClick={printMsg}
      >
        click
      </button>
    </>
  )
})
