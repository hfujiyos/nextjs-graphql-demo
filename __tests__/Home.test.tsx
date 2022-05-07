/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

/** ﾃｽﾄｺｰﾄﾞ｜Homeｺﾝﾎﾟｰﾈﾝﾄをﾚﾝﾀﾞﾘﾝｸﾞして指定ﾃｷｽﾄを読取できればﾃｽﾄ成功 */
it('Should render title text', () => {
  if (typeof window === 'object') {
    render(<Home />)
    expect(screen.getByText('Next.js + GraphQL')).toBeInTheDocument()
  }
})
