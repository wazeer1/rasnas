import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface AddCart {
  product_id: string;
  attribute_id: string;
  quantity: number;
}

export interface CheckoutInputType {
  product_id: string;
  attribute_id: string;
  quantity: number;
}

export interface AddCartResponse {
  success: boolean;
  message: string;
  data: {
    product_id: string;
    attribute_id: string;
    quantity: number;
  }; // Adjust this based on your API response structure
}

async function addtocart(input: CheckoutInputType): Promise<AddCartResponse> {
  const response = await http.post<AddCartResponse>(
    `${API_ENDPOINTS.ADD_TO_CART}${input.product_id}/`,
    {
      attribute_id: input.attribute_id,
      quantity: input.quantity,
    }
  );
  return response.data; // Extract the data from the response
}

export const useAddCartMutation = () => {
  return useMutation<AddCartResponse, unknown, CheckoutInputType>({
    mutationFn: addtocart,
    onSuccess: (data) => {
      console.log("Add to Cart success response:", data);
      // Additional success logic here, such as updating state or showing a toast
    },
    onError: (error) => {
      console.error("Add to Cart error response:", error);
      // Additional error logic here, such as showing an error toast
    },
  });
};
