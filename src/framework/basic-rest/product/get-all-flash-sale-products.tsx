import { QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import userStore from '@contexts/userStore';
// import useCounterStore from '@contexts/userStore';

export const fetchFlashSaleProducts = async () => {
  const country = userStore((state) => state.country);
  const { data } = await http.get(`${country}/${API_ENDPOINTS.FLASH_SALE_PRODUCTS}`);
  if (data.app_data.StatusCode === 6000) {
    return data.app_data.data;
  }
  throw new Error('Failed to fetch flash sale products');
};

const fetchAncientFlashSaleProducts = async (country: string) => {
  const { data } = await http.get(`products/${country}/viewproduct/`);
  console.log('====================================');
  console.log(data.app_data.data);
  console.log('====================================');
  return data.app_data.data;
};

export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  // const country = userStore((state) => state.country); // Define country here
  console.log('====================================');
  console.log(options.country);
  console.log('====================================');

  if (options.demoVariant === 'ancient') {
    return useQuery<any, Error>({
      queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT, options],
      queryFn: () => fetchAncientFlashSaleProducts(options.country), // Call the correct function
    });
  }

  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    queryFn: () => fetchAncientFlashSaleProducts(options.country),
  });
};
