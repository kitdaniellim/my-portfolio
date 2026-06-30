import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface MediaFrameProps {
  children: ReactNode;
  className?: string;
}

export const MediaFrame = ({ children, className }: MediaFrameProps) => (
  <div className={cn("relative overflow-hidden rounded-[26px] shadow-photo", className)}>
    {children}
  </div>
);
