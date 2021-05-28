import axios from 'axios';
import { Product } from './types';

export const getDiscountedProducts = (): Promise<Product[]> => (
    axios.get('/api/Product/discount')
         .then(response => response.data)
         .catch(() => null)
);

export const getBestsellingProducts = (): Promise<Product[]> => (
    axios.get('/api/Product/bestsellers')
         .then(response => response.data)
         .catch(() => null)
);

export const getCategoryProducts = (categoryId: number): Promise<Product[]> => (
    axios.get(`/api/Product/category/${categoryId}`)
         .then(response => response.data)
         .catch(() => null)
);

export const getProducts = (): Promise<Product[]> => (
    axios.get('/api/Product')
         .then(response => response.data)
         .catch(() => null)
);

export const getProduct = (productId: number): Promise<Product> => (
    axios.get(`/api/Product/${productId}`)
         .then(response => response.data)
         .catch(() => null)
);

export const getRandomCategoryProducts = (productId: number): Promise<Product[]> => (
    axios.get(`/api/Product/${productId}/othersFromCategory`)
         .then(response => response.data)
         .catch(() => null)
);

export const getSpecifiedProducts = (productIds: Number[]): Promise<Product[]> => (
    axios.get(`/api/Product/list?idsInString=${productIds}`)
         .then(response => response.data)
         .catch(() => null)
);
