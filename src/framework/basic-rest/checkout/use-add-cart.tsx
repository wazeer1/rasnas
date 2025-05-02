import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
export interface EditCartInputType {
  cart_item_id: number; // This is `pk` in the API
  attribute_id?: string;
  quantity?: number;
}

export interface EditCartResponse {
  app_data: {
    StatusCode: number;
    data: {
      message: string;
    };
  };
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
  const queryClient = useQueryClient(); // ✅ get query client

  return useMutation<AddCartResponse, unknown, CheckoutInputType>({
    mutationFn: addtocart,
    onSuccess: (data) => {
      const response = data.app_data?.data;
      if (data.app_data?.StatusCode === 6001) {
        toast.error(response?.message || "Failed to add product");
      } else {
        toast.success("Product added successfully");

        // ✅ Invalidate cart query to trigger re-fetch
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.CART_ITEMS],
        });
      }
    },
    onError: (error) => {
      console.error("Add to Cart error response:", error);
      toast.error("Something went wrong while adding to cart");
    },
  });
};

const editCartItem = async ({
  cart_item_id,
  ...input
}: EditCartInputType): Promise<EditCartResponse> => {
  const response = await http.put<EditCartResponse>(
    `${API_ENDPOINTS.EDIT_CART_ITEM}${cart_item_id}/`,
    input
  );
  return response.data;
};

export const useEditCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<EditCartResponse, unknown, EditCartInputType>({
    mutationFn: editCartItem,
    onSuccess: (data) => {
      const { StatusCode, data: respData } = data.app_data;

      if (StatusCode === 6000) {
        toast.success(respData.message || "Cart item updated");
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.CART_ITEMS],
        });
      } else {
        toast.error(respData.message || "Update failed");
      }
    },
    onError: (err) => {
      console.error("Edit cart error:", err);
      toast.error("Something went wrong");
    },
  });
};
