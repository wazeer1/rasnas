import { CategoriesQueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchCategories = async () => {
  const response = await http.get(API_ENDPOINTS.CATEGORIES);
  const categoriesData = response.data.app_data.data;
  console.log(categoriesData,"hello world");
  
  return {
    categories: categoriesData || [], // Ensure it returns an empty array if categoriesData is undefined
  };
};

const fetchAncientCategories = async () => {
  const response = await http.get(API_ENDPOINTS.CATEGORIES);
  console.log(response.data.app_data.data, '____erllo');
  const categoriesData = response.data?.data?.app_data?.data;
  return {
    categories: {
      data: categoriesData as Category[],
    },
  };
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<{ categories: { data: Category[] } }, Error>({
      queryKey: [API_ENDPOINTS.CATEGORIES, options],
      queryFn: fetchAncientCategories
    });
  }
  return useQuery<{ categories: { data: Category[] } }, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn: fetchCategories
  });
};
