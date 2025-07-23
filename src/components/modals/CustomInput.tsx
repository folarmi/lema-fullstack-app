import React, { useState } from "react";
import clsx from "clsx";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  textarea?: boolean;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  togglePassword?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  required,
  className,
  textarea,
  leftIcon,
  rightIcon,
  togglePassword = false,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = togglePassword && type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const baseClasses = clsx(
    "w-full px-4 py-2 rounded-lg border focus:outline-none  placeholder-text-gray_400 text-sm",
    error ? "border-red-500" : "border-gray-300",
    leftIcon && "pl-10",
    (rightIcon || isPassword) && "pr-10",
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-lg font-medium text-gray_600">
          {label}
          {required && <span className="text-blue_60 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        {textarea ? (
          <textarea
            className={baseClasses}
            required={required}
            rows={6}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            type={inputType}
            className={baseClasses}
            required={required}
            {...props}
          />
        )}

        {(rightIcon || isPassword) && (
          <div
            className={clsx(
              "absolute inset-y-0 right-3 flex items-center",
              isPassword && "cursor-pointer"
            )}
            onClick={() => isPassword && setShowPassword((prev) => !prev)}
          ></div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
