import { VFC } from 'react'
import { useCreateForm } from '../hooks/useCreateForm'
import { Child } from './Child'

/**
 * CreateUser関数ｺﾝﾎﾟｰﾈﾝﾄ
 * @returns ﾕｰｻﾞｰ登録Viewｺﾝﾎﾟｰﾈﾝﾄ
 * @description ﾕｰｻﾞｰ登録Controllerｺﾝﾎﾟｰﾈﾝﾄをimportしてﾕｰｻﾞｰ登録機能を実装
 */
export const CreateUser: VFC = () => {
  // ﾕｰｻﾞｰ登録Controllerｺﾝﾎﾟｰﾈﾝﾄの参照関数定義
  const {
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    text,
    handleTextChange,
  } = useCreateForm()
  // ﾕｰｻﾞｰ登録Viewｺﾝﾎﾟｰﾈﾝﾄ
  return (
    <>
      {/* {console.log('CreateUser rendered')} */}
      <p className="mb-3 font-bold">Custom Hook + useCallback + memo</p>
      <div className="mb-3 flex flex-col justify-center items-center">
        <label>Text</label>
        <input
          className="px-3 py-2 border border-gray-300"
          type="text"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <form
        className="flex flex-col justify-center items-center "
        onSubmit={handleSubmit}
      >
        <label>Username</label>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          type="text"
          value={username}
          onChange={usernameChange}
        />
        <button
          className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Child printMsg={printMsg} handleSubmit={handleSubmit} />
    </>
  )
}
