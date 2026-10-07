"use client";

import { useEffect, useState } from "react";
import { isCoarsePointer } from "@/lib/coarse-pointer";

/** Client-only; false on first paint to match SSR, then updates. */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(isCoarsePointer());
    const mq = window.matchMedia("(pointer: coarse)");
    const onChange = () => setCoarse(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return coarse;
}
