// src/framework/customer/use-get-customer.ts
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

export interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  phone_number: string;
  mail: string;
  gender: "male" | "female";
}

export const fetchUser = async (): Promise<UserType> => {
  const response = await http.get(API_ENDPOINTS.GET_ACCOUNT_DETAILS);
  return response.data;
};

export const useGetUserQuery = () => {
  return useQuery<UserType>({
    queryKey: [API_ENDPOINTS.GET_ACCOUNT_DETAILS],
    queryFn: fetchUser,
    staleTime: 0,
  });
};
