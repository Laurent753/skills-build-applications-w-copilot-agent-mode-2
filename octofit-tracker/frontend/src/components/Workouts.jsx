import { useEffect, useState } from 'react'
import { fetchJson, normalizeCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const payload = await fetchJson('/api/workouts/')
        setWorkouts(normalizeCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <h1 className="h3 fw-bold mb-3">Workouts</h1>
        <p className="text-muted">Explore the suggested training routines.</p>

        {loading && <div className="alert alert-info">Loading workouts…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {workouts.length ? workouts.map((workout, index) => (
              <div key={`${workout.title || 'workout'}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="h5 mb-0">{workout.title || 'Untitled workout'}</h2>
                    <span className="badge bg-success">{workout.difficulty || 'standard'}</span>
                  </div>
                  <p className="text-muted small mb-2">Focus: {workout.focus || 'general'}</p>
                  <p className="mb-0"><strong>Duration:</strong> {workout.duration ?? '—'} min</p>
                </div>
              </div>
            )) : <div className="col-12"><div className="alert alert-secondary mb-0">No workouts available.</div></div>}
          </div>
        )}
      </div>
    </section>
  )
}

export default Workouts
