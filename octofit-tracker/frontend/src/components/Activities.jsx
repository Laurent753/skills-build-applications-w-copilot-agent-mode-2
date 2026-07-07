import { useEffect, useState } from 'react'
import { fetchJson, normalizeCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        const payload = await fetchJson('/api/activities/')
        setActivities(normalizeCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <h1 className="h3 fw-bold mb-3">Activities</h1>
        <p className="text-muted">Recent training activity captured by the backend.</p>

        {loading && <div className="alert alert-info">Loading activities…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {activities.length ? activities.map((activity, index) => (
              <div key={`${activity.title || 'activity'}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="h5 mb-0">{activity.title || 'Untitled activity'}</h2>
                    <span className="badge bg-primary">{activity.type || 'fitness'}</span>
                  </div>
                  <p className="text-muted small mb-2">Owner: {activity.owner || 'Unknown'}</p>
                  <p className="mb-1"><strong>Duration:</strong> {activity.duration ?? '—'} min</p>
                  <p className="mb-0"><strong>Calories:</strong> {activity.calories ?? '—'}</p>
                </div>
              </div>
            )) : <div className="col-12"><div className="alert alert-secondary mb-0">No activities available.</div></div>}
          </div>
        )}
      </div>
    </section>
  )
}

export default Activities
