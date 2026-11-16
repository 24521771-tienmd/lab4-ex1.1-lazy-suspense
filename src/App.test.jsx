import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('renders the arena heading', () => {
    renderAt('/')

    expect(
      screen.getByRole('heading', { level: 1, name: 'KRAFTON x PUBG Vietnam' }),
    ).toBeInTheDocument()
  })
})

describe('App layout and primary navigation', () => {
  it('renders one main landmark and the Primary navigation at /', () => {
    renderAt('/')

    expect(screen.getAllByRole('main')).toHaveLength(1)

    const primaryNav = screen.getByRole('navigation', { name: 'Primary' })
    expect(
      within(primaryNav).getByRole('link', { name: 'Arena' }),
    ).toHaveAttribute('href', '/')
    expect(
      within(primaryNav).getByRole('link', { name: 'People' }),
    ).toHaveAttribute('href', '/people')
  })

  it('marks the Arena link active and shows the arena heading at /', () => {
    renderAt('/')

    const primaryNav = screen.getByRole('navigation', { name: 'Primary' })
    const arenaLink = within(primaryNav).getByRole('link', { name: 'Arena' })
    expect(arenaLink).toHaveAttribute('aria-current', 'page')
    expect(arenaLink).toHaveClass('active-link')

    expect(
      screen.getByRole('heading', { level: 1, name: 'KRAFTON x PUBG Vietnam' }),
    ).toBeInTheDocument()
  })

  it('renders the not-found page with a link back home for unknown URLs', () => {
    renderAt('/does-not-exist')

    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument()

    const main = screen.getByRole('main')
    const homeLinks = within(main)
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '/')
    expect(homeLinks.length).toBeGreaterThan(0)
  })
})
