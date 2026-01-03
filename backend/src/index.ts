import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import playersRouter from './routes/players';
import pairsRouter from './routes/pairs';
import matchesRouter from './routes/matches';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Mount API routes
app.use('/players', playersRouter);
app.use('/pairs', pairsRouter);
app.use('/matches', matchesRouter);

// Health check endpoint
app.get('/', (_req, res) => {
  res.send('Padel League backend is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});