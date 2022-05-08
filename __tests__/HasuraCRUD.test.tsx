/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
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

// ﾃｽﾄｺｰﾄﾞ｜HasuraCRUDｺﾝﾎﾟｰﾈﾝﾄをﾚﾝﾀﾞﾘﾝｸﾞしてGetUsersﾓｯｸﾃﾞｰﾀを読取できればﾃｽﾄ成功
describe('Hasura CRUD Test Cases', () => {
  it('Should render the list of users by useQuery', async () => {
    // 初回ﾚﾝﾀﾞﾘﾝｸﾞﾃｽﾄ
    const { page } = await getPage({
      route: '/hasura-crud',
    })
    await waitFor(() => {
      render(page)
    })
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()
    expect(await screen.findByText('Test user A')).toBeInTheDocument()
    expect(
      screen.getByText('2021-01-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-b6137849-7f1d-c2db-e609-22056fb86db3')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-b6137849-7f1d-c2db-e609-22056fb86db3')
    ).toBeTruthy()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
    expect(
      screen.getByText('2021-02-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-2b07950f-9959-1bc7-834d-5656e4aeaac2')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-2b07950f-9959-1bc7-834d-5656e4aeaac2')
    ).toBeTruthy()
    expect(screen.getByText('Test user C')).toBeInTheDocument()
    expect(
      screen.getByText('2021-03-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-7fe58619-10ec-5239-6f43-1da15a634aba')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-7fe58619-10ec-5239-6f43-1da15a634aba')
    ).toBeTruthy()
  })
})
