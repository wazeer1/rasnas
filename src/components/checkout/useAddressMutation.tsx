import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

export interface AddressInputType {
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  post_code: string;
}

async function postAddress(input: AddressInputType) {
  console.log("in post");

  try {
    const response = await http.post(API_ENDPOINTS.ADD_ADDRESS, input);
    console.log(response);

    if (response.data.StatusCode === 6000) {
      return response.data;
    } else {
      throw new Error(
        response.data?.app_data?.errors || "Failed to add address"
      );
    }
  } catch (error: any) {
    console.log(error);
    console.error(
      "Address addition failed:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.app_data?.errors || "Address addition failed"
    );
  }
}

export const useAddAddressMutation = () => {
  const queryClient = useQueryClient(); // Access query client

  return useMutation({
    mutationFn: (input: AddressInputType) => postAddress(input),
    onSuccess: (data) => {
      console.log("Address added successfully:", data);

      // Trigger the GET API to refresh the addresses list
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_ADDRESSES],
      });
    },
    onError: (error) => {
      console.error("Error adding address:", error);
    },
  });
};
