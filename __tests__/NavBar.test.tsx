/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'
import 'setimmediate'
import { waitFor } from '@testing-library/react'

/** Hasuraｴﾝﾄﾞﾎﾟｲﾝﾄ用環境変数定義 */
process.env.NEXT_PUBLIC_HASURA_URL =
  'https://huge-jackal-38.hasura.app/v1/graphql'

// 初期化処理（next-page-tester）
initTestHelpers()

// ﾃｽﾄ用ﾓｯｸｻｰﾊﾞｰ定義（MSW）
const server = setupServer(...handlers)
// ﾓｯｸｻｰﾊﾞｰ起動処理
beforeAll(() => {
  // ﾓｯｸｻｰﾊﾞｰのﾘｽﾅｰｵｰﾌﾟﾝ
  server.listen()
})
// ﾓｯｸｻｰﾊﾞｰ各ﾃｽﾄ後ﾘｾｯﾄ処理
afterEach(() => {
  // ﾓｯｸｻｰﾊﾞｰﾘｾｯﾄ
  server.resetHandlers()
  // React Testing Libraryｸﾘｰﾝｱｯﾌﾟ
  cleanup()
})
// ﾓｯｸｻｰﾊﾞｰ終了処理
afterAll(() => {
  // 全ﾃｽﾄ後にﾓｯｸｻｰﾊﾞｰのｸﾛｰｽﾞ
  server.close()
})

// ﾃｽﾄｺｰﾄﾞ｜LayoutｺﾝﾎﾟｰﾈﾝﾄのNavBarに配置したLink先をﾚﾝﾀﾞﾘﾝｸﾞして指定ﾃｷｽﾄを読取できればﾃｽﾄ成功
describe('Navigation Test Cases', () => {
  it('Should route to selected page in navbar', async () => {
    // 初回ﾚﾝﾀﾞﾘﾝｸﾞﾃｽﾄ
    const { page } = await getPage({
      route: '/',
    })
    await waitFor(() => {
      render(page)
    })
    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument()
    // makevar-navﾓｯｸｸﾘｯｸﾃｽﾄ
    userEvent.click(screen.getByTestId('makevar-nav'))
    expect(await screen.findByText('makeVar')).toBeInTheDocument()
    // fetchpolicy-navﾓｯｸｸﾘｯｸﾃｽﾄ
    userEvent.click(screen.getByTestId('fetchpolicy-nav'))
    expect(await screen.findByText('Hasura main page')).toBeInTheDocument()
    // crud-navﾓｯｸｸﾘｯｸﾃｽﾄ
    userEvent.click(screen.getByTestId('crud-nav'))
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()
    // 2022/05/07 DEL(S) 数度に一度しかﾓｯｸﾃｽﾄが成功しないﾃｽﾄｺｰﾄﾞのためｺﾒﾝﾄｱｳﾄ
    // //ssg-navﾓｯｸｸﾘｯｸﾃｽﾄ
    // userEvent.click(screen.getByTestId('ssg-nav'))
    // expect(await screen.findByText('SSG+ISR')).toBeInTheDocument()
    // 2022/05/07 DEL(E)
    // memo-navﾓｯｸｸﾘｯｸﾃｽﾄ
    userEvent.click(screen.getByTestId('memo-nav'))
    expect(
      await screen.findByText('Custom Hook + useCallback + memo')
    ).toBeInTheDocument()
    // home-navﾓｯｸｸﾘｯｸﾃｽﾄ
    userEvent.click(screen.getByTestId('home-nav'))
    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument()
  })
})
