/** Touch-first devices (phones/tablets) — use for gentler scroll/pin behavior. */
export function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}
