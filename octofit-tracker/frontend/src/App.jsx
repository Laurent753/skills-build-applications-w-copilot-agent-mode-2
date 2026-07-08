import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { getApiBaseUrl } from './api.js'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const apiBaseUrl = getApiBaseUrl()

  return (
    <div className="min-vh-100 bg-light">
      <header className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            OctoFit Tracker
          </NavLink>
          <nav className="navbar-nav flex-row gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function HomePage({ apiBaseUrl }) {
  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
          <div>
            <p className="text-uppercase text-muted small mb-2">Presentation tier</p>
            <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
            <p className="lead text-muted mb-0">
              A React 19 single-page experience connected to the Express backend and MongoDB data layer.
            </p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <div className="border rounded p-3 h-100">
              <h2 className="h5">Environment configuration</h2>
              <p className="small text-muted mb-3">
                Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when running in GitHub Codespaces.
              </p>
              <pre className="bg-dark text-light p-3 rounded small">VITE_CODESPACE_NAME=your-codespace-name</pre>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border rounded p-3 h-100">
              <h2 className="h5">Active API base</h2>
              <p className="small text-muted mb-2">The UI will call:</p>
              <code className="d-block small">{apiBaseUrl}/api/activities/</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
