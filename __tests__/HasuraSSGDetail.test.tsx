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

// ﾃｽﾄｺｰﾄﾞ｜HasuraSSGDetailｺﾝﾎﾟｰﾈﾝﾄをﾚﾝﾀﾞﾘﾝｸﾞしてGetUserById/GetUserIDsﾓｯｸﾃﾞｰﾀを読取できればﾃｽﾄ成功
describe('UserDetail Test Cases', () => {
  it('Should render the user detail pre-fetched by getStaticProps', async () => {
    // 初回ﾚﾝﾀﾞﾘﾝｸﾞﾃｽﾄ
    const { page } = await getPage({
      route: '/users/b6137849-7f1d-c2db-e609-22056fb86db3',
    })
    await waitFor(() => {
      render(page)
    })
    expect(await screen.findByText('User detail')).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
    expect(
      screen.getByText('2021-01-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
    // back-to-mainﾓｯｸｸﾘｯｸﾃｽﾄ
    userEvent.click(screen.getByTestId('back-to-main'))
    expect(await screen.findByText('SSG+ISR')).toBeInTheDocument()
    // User detailﾓｯｸｸﾘｯｸﾃｽﾄ
    userEvent.click(
      screen.getByTestId('link-2b07950f-9959-1bc7-834d-5656e4aeaac2')
    )
    expect(await screen.findByText('User detail')).toBeInTheDocument()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
    expect(
      screen.getByText('2021-02-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
  })
})
