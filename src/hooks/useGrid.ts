import { useState, useCallback } from "react";
import { calculateGrid, type GridResult, type Gender } from "../calculation/gridEngine";

export function useGrid() {
  const [result, setResult] = useState<GridResult | null>(null);

  const compute = useCallback(
    (name: string, dob: string, gender: Gender) => {
      const r = calculateGrid(name, dob, gender);
      setResult(r);
    },
    []
  );

  const reset = useCallback(() => setResult(null), []);

  return { result, compute, reset };
}
