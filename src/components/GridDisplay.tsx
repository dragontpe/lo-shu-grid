import type { GridResult } from "../calculation/gridEngine";
import {
  DRIVER_INTERPRETATIONS,
  CONDUCTOR_INTERPRETATIONS,
  KUA_INTERPRETATIONS,
} from "../content/interpretations";

interface Props {
  result: GridResult;
  onGeneratePdf: () => void;
  generating: boolean;
}

const GRID_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

const PLANE_LABELS: [string, number[]][] = [
  ["Mind", [4, 9, 2]],
  ["Emotional", [3, 5, 7]],
  ["Practical", [8, 1, 6]],
];

export function GridDisplay({ result, onGeneratePdf, generating }: Props) {
  const driverTitle = DRIVER_INTERPRETATIONS[result.driverNumber].title;
  const conductorTitle =
    CONDUCTOR_INTERPRETATIONS[result.conductorNumber].title;
  const kuaInterp = KUA_INTERPRETATIONS[result.kuaDisplay];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Grid with plane labels */}
      <div className="flex justify-center">
        <div className="flex items-center gap-3">
          {/* Vertical plane labels (left) */}
          <div className="flex flex-col gap-1 text-[10px] text-stone-400 text-right pr-1">
            {PLANE_LABELS.map(([label]) => (
              <div key={label} className="h-24 flex items-center">
                {label}
              </div>
            ))}
          </div>
          {/* The grid */}
          <div className="grid grid-cols-3 gap-1">
            {GRID_LAYOUT.flat().map((num) => {
              const count = result.numberPool[num];
              const isEmpty = count === 0;
              return (
                <div
                  key={num}
                  className={`w-24 h-24 flex flex-col items-center justify-center rounded-lg border-2 transition-colors ${
                    isEmpty
                      ? "bg-stone-100 border-stone-200 text-stone-300"
                      : "bg-amber-50 border-amber-600 text-stone-900"
                  }`}
                >
                  <span className={`text-2xl font-bold ${isEmpty ? "opacity-40" : ""}`}>
                    {num}
                  </span>
                  {count > 0 && (
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full bg-amber-600"
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Panel */}
      <div className="bg-white rounded-lg border border-stone-200 p-5 space-y-4">
        {/* Driver / Conductor / Kua */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-stone-400 text-xs uppercase tracking-wide">
              Driver
            </span>
            <p className="font-semibold text-stone-900">
              {result.driverNumber} &mdash; {driverTitle}
            </p>
          </div>
          <div>
            <span className="text-stone-400 text-xs uppercase tracking-wide">
              Conductor
            </span>
            <p className="font-semibold text-stone-900">
              {result.conductorNumber} &mdash; {conductorTitle}
            </p>
          </div>
          <div>
            <span className="text-stone-400 text-xs uppercase tracking-wide">
              Kua
            </span>
            {result.gender === "nonbinary" ? (
              <p className="font-semibold text-stone-900">
                {result.kuaMale} (M) / {result.kuaFemale} (F)
              </p>
            ) : (
              <p className="font-semibold text-stone-900">
                {result.kuaDisplay} &mdash;{" "}
                {kuaInterp.group === "east" ? "East" : "West"} Group
              </p>
            )}
          </div>
        </div>

        {/* Driver = Conductor note */}
        {result.driverEqualsConductor && (
          <p className="text-xs text-amber-700 bg-amber-50 rounded px-3 py-2 border border-amber-200">
            Driver and Conductor are the same &mdash; unusually strong
            alignment between personality and life path.
          </p>
        )}

        {/* Directions */}
        <div className="text-sm">
          <span className="text-stone-400 text-xs uppercase tracking-wide">
            Auspicious Directions
          </span>
          <p className="text-stone-700 mt-0.5">
            {kuaInterp.auspiciousDirections.join(" &middot; ")}
          </p>
        </div>

        {/* Raj Yoga Badges */}
        {(result.hasGoldenYog || result.hasSilverYog) && (
          <div className="flex gap-2 flex-wrap">
            {result.hasGoldenYog && (
              <span className="inline-flex items-center rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                Golden Yog &mdash; Success Plane
              </span>
            )}
            {result.hasSilverYog && (
              <span className="inline-flex items-center rounded-full bg-stone-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                Silver Yog &mdash; Property Plane
              </span>
            )}
          </div>
        )}

        {/* Number Summary */}
        <div className="grid grid-cols-3 gap-2 text-sm border-t border-stone-100 pt-3">
          <div>
            <span className="text-stone-400 text-xs uppercase tracking-wide">
              Present
            </span>
            <p className="text-stone-700 font-medium">
              {result.presentNumbers.join(", ") || "None"}
            </p>
          </div>
          <div>
            <span className="text-stone-400 text-xs uppercase tracking-wide">
              Absent
            </span>
            <p className="text-stone-700 font-medium">
              {result.absentNumbers.join(", ") || "None"}
            </p>
          </div>
          <div>
            <span className="text-stone-400 text-xs uppercase tracking-wide">
              Active Planes
            </span>
            <p className="text-stone-700 font-medium">
              {result.activePlanes.map((p) => p.name).join(", ") || "None"}
            </p>
          </div>
        </div>
      </div>

      {/* Generate PDF Button */}
      <button
        onClick={onGeneratePdf}
        disabled={generating}
        className="w-full rounded-lg bg-amber-700 py-3 text-white font-medium hover:bg-amber-800 active:bg-amber-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {generating ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating PDF...
          </>
        ) : (
          "Generate PDF Report"
        )}
      </button>
    </div>
  );
}
