import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { log } from "console";
// const { setModalView, openModal, closeModal } = useUI();


export interface SignUpInputType {
  email: string;
  password: string;
  name: string;
}
async function signUp(input: SignUpInputType) {
  try {
    console.log('inside register mutation');
    
    const response = await http.post(API_ENDPOINTS.REGISTER, {
      first_name: input.name,
      email: input.email,
      password: input.password,
    });
    // Ensure that token is correctly retrieved based on the API response structure
    if (response.data.app_data.StatusCode === 6000){
      return {email:  input.email}
      // setModalView("SIGNUP_OTP")
      // return {
      //   access_token: response.data.app_data?.data?.access_token || null,
      //   refresh_token: response.data.app_data?.data?.refresh_token || null,
      // };
    }
  } catch (error: any) {
    // Handle the error gracefully, log it or return a specific error message
    console.error("Signup failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.app_data?.errors || "Signup failed");
  }
}


export const useSignUpMutation = () => {
  const { authorize, closeModal,setModalView } = useUI();
  return useMutation({
    mutationFn: (input: SignUpInputType) => signUp(input),
    onSuccess: (data:any) => {
      // return true
      setModalView("SIGNUP_OTP")
      Cookies.set("email", data.email);
      // authorize();
      // closeModal();
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
