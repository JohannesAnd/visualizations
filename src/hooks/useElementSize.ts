import { RefObject, useEffect, useState } from "react";
import { Size } from "../types";

export const useElementSize = (elementRef: RefObject<HTMLElement>): Size => {
  const [size, setSize] = useState<Size>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (!elementRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (elementRef.current) {
        setSize(elementRef.current.getBoundingClientRect());
      }
    });

    resizeObserver.observe(elementRef.current);

    return () => resizeObserver.disconnect();
  }, [setSize]);

  return size;
};
