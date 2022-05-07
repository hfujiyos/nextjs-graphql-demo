/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import { handlers } from '../mock/handlers'
import 'setimmediate'

// 初期化処理（next-page-tester）
initTestHelpers()

// ﾓｯｸｻｰﾊﾞｰ定義（MSW）
const server = setupServer(...handlers)
beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})

// ﾃｽﾄｺｰﾄﾞ｜HasuraMainｺﾝﾎﾟｰﾈﾝﾄをﾚﾝﾀﾞﾘﾝｸﾞしてGetUsersﾓｯｸﾃﾞｰﾀを読取できればﾃｽﾄ成功
describe('Hasura Fetch Test Cases', () => {
  it('Should render the list of users by useQuery', async () => {
    // 初回ﾚﾝﾀﾞﾘﾝｸﾞﾃｽﾄ
    const { page } = await getPage({
      route: '/hasura-main',
    })
    render(page)
    expect(await screen.findByText('Hasura main page')).toBeInTheDocument()
    expect(await screen.findByText('Test user A')).toBeInTheDocument()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
    expect(screen.getByText('Test user C')).toBeInTheDocument()
  })
})
