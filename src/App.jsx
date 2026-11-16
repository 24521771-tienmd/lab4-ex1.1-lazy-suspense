import { Route, Routes } from 'react-router'
import { people } from './data/people.js'
import AppLayout from './layouts/AppLayout.jsx'
import ArenaPage from './pages/ArenaPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import PeopleIndex from './pages/people/PeopleIndex.jsx'
import PeopleLayout from './pages/people/PeopleLayout.jsx'
import PersonDetail from './pages/people/PersonDetail.jsx'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ArenaPage />} />
        <Route path="people" element={<PeopleLayout people={people} />}>
          <Route index element={<PeopleIndex />} />
          <Route path=":id" element={<PersonDetail people={people} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
