import { Order } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchOrder = async (_id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.ORDERS_DETAILS}/${_id}/`);
  return data;
};
export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>({
    queryKey: [API_ENDPOINTS.ORDERS_DETAILS, id],
    queryFn: () => fetchOrder(id),
  });
};
