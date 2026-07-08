import { useEffect, useState } from 'react'
import { fetchJson, normalizeCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const payload = await fetchJson('/api/leaderboard/')
        setEntries(normalizeCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <h1 className="h3 fw-bold mb-3">Leaderboard</h1>
        <p className="text-muted">View the current training standings.</p>

        {loading && <div className="alert alert-info">Loading leaderboard…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {entries.length ? entries.map((entry, index) => (
                  <tr key={`${entry.name || 'entry'}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{entry.name || 'Unknown'}</td>
                    <td>{entry.score ?? '—'}</td>
                    <td>{entry.category || 'general'}</td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center text-muted">No leaderboard entries available.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default Leaderboard
