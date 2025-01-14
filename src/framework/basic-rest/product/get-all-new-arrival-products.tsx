import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchNewArrivalProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);
  if (data.app_data.StatusCode === 6000){
    return data.app_data.data
  }
};

const fetchNewArrivalAncientProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT);
  if (data.app_data.StatusCode === 6000){
    return data.app_data.data
  }
};

export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<Product[], Error>({
      queryKey: [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT, options],
      queryFn: fetchNewArrivalAncientProducts
    });
  }
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS_ANCIENT, options],
    queryFn: fetchNewArrivalProducts
  });
};
