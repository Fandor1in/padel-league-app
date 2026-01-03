// API helper functions to interact with the backend server

/**
 * Base URL for the backend. In a production deployment you should set
 * VITE_BACKEND_URL in your environment (e.g. via a .env file) and use
 * import.meta.env.VITE_BACKEND_URL.  For now we default to relative
 * requests assuming the frontend is served from the same domain.
 */
const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

export interface PlayerInput {
  telegramId: string;
  name: string;
  username?: string;
}

/**
 * Join the league by registering the current Telegram user on the backend.
 * Sends a POST request to `/players` with the player's Telegram details.
 */
export const joinLeague = async (player: PlayerInput) => {
  const response = await fetch(`${BASE_URL}/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });
  if (!response.ok) {
    throw new Error('Failed to join league');
  }
  return response.json();
};

/**
 * Create a new pair (team) on the backend.  Accepts an object containing
 * identifiers for the players forming the pair.  The backend will store
 * the pair and return the created record.
 */
export const createPair = async (pair: { playerIds: string[] }) => {
  const response = await fetch(`${BASE_URL}/pairs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pair),
  });
  if (!response.ok) {
    throw new Error('Failed to create pair');
  }
  return response.json();
};

/**
 * Submit a match result to the backend.  The payload should include the
 * identifiers of the competing pairs and the set scores.  The backend
 * validates padel scoring rules and stores the match.
 */
export const addMatchResult = async (match: {
  pair1Id: string;
  pair2Id: string;
  scores: string[];
}) => {
  const response = await fetch(`${BASE_URL}/matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(match),
  });
  if (!response.ok) {
    throw new Error('Failed to submit match');
  }
  return response.json();
};