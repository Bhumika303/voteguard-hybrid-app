import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>VoteGuard</h1>
        <p>Hybrid Algorand Voting Verification Dashboard</p>
      </header>

      <section className="search-box">
        <input
          type="text"
          placeholder="Enter election name..."
        />
        <button>Search</button>
      </section>

      <p className="helper">
        Supported samples: techsummit, musicfest, careersfair,
        startupdemo, sportsnight, graduationexpo
      </p>

      <section className="summary-panel">
        <h2>Election Summary</h2>
        <p>Search for an election to view results and verification status.</p>
      </section>

      <section className="card-grid">
        <div className="card">
          <h3>Event Details</h3>
          <p>Name: --</p>
          <p>Date: --</p>
          <p>Location: --</p>
        </div>

        <div className="card">
          <h3>Venue Status</h3>
          <p>Status: --</p>
          <p>Location: --</p>
        </div>

        <div className="card">
          <h3>Verification Status</h3>
          <p>Status: --</p>
          <p>Attendance: --</p>
        </div>
      </section>

      <section className="blockchain-panel">
        <h2>Blockchain Record</h2>
        <p>Record verified election data on Algorand blockchain.</p>
        <button>Record to Blockchain</button>
      </section>
    </div>
  );
}

export default App;