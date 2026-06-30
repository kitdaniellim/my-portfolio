import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 will-change-transform";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-[#0a0a0c] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,255,255,0.18)]",
  secondary:
    "border border-line bg-transparent text-ink hover:-translate-y-0.5 hover:border-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-[23px] py-[11px] text-sm",
  md: "px-7 py-3 text-[15px]",
  lg: "px-[34px] py-4 text-base",
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) => {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (props.href !== undefined) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  );
};
