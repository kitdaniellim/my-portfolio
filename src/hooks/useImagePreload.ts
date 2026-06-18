import { useEffect } from "react";

export function useImagePreload(sources: readonly string[]): void {
  useEffect(() => {
    const warmCache = () => {
      sources.forEach((source) => {
        const image = new window.Image();
        image.decoding = "async";
        image.src = source;
      });
    };

    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(warmCache);
      return () => window.cancelIdleCallback(handle);
    }

    const handle = window.setTimeout(warmCache, 200);
    return () => window.clearTimeout(handle);
  }, [sources]);
}
