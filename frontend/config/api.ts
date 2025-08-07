// API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
  BETTING_SLIPS: `${API_BASE_URL}/api/betting-slips`,
  HEALTH: `${API_BASE_URL}/api/health`,
  ANALYTICS: `${API_BASE_URL}/api/betting-slips/analytics`,
};
