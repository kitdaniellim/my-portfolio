import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  placeholder,
  priority = false,
  className,
  imgClassName,
}: ImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const hasPlaceholder = Boolean(placeholder);
  const priorityAttributes = priority
    ? ({ fetchpriority: "high" } as ImgHTMLAttributes<HTMLImageElement>)
    : {};

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {hasPlaceholder && (
        <img
          src={placeholder}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full scale-105 object-cover blur-xl transition-opacity duration-500",
            loaded ? "opacity-0" : "opacity-100"
          )}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...priorityAttributes}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          hasPlaceholder && "transition-opacity duration-500 ease-out",
          hasPlaceholder && !loaded ? "opacity-0" : "opacity-100",
          imgClassName
        )}
      />
    </div>
  );
};
