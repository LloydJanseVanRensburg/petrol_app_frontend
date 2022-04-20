import React, {createContext, useState, useCallback} from 'react';
import {API_URL} from '../../config/config';

export const EntriesContext = createContext();

const EntriesProvider = ({children}) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAllEntries = useCallback(async () => {
    try {
      setLoading(true);
      const resEntries = await fetch(`${API_URL}/entries`);

      if (!resEntries.ok) {
        setLoading(false);
        setError('Something went wrong');
        return;
      }

      const dataEntries = await resEntries.json();

      setEntries(dataEntries.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, []);

  const deleteEntry = async id => {
    try {
      const entryRes = await fetch(`${API_URL}/entries/${id}`, {
        method: 'DELETE',
      });

      if (!entryRes.ok) {
        console.log('Something went wrong');
        return;
      }

      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EntriesContext.Provider
      value={{
        entries,
        loading,
        error,
        setEntries,
        setLoading,
        setError,
        loadAllEntries,
        deleteEntry,
      }}>
      {children}
    </EntriesContext.Provider>
  );
};

export default EntriesProvider;
