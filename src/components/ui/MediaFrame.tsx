import { ReactNode } from "react";
import { cn } from "../../lib/utils";

const defaultGlow = "-inset-2 from-accent/20 to-accent-soft/10";

interface MediaFrameProps {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
}

export const MediaFrame = ({ children, className, glowClassName = defaultGlow }: MediaFrameProps) => (
  <div className={cn("relative", className)}>
    <div
      aria-hidden
      className={cn("rounded-2.5xl absolute bg-gradient-to-tr blur-2xl", glowClassName)}
    />
    <div className="rounded-2.5xl relative overflow-hidden border border-white/70 shadow-frost-lg">
      {children}
    </div>
  </div>
);
