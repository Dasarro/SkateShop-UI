import { useState } from 'react';
import { getProducers } from '../api/producersAPI';
import { Producer } from './../api/types';

export const useProducers = () => {
    const [producers, setProducers] = useState<Producer[]>([]);

    const fetchProducers = async (): Promise<Boolean> => {
        const producers = await getProducers();

        if (producers !== null && producers.length > 0) {
            setProducers(producers);
            return true;
        }

        return false;
    }
    
    return { producers, fetchProducers };
}