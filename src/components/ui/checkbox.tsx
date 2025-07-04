import React from "react";
import { useTranslation } from "next-i18next";
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelKey?: string;
  label?: string | any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ labelKey, label, ...rest }, ref) => {
    const { t } = useTranslation();
    return (
      <label className="group flex items-center text-black text-sm cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0"
          ref={ref}
          {...rest}
        />
        <span className="ms-4 -mt-0.5 capitalize">
          {labelKey ? t(labelKey) : label}
        </span>
      </label>
    );
  }
);
