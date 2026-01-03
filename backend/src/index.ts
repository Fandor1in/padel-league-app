import express from 'express';
import bodyParser from 'body-parser';
import playersRouter from './routes/players';
import pairsRouter from './routes/pairs';
import matchesRouter from './routes/matches';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/players', playersRouter);
app.use('/pairs', pairsRouter);
app.use('/matches', matchesRouter);

app.get('/', (_req, res) => {
  res.send('Padel League backend is running');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});