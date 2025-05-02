import { QueryOptionsType } from "@framework/types"; // Ensure this is defined
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface FetchCartParams {
  user_id?: number;
  [key: string]: any;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface FetchCartResponse {
  items: CartItem[];
  product_total: number;
}

// Fetch function for cart
const fetchCart = async ({
  queryKey,
}: {
  queryKey: [string, FetchCartParams?];
}): Promise<FetchCartResponse> => {
  const [_key, params] = queryKey;

  const response = await http.get(API_ENDPOINTS.CART_ITEMS, { params });

  const { app_data } = response.data;
  const { cart_items: items, product_total } = app_data.data;

  return {
    items,
    product_total,
  };
};

// React Query hook for fetching cart data
const useCartQuery = (options?: FetchCartParams) => {
  const queryClient = useQueryClient();

  return useQuery<FetchCartResponse>({
    queryKey: [API_ENDPOINTS.CART_ITEMS, options],
    queryFn: fetchCart,
    onSuccess: () => {
      // Invalidate the cart query after the cart is fetched
      queryClient.invalidateQueries([API_ENDPOINTS.CART_ITEMS]);
    },
  });
};

export { useCartQuery, fetchCart };
