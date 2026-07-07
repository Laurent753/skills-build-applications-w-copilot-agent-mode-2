import { useEffect, useState } from 'react'
import { fetchJson, normalizeCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        const payload = await fetchJson('/api/teams/')
        setTeams(normalizeCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <h1 className="h3 fw-bold mb-3">Teams</h1>
        <p className="text-muted">Track the squads driving your challenges.</p>

        {loading && <div className="alert alert-info">Loading teams…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {teams.length ? teams.map((team, index) => (
              <div key={`${team.name || 'team'}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h2 className="h5">{team.name || 'Unnamed team'}</h2>
                  <p className="text-muted small mb-2">Sport: {team.sport || 'fitness'}</p>
                  <ul className="mb-0 ps-3">
                    {(team.members || []).map((member, memberIndex) => (
                      <li key={`${member}-${memberIndex}`}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )) : <div className="col-12"><div className="alert alert-secondary mb-0">No teams available.</div></div>}
          </div>
        )}
      </div>
    </section>
  )
}

export default Teams
