const BACKEND_URL = process.env.BACKEND_API_URL ?? "http://localhost:3002";

export const env = {
  /** Server-side only. Base URL for the Ivy/Midlej backend API. */
  BACKEND_API_URL: BACKEND_URL.replace(/\/$/, ""),
};
