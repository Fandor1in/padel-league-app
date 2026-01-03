import axios from 'axios';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '../config';

/**
 * Airtable configuration
 * The API uses a base ID and table names to construct endpoints.  This helper
 * centralises the base URL and headers so that functions below can be concise.
 */
const airtableBaseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const defaultHeaders = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
};

const PLAYERS_TABLE = 'Players';

export interface PlayerInput {
  telegramId: string;
  name: string;
  username?: string;
}

/**
 * Retrieve all players from the Airtable `Players` table.
 * Returns raw Airtable record objects. You can map these to your own shape on
 * the caller side if needed.
 */
export const getPlayers = async () => {
  const url = `${airtableBaseUrl}/${PLAYERS_TABLE}`;
  const response = await axios.get(url, { headers: defaultHeaders });
  return response.data.records;
};

/**
 * Create a new player in the Airtable `Players` table. Accepts an object with
 * Telegram identifiers and names. Additional numeric/statistical fields are
 * initialised to zero so the front‑end can display default values immediately.
 *
 * @param player – the player details extracted from Telegram
 */
export const createPlayer = async (player: PlayerInput) => {
  const url = `${airtableBaseUrl}/${PLAYERS_TABLE}`;
  const data = {
    records: [
      {
        fields: {
          'Telegram ID': player.telegramId,
          Name: player.name,
          'Telegram Username': player.username || '',
          'Games Played': 0,
          'Individual Rating': 0,
          Wins: 0,
          Losses: 0,
        },
      },
    ],
  };
  const response = await axios.post(url, data, { headers: defaultHeaders });
  return response.data;
};

// Additional functions for pairs and matches would be defined here