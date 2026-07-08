import { useEffect, useState } from 'react'
import { fetchJson, normalizeCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        const payload = await fetchJson('/api/users/')
        setUsers(normalizeCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <h1 className="h3 fw-bold mb-3">Users</h1>
        <p className="text-muted">Browse the profile roster powering the app.</p>

        {loading && <div className="alert alert-info">Loading users…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {users.length ? users.map((user, index) => (
              <div key={`${user.email || 'user'}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h2 className="h5">{user.name || 'Unnamed user'}</h2>
                  <p className="text-muted small mb-2">{user.email || 'No email supplied'}</p>
                  <p className="mb-1"><strong>Goal:</strong> {user.fitnessGoal || '—'}</p>
                  <p className="mb-0"><strong>Level:</strong> {user.level || '—'}</p>
                </div>
              </div>
            )) : <div className="col-12"><div className="alert alert-secondary mb-0">No users available.</div></div>}
          </div>
        )}
      </div>
    </section>
  )
}

export default Users
