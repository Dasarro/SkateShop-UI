import { useState } from "react";
import { Category } from "../api/types";
import { getCategories, getCategory } from '../api/categoriesAPI';

export const useCategories = () => {
  const [categories, setCategories ] = useState<Category[]>([]);

  const fetchCategories = async (): Promise<boolean> => {
    const categories = await getCategories();

    if (categories !== null && categories.length > 0) {
        setCategories(categories);
        return true;
    }

    return false;
  }

  return { categories, fetchCategories };
}


export const useCategory = (categoryId: number) => {
  const [ category, setCategory ] = useState<Category>();

  const fetchCategory = async (): Promise<boolean> => {
    const category = await getCategory(categoryId);

    if (category !== null) {
        setCategory(category);
        return true;
    }

    return false;
  }

  return { category, fetchCategory };
}
