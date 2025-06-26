// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface ChangePasswordInputType {
  new_password: string;
  old_password: string;
}
async function changePassword(input: ChangePasswordInputType) {
  return http.post(API_ENDPOINTS.CHANGE_PASSWORD, input);
}
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (input: ChangePasswordInputType) => changePassword(input),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (data) => {
      const errorMessage = data?.response.data.app_data.data.message;
      toast.error(errorMessage);
    },
  });
};
