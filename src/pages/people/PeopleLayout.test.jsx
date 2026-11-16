import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '../../App.jsx'
import { people } from '../../data/people.js'
import PeopleLayout from './PeopleLayout.jsx'

describe('PeopleLayout master list', () => {
  it('lists one dossier link per person and the index prompt at /people', () => {
    render(
      <MemoryRouter initialEntries={['/people']}>
        <App />
      </MemoryRouter>,
    )

    const dossierNav = screen.getByRole('navigation', {
      name: 'Player dossiers',
    })
    const dossierLinks = within(dossierNav).getAllByRole('link')
    expect(dossierLinks).toHaveLength(people.length)
    for (const person of people) {
      expect(
        within(dossierNav).getByRole('link', { name: person.name }),
      ).toHaveAttribute('href', `/people/${person.id}`)
    }

    expect(screen.getByText(/select a player dossier/i)).toBeInTheDocument()

    const primaryNav = screen.getByRole('navigation', { name: 'Primary' })
    const peopleLink = within(primaryNav).getByRole('link', { name: 'People' })
    expect(peopleLink).toHaveAttribute('aria-current', 'page')
    expect(peopleLink).toHaveClass('active-link')
  })

  it('marks only the selected person link active at /people/p-002', () => {
    // The :id detail route arrives in T16, so this test mounts PeopleLayout
    // in a minimal route tree with an empty :id child.
    render(
      <MemoryRouter initialEntries={['/people/p-002']}>
        <Routes>
          <Route path="/people" element={<PeopleLayout people={people} />}>
            <Route path=":id" element={null} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    const dossierNav = screen.getByRole('navigation', {
      name: 'Player dossiers',
    })

    for (const person of people) {
      const link = within(dossierNav).getByRole('link', { name: person.name })
      if (person.id === 'p-002') {
        expect(link).toHaveAttribute('aria-current', 'page')
        expect(link).toHaveClass('active-link')
      } else {
        expect(link).not.toHaveAttribute('aria-current')
        expect(link).toHaveClass('link')
      }
    }
  })
})
