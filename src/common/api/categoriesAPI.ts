import axios from 'axios';
import { Category, Product } from './types';

export const getCategories = (): Promise<Category[]> => (
    axios.get('/api/Category')
         .then(response => response.data)
         .catch(() => null)
);

export const getCategory = (categoryId: number): Promise<Category> => (
    axios.get(`/api/Category/${categoryId}`)
         .then(response => response.data)
         .catch(() => null)
);
