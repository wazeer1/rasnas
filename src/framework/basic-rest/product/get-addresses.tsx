import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Function to fetch addresses
const fetchAddress = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_ADDRESSES);
  return data?.app_data?.data || [];
};

// Function to delete an address by ID
const deleteAddress = async (id: string) => {
  return await http.delete(`${API_ENDPOINTS.DELETE_ADDRESS}${id}/`);
};

// Custom React Query hook to fetch addresses
const useFetchAddress = () => {
  return useQuery({
    queryKey: [API_ENDPOINTS.GET_ADDRESSES],
    queryFn: fetchAddress,
  });
};

// Custom hook to delete address and refetch the list
const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_ADDRESSES],
      });
    },
  });
};

export { useFetchAddress, fetchAddress, deleteAddress, useDeleteAddress };
