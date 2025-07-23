import React from "react";
import clsx from "clsx";

type TextVariant =
  | "body"
  | "textXs"
  | "textSemiBold"
  | "textLarge"
  | "displayXL"
  | "textSm"
  | "medium";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  as?: React.ElementType;
}

const variants: Record<TextVariant, string> = {
  body: "font-normal text-sm",
  textSm: "font-normal text-sm text-gray_600",
  textXs: "font-medium text-xs text-gray_600",
  textSemiBold: "font-semibold text-sm text-gray_600",
  textLarge: "font-medium text-slg text-gray_600",
  displayXL: "font-medium text-[60px] text-gray_900",
  medium: "font-medium text-sm text-gray_600",
};

export const CustomText: React.FC<TextProps> = ({
  children,
  variant = "body",
  className,
  as: Component = "p",
  ...props
}) => {
  return (
    <Component className={clsx(variants[variant], className)} {...props}>
      {children}
    </Component>
  );
};
