// API configuration
const API_BASE_URL =
  (import.meta as unknown as { env: { [key: string]: string } }).env
    ?.VITE_API_BASE_URL ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}/api/`
    : "http://localhost:3001/api/");

export const API_ENDPOINTS = {
  BETTING_SLIPS: `${API_BASE_URL}betting-slips`,
  HEALTH: `${API_BASE_URL}health`,
  ANALYTICS: `${API_BASE_URL}betting-slips/analytics`,
};
