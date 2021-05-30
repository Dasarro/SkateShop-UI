import axios from 'axios';
import { Producer } from './types';

export const getProducers = (): Promise<Producer[]> => (
    axios.get('/api/Producer')
         .then(response => response.data)
         .catch(() => null)
);
