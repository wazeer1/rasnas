// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface UpdateUserType {
  first_name: string;
  last_name: string;
  displayName: string;
  phone_number: string;
  mail: string;
  password: string;
  confirmPassword: string;
  gender: string;
}
async function updateUser(input: UpdateUserType) {
  return http.post(API_ENDPOINTS.UPDATE_ACCOUNT_DETAILS, input);
}
export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (input: UpdateUserType) => updateUser(input),
    onSuccess: () => {
      toast.success("Account updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
