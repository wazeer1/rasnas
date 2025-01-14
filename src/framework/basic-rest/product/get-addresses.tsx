import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

// Function to fetch addresses
const fetchAddress = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_ADDRESSES);
  return data?.app_data?.data || []; // Ensure data is an array
};

// Custom React Query hook
const useFetchAddress = () => {
  return useQuery({
    queryKey: [API_ENDPOINTS.GET_ADDRESSES], // Unique query key for React Query
    queryFn: fetchAddress, // Function to fetch the data
  });
};

export { useFetchAddress, fetchAddress };
