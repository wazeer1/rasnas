import { useUI } from '@contexts/ui.context';
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { log } from 'console';
import { useAlert } from 'src/context/AlertContext';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function login(input: LoginInputType) {
  try {
    const response = await http.post(API_ENDPOINTS.LOGIN, {
      email: input.email,
      password: input.password,
    });
    if (response.data.app_data.StatusCode === 6000){
      return {
        access_token: response.data.app_data?.data?.access_token || null,
        refresh_token: response.data.app_data?.data?.refresh_token || null,
      };
    }else{
      throw new Error(response?.data?.app_data?.errors || "Signup failed");
    }
    
  } catch (error: any) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.app_data?.errors || "Signup failed");
  }
}

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  // const { setAlert } = useAlert();
  return useMutation({
    mutationFn: (input: LoginInputType) => login(input),
    onSuccess: (data) => {
      Cookies.set('auth_token', data.access_token);
      authorize();
      closeModal();
    },
    onError: (error: any) => {
      // setAlert({
      //   open: true,
      //   message: error.message || 'Login failed',
      //   severity: 'error',
      // });
    },
  });
};
