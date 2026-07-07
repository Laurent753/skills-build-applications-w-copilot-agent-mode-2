import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness tracking experience powered by React, Express, and MongoDB.
              </p>
              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item">User profiles and authentication</li>
                <li className="list-group-item">Activity logging and team challenges</li>
                <li className="list-group-item">Leaderboards and personalized workout suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
