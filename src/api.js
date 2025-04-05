// src/api.js
import axios from 'axios';

export const API_BASE = 'https://notes-backend-production-b3e4.up.railway.app';

// Optionally create a pre‑configured axios instance:
export const api = axios.create({
  baseURL: API_BASE,
  // you can add default headers here, e.g. authorization tokens
});
