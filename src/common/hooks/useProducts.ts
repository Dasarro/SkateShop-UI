import { useState } from "react";
import { Product } from "../api/types";
import {
  getDiscountedProducts,
  getCategoryProducts,
  getRandomCategoryProducts,
  getSpecifiedProducts,
  getProduct,
  getProducts
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

export const useCategoryProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  const fetchCategoryProducts = async (categoryId: number): Promise<boolean> => {
    const categoryProducts = await getCategoryProducts(categoryId);

    if (categoryProducts !== null && categoryProducts.length > 0) {
      setCategoryProducts(categoryProducts);
      return true;
    }

    return false;
  }

  const fetchRandomCategoryProducts = async (productId: number): Promise<boolean> => {
    const categoryProducts = await getRandomCategoryProducts(productId);

    if (categoryProducts !== null && categoryProducts.length > 0) {
      setCategoryProducts(categoryProducts);
      return true;
    }

    return false;
  }

  return { categoryProducts, fetchCategoryProducts, fetchRandomCategoryProducts };
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async (): Promise<boolean> => {
    const products = await getProducts();

    if (products !== null && products.length > 0) {
      setProducts(products);
      return true;
    }

    return false;
  }

  const fetchSpecifiedProducts = async (productIds: Number[]): Promise<boolean> => {
    const products = await getSpecifiedProducts(productIds);

    if (products !== null && products.length > 0) {
      setProducts(products);
      return true;
    }

    return false;
  }

  return { products, fetchProducts, fetchSpecifiedProducts };
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
