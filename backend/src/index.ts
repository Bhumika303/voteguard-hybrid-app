
import express from 'express';
import cors from 'cors';
import { events } from './data/events.js';
import { recordTransaction } from './Blockchain/algorand.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('VoteGuard backend server is running');
});

app.get('/api/event/:name', (req, res) => {
  const key = req.params.name.toLowerCase();
  const event = events[key as keyof typeof events];

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json({
    name: event.name,
    date: event.date,
    location: event.location
  });
});

app.get('/api/venue/:name', (req, res) => {
  const key = req.params.name.toLowerCase();
  const event = events[key as keyof typeof events];

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json({
    venueStatus: event.venueStatus,
    location: event.location
  });
});

app.get('/api/verification/:name', (req, res) => {
  const key = req.params.name.toLowerCase();
  const event = events[key as keyof typeof events];

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json({
    verificationStatus: event.verificationStatus,
    attendance: event.attendance
  });
});

app.get('/api/summary/:name', (req, res) => {
  const key = req.params.name.toLowerCase();
  const event = events[key as keyof typeof events];

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json(event);
});

app.post('/api/blockchain/record', async (req, res) => {
  const result = await recordTransaction(
    JSON.stringify(req.body)
  );

  res.json(result);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});