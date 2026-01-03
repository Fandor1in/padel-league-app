import { Router } from 'express';
import { getPlayers, createPlayer } from '../services/airtable';

const router = Router();

// GET /players – returns a list of player records from Airtable
router.get('/', async (_req, res) => {
  try {
    const players = await getPlayers();
    res.json({ players });
  } catch (err) {
    console.error('Error fetching players', err);
    res.status(500).json({ message: 'Failed to fetch players' });
  }
});

// POST /players – create a new player in Airtable
router.post('/', async (req, res) => {
  const { telegramId, name, username } = req.body;
  if (!telegramId || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const record = await createPlayer({ telegramId, name, username });
    res.status(201).json({ message: 'Player created', record });
  } catch (err) {
    console.error('Error creating player', err);
    res.status(500).json({ message: 'Failed to create player' });
  }
});

export default router;