import { Router } from 'express';

const router = Router();

// GET /players
router.get('/', (_req, res) => {
  // Placeholder for retrieving players from Airtable
  res.json({ players: [] });
});

// POST /players
router.post('/', (_req, res) => {
  // Placeholder for creating a new player in Airtable
  res.status(201).json({ message: 'Player created' });
});

export default router;