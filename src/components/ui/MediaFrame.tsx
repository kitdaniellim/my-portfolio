import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface MediaFrameProps {
  children: ReactNode;
  className?: string;
}

export const MediaFrame = ({ children, className }: MediaFrameProps) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-[20px] border border-[rgba(232,166,74,0.42)] shadow-photo",
      className
    )}
  >
    {children}
  </div>
);
