import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [eventData, setEventData] = useState<any>(null);
  const [venueData, setVenueData] = useState<any>(null);
  const [verifyData, setVerifyData] = useState<any>(null);
  const [summaryData, setSummaryData] = useState<any>(null);
  const [message, setMessage] = useState('');

  const baseUrl = 'http://localhost:5000';

  const handleSearch = async () => {
    try {
      const eventRes = await axios.get(`${baseUrl}/api/event/${search}`);
      const venueRes = await axios.get(`${baseUrl}/api/venue/${search}`);
      const verifyRes = await axios.get(`${baseUrl}/api/verification/${search}`);
      const summaryRes = await axios.get(`${baseUrl}/api/summary/${search}`);

      setEventData(eventRes.data);
      setVenueData(venueRes.data);
      setVerifyData(verifyRes.data);
      setSummaryData(summaryRes.data);
      setMessage('');
    } catch (error) {
      setMessage('Election not found');
    }
  };

  const handleBlockchainRecord = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/blockchain/record`,
        {
          election: search,
          timestamp: new Date().toISOString(),
          status: 'verified'
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Blockchain record failed');
    }
  };

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      <p className="helper">
        techsummit, musicfest, careersfair, startupdemo,
        sportsnight, graduationexpo
      </p>

      {message && <p className="helper">{message}</p>}

      <section className="summary-panel">
        <h2>Election Summary</h2>
        <p>{summaryData ? summaryData.summary : 'Search to view summary.'}</p>
      </section>

      <section className="card-grid">
        <div className="card">
          <h3>Event Details</h3>
          <p>Name: {eventData?.name || '--'}</p>
          <p>Date: {eventData?.date || '--'}</p>
          <p>Location: {eventData?.location || '--'}</p>
        </div>

        <div className="card">
          <h3>Venue Status</h3>
          <p>Status: {venueData?.venueStatus || '--'}</p>
          <p>Location: {venueData?.location || '--'}</p>
        </div>

        <div className="card">
          <h3>Verification Status</h3>
          <p>Status: {verifyData?.verificationStatus || '--'}</p>
          <p>Attendance: {verifyData?.attendance || '--'}</p>
        </div>
      </section>

      <section className="blockchain-panel">
        <h2>Blockchain Record</h2>
        <p>Store verified election data on blockchain.</p>
        <button onClick={handleBlockchainRecord}>
          Record to Blockchain
        </button>
      </section>
    </div>
  );
}

export default App;