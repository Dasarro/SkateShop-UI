import axios from 'axios';
import { Product } from './types';

export const getDiscountedProducts = (): Promise<Product[]> => (
    axios.get('/api/Product/discount')
         .then(response => response.data)
         .catch(() => null)
);

export const getCategoryProducts = (categoryId: number): Promise<Product[]> => (
    axios.get(`/api/Product/category/${categoryId}`)
         .then(response => response.data)
         .catch(() => null)
);
