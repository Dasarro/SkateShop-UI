import { useState } from "react";
import { Product } from "../api/types";
import {
  getDiscountedProducts,
  getCategoryProducts
} from '../api/productsAPI';

export const useDiscountedProducts = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);

  const fetchDiscountedProducts = async (): Promise<boolean> => {
    const discountedProducts = await getDiscountedProducts();

    if (discountedProducts !== null && discountedProducts.length > 0) {
        setDiscountedProducts(discountedProducts);
        return true;
    }

    return false;
  }

  return { discountedProducts, fetchDiscountedProducts };
}

export const useCategoryProducts = (categoryId: number) => {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  const fetchCategoryProducts = async (): Promise<boolean> => {
    const categoryProducts = await getCategoryProducts(categoryId);

    if (categoryProducts !== null && categoryProducts.length > 0) {
        setCategoryProducts(categoryProducts);
        return true;
    }

    return false;
  }

  return { categoryProducts, fetchCategoryProducts };
}
