import {useQuery} from 'react-query';
import queryKeys from '../config/queryKeys';
import {getAllEntries} from '../utils/http';

export default function useEntries() {
  return useQuery(queryKeys.entries, getAllEntries, {
    staleTime: 5000,
  });
}
