// import { useUI } from "@contexts/ui.context";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
// import Cookies from "js-cookie";
// import { useMutation } from "@tanstack/react-query";
// import { log } from "console";
// // const { setModalView, openModal, closeModal } = useUI();


// export interface OtpInputType {
//   otp: string
// }
// async function verifyOtp(input: OtpInputType) {
//   try {
//     const response = await http.post(API_ENDPOINTS.OTP_VERIFY, {
//       otp: input.otp,
//       email: Cookies.get("email"),
//     });
//     // Ensure that token is correctly retrieved based on the API response structure
//     if (response.data.app_data.StatusCode === 6000){
//       return true
//       // setModalView("SIGNUP_OTP")
//       // return {
//       //   access_token: response.data.app_data?.data?.access_token || null,
//       //   refresh_token: response.data.app_data?.data?.refresh_token || null,
//       // };
//     }
//   } catch (error: any) {
//     // Handle the error gracefully, log it or return a specific error message
//     console.error("Signup failed:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.app_data?.errors || "Signup failed");
//   }
// }


// export const useVerifyMutation = () => {
//   const { authorize, closeModal,setModalView } = useUI();
//   return useMutation({
//     mutationFn: (input: OtpInputType) => verifyOtp(input),
//     onSuccess: (data) => {
//       // return true
//     //   setModalView("SIGNUP_OTP")
//       // Cookies.set("auth_token", data.access_token);
//       // authorize();
//       // closeModal();
//     },
//     onError: (data) => {
//       console.log(data, "login error response");
//     },
//   });
// };



import { useMutation } from "@tanstack/react-query";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useUI } from "@contexts/ui.context";

export interface OtpInputType {
  otp: string;
}

async function verifyOtp(input: OtpInputType) {
  try {
    const response = await http.post(API_ENDPOINTS.OTP_VERIFY, {
      otp: input.otp,
      email: Cookies.get("email"), // Assuming email is stored in cookies
    });

    if (response.data.app_data.StatusCode === 6000) {
        console.log("______hello");
        
      return response.data.app_data;
    } else {
      throw new Error(response.data.app_data?.errors || "OTP verification failed");
    }
  } catch (error: any) {
    console.error("OTP verification failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.app_data?.errors || "OTP verification failed");
  }
}

export const useVerifyMutation = () => {
  const { authorize, closeModal, setModalView } = useUI();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      console.log("OTP verified successfully:", data);
      Cookies.set("auth_token", data?.data?.access_token); // Save token
      authorize();
      closeModal();
    },
    onError: (error) => {
      console.error("OTP verification error:", error);
    },
  });
};
