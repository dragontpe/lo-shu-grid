import { useCallback, useState } from "react";
import type { GridResult } from "../calculation/gridEngine";
import { assembleReport, type ReportSettings } from "../report/assembleReport";
import { generatePdf } from "../pdf/pdfExporter";

export function useReport() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (result: GridResult, settings: ReportSettings) => {
      setGenerating(true);
      setError(null);
      try {
        const blocks = await assembleReport(result, settings);
        const pdfBytes = await generatePdf(blocks, settings);
        return pdfBytes;
      } catch (e) {
        console.error("PDF generation error:", e);
        const msg = e instanceof Error ? e.message : "PDF generation failed";
        setError(msg);
        return null;
      } finally {
        setGenerating(false);
      }
    },
    []
  );

  return { generate, generating, error };
}
