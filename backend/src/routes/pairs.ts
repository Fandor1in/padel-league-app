import { Router } from 'express';

const router = Router();

// GET /pairs
router.get('/', (_req, res) => {
  // Placeholder for retrieving pairs from Airtable
  res.json({ pairs: [] });
});

// POST /pairs
router.post('/', (_req, res) => {
  // Placeholder for creating a new pair in Airtable
  res.status(201).json({ message: 'Pair created' });
});

export default router;