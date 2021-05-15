import { useState } from "react";
import { Product } from "../api/types";
import {
  getDiscountedProducts,
  getCategoryProducts,
  getProduct
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

export const useProduct = (productId: number) => {
  const [product, setProduct] = useState<Product>();

  const fetchProduct = async (): Promise<boolean> => {
    const product = await getProduct(productId);

    if (product !== null) {
      setProduct(product);
      return true;
    }

    return false;
  }

  return { product, fetchProduct };
}
