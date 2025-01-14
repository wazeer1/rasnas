import { QueryOptionsType } from "@framework/types"; // Ensure this is defined
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

// Fetch function for cart
const fetchCart = async () => {
    const response = await http.get(API_ENDPOINTS.CART_ITEMS);
    const { app_data } = response.data;
    const { cart_items: items, product_total } = app_data.data;
  
    return {
      items,
      product_total,
    };
  };

// React Query hook for fetching cart data
const useCartQuery = (options?: QueryOptionsType) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.CART_ITEMS, options], // Add options if necessary
    queryFn: fetchCart,
  });
};

export { useCartQuery, fetchCart };
