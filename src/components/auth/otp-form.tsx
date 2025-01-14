// import Input from "@components/ui/input";
// import Button from "@components/ui/button";
// import { useForm } from "react-hook-form";
// import Logo from "@components/ui/logo";
// import { useUI } from "@contexts/ui.context";
// import { useTranslation } from "next-i18next";
// import OTPInput from "@components/ui/otp-input";
// import { useVerifyMutation } from "@framework/auth/use-otp";// Corrected import path

// interface OTPInputType {
//   otp: string;
// }

// const OTPForm: React.FC = () => {
//   const { t } = useTranslation();
//   const { closeModal } = useUI();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<OTPInputType>();
//   const { mutate: verifyOtp, isPending } = useVerifyMutation();
//   const onSubmit = ({ otp }: OTPInputType) => {
//     console.log("Entered OTP:", otp);
//     verifyOtp({ otp: otp });
//     // Add OTP verification logic here
//   };

//   return (
//     <div className="py-5 px-5 sm:px-8 bg-body mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
//       <div className="text-center mb-6 pt-2.5">
//         <div onClick={closeModal}>
//           <Logo />
//         </div>
//         <p className="text-sm md:text-base text-white mt-2 mb-8 sm:mb-10">
//           Enter the OTP sent to your email to sign up
//         </p>
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col justify-center"
//         noValidate
//       >
//         <div className="flex flex-col space-y-4">
//           <OTPInput
//             length={4}
//             labelKey={"Enter your OTP"}
//             type="text"
//             variant="solid"
//             onComplete={(e)=>handleSubmit(onSubmit(e))}
//             {...register("otp", {
//               required: "OTP is not required",
//               pattern: {
//                 value: /^[0-9]{4,6}$/, // Adjust based on your OTP length
//                 message: t("forms:otp-error"),
//               },
//             })}
//             errorKey={errors.otp?.message}
//           />
//           <div className="relative">
//             <Button type="submit" className="h-11 md:h-12 w-full mt-2">
//               Submit
//             </Button>
//           </div>
//         </div>
//       </form>
//       <div className="text-sm sm:text-base text-white text-center mt-5 mb-1">
//         Didn't receive OTP{" "}
//         <button
//           type="button"
//           className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
//           onClick={() => {
//             console.log("Resend OTP");
//             // Add resend OTP logic here
//           }}
//         >
//           Resend
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTPForm;


import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import OTPInput from "@components/ui/otp-input";
import Button from "@components/ui/button";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { useVerifyMutation } from "@framework/auth/use-otp";

interface OTPInputType {
  otp: string;
}

const OTPForm: React.FC = () => {
  const { t } = useTranslation();
  const { closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OTPInputType>();
  const { mutate: verifyOtp, isLoading } = useVerifyMutation();

  const onSubmit = (data: OTPInputType) => {
    verifyOtp(data);
  };

  return (
    <div className="py-5 px-5 sm:px-8 bg-body mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-white mt-2 mb-8 sm:mb-10">
          {t("Enter the OTP sent to your email to sign up")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-4">
          <OTPInput
            length={4}
            labelKey={"Enter your OTP"}
            type="text"
            variant="solid"
            onComplete={(otp) => setValue("otp", otp)} // Update the form value when OTP input is complete
            {...register("otp", {
              required: t("OTP is required"),
              pattern: {
                value: /^[0-9]{4,6}$/, // Validates a 4-6 digit OTP
                message: t("Invalid OTP format"),
              },
            })}
            errorKey={errors.otp?.message}
          />
          <Button type="submit" className="h-11 md:h-12 w-full mt-2" disabled={isLoading}>
            {isLoading ? t("Verifying...") : t("Submit")}
          </Button>
        </div>
      </form>
      <div className="text-sm sm:text-base text-white text-center mt-5 mb-1">
        {t("Didn't receive OTP?")}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={() => console.log("Resend OTP")}
        >
          {t("Resend")}
        </button>
      </div>
    </div>
  );
};

export default OTPForm;
