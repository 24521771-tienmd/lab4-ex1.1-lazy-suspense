import { NavLink, Outlet } from 'react-router'

const navLinkClassName = ({ isActive }) => (isActive ? 'active-link' : 'link')

export default function AppLayout() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#main-content">
          KRAFTON <span aria-hidden="true">×</span> PUBG Vietnam
        </a>
        <nav aria-label="Primary">
          <ul>
            <li>
              <NavLink to="/" end className={navLinkClassName}>
                Arena
              </NavLink>
            </li>
            <li>
              <NavLink to="/people" className={navLinkClassName}>
                People
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="arena-main" id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>KRAFTON x PUBG Vietnam Championship &amp; Airdrop Arena</p>
      </footer>
    </>
  )
}
