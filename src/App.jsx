import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import PersonDetailSkeleton from './components/skeleton/PersonDetailSkeleton.jsx'
import { people } from './data/people.js'
import AppLayout from './layouts/AppLayout.jsx'
import ArenaPage from './pages/ArenaPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import PeopleIndex from './pages/people/PeopleIndex.jsx'
import PeopleLayout from './pages/people/PeopleLayout.jsx'
import { loadPersonDetail } from './routes/lazyRoutes.js'
import './App.css'

// Module top level: one stable lazy component, never re-created per render.
const PersonDetail = lazy(loadPersonDetail)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ArenaPage />} />
        <Route path="people" element={<PeopleLayout people={people} />}>
          <Route index element={<PeopleIndex />} />
          <Route
            path=":id"
            element={
              <Suspense fallback={<PersonDetailSkeleton />}>
                <PersonDetail people={people} />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
