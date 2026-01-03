import { Router } from 'express';

const router = Router();

// GET /matches
router.get('/', (_req, res) => {
  // Placeholder for retrieving matches from Airtable
  res.json({ matches: [] });
});

// POST /matches
router.post('/', (_req, res) => {
  // Placeholder for creating a new match in Airtable
  res.status(201).json({ message: 'Match created' });
});

export default router;