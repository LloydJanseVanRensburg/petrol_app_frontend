import api from './api';

export default async function getAllEntries() {
  const {data} = await api.get('/entries');
  return data;
}
