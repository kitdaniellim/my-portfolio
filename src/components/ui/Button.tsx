import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "amber" | "cream" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full transition-all duration-200 will-change-transform";

const variantClasses: Record<ButtonVariant, string> = {
  amber:
    "bg-amber font-bold text-[#1a1407] hover:-translate-y-0.5 hover:shadow-btn-amber",
  cream:
    "bg-cream font-semibold text-[#171209] hover:-translate-y-0.5 hover:shadow-btn-cream",
  outline:
    "border border-[rgba(244,237,225,0.28)] bg-transparent font-semibold text-cream hover:-translate-y-0.5 hover:border-cream",
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
  variant = "amber",
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
