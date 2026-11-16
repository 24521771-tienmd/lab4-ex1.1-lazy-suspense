import { NavLink, Outlet } from 'react-router'
import './people.css'

const navLinkClassName = ({ isActive }) => (isActive ? 'active-link' : 'link')

/**
 * Master list of player dossiers with a nested detail outlet.
 * Uses <section> (not <main>): AppLayout owns the single <main> (Decision D1).
 *
 * @param {{ people: ReadonlyArray<import('../../data/people.js').Person> }} props
 */
export default function PeopleLayout({ people }) {
  return (
    <section className="people-frame">
      <nav aria-label="Player dossiers">
        <ul>
          {people.map((person) => (
            <li key={person.id}>
              <NavLink
                to={`/people/${person.id}`}
                className={navLinkClassName}
              >
                {person.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <section className="content-area">
        <Outlet />
      </section>
    </section>
  )
}
