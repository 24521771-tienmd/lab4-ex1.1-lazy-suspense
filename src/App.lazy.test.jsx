import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { people } from './data/people.js'

/**
 * Suspense is made observable deterministically: the lazy loader returns a
 * promise the test resolves by hand. No timers.
 */
function createDeferred() {
  let resolve
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise
  })
  return { promise, resolve }
}

const control = vi.hoisted(() => ({ personDetail: null }))

// Keep every real loader (later tasks add more) and replace only the one under test.
vi.mock('./routes/lazyRoutes.js', async (importOriginal) => ({
  ...(await importOriginal()),
  loadPersonDetail: () => control.personDetail.promise,
}))

async function renderAppAt(path) {
  // lazy() caches its resolved module, so every test needs a fresh App module graph.
  const { default: App } = await import('./App.jsx')
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.resetModules()
  control.personDetail = createDeferred()
})

describe('lazy PersonDetail route', () => {
  it('shows the dossier skeleton and keeps the sidebar while the chunk loads, then swaps in the dossier', async () => {
    const person = people.find((p) => p.id === 'p-001')
    await renderAppAt('/people/p-001')

    // While the PersonDetail chunk is pending: skeleton inside the busy region…
    const label = await screen.findByText('Loading player dossier')
    expect(label.closest('[aria-busy]')).toHaveAttribute('aria-busy', 'true')
    // …and the master list stays mounted.
    expect(
      await screen.findByRole('navigation', { name: 'Player dossiers' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { level: 2, name: person.name }),
    ).not.toBeInTheDocument()

    // Resolve the chunk with the real module.
    const personDetailModule = await import('./pages/people/PersonDetail.jsx')
    await act(async () => {
      control.personDetail.resolve(personDetailModule)
    })

    expect(
      await screen.findByRole('heading', { level: 2, name: person.name }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Loading player dossier')).not.toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Player dossiers' }),
    ).toBeInTheDocument()
  })
})
