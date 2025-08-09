// API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:3001`
    : "http://localhost:3001");

export const API_ENDPOINTS = {
  BETTING_SLIPS: `${API_BASE_URL}/api/betting-slips`,
  HEALTH: `${API_BASE_URL}/api/health`,
  ANALYTICS: `${API_BASE_URL}/api/betting-slips/analytics`,
};
