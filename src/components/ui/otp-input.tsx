import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

interface OTPInputProps {
  length: 4 | 6; // Restrict to either 4 or 6 inputs
  onComplete: (otp: string) => void; // Callback when OTP is completed
  className?: string; // Wrapper class
  inputClassName?: string; // Individual input class
  errorKey?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onComplete,
  className,
  inputClassName,
  errorKey
  
}) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const { t } = useTranslation();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Restrict to numbers only

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically move to the next input if a digit is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call `onComplete` if OTP is fully entered
    if (updatedOtp.join("").length === length) {
      onComplete(updatedOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("Text").slice(0, length);
    if (!/^\d+$/.test(pastedText)) return;

    const updatedOtp = pastedText.split("");
    setOtp((prevOtp) =>
      updatedOtp.concat(prevOtp.slice(pastedText.length)).slice(0, length)
    );

    inputRefs.current[pastedText.length - 1]?.focus();
    if (pastedText.length === length) {
      onComplete(pastedText);
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  return (
    <div className={cn("flex space-x-4 justify-center", className)}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el!)}
          maxLength={1}
          className={cn(
            "w-10 h-12 border border-gray-300 text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
            inputClassName
          )}
        />
      ))}
    </div>
  );
};

export default OTPInput;
