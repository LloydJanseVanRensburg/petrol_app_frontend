export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://stormy-taiga-44272.herokuapp.com/api'
    : 'http://localhost:1337/api';
