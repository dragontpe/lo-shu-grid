import { useState } from "react";
import { InputForm } from "./components/InputForm";
import { GridDisplay } from "./components/GridDisplay";
import {
  Settings,
  loadSettings,
  type AppSettings,
} from "./components/Settings";
import { useGrid } from "./hooks/useGrid";
import { useReport } from "./hooks/useReport";

function App() {
  const { result, compute, reset } = useGrid();
  const { generate, generating, error } = useReport();
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(loadSettings);

  async function handleGeneratePdf() {
    if (!result) return;
    const pdfBytes = await generate(result, {
      includeKua: settings.includeKua,
      language: settings.language,
      operatorName: settings.operatorName || undefined,
      businessName: settings.businessName || undefined,
      businessContact: settings.businessContact || undefined,
    });
    if (pdfBytes) {
      try {
        const { save } = await import("@tauri-apps/plugin-dialog");
        const { writeFile } = await import("@tauri-apps/plugin-fs");
        const path = await save({
          defaultPath: `${result.name}_Lo_Shu_Grid.pdf`,
          filters: [{ name: "PDF", extensions: ["pdf"] }],
        });
        if (path) {
          await writeFile(path, pdfBytes);
        }
      } catch (err) {
        console.error("Tauri save failed, using browser fallback:", err);
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${result.name}_Lo_Shu_Grid.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } else {
      console.error("PDF generation returned null");
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white shrink-0">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {result && (
              <button
                onClick={reset}
                className="text-stone-400 hover:text-stone-600 text-sm transition-colors"
              >
                &larr; Back
              </button>
            )}
            <h1 className="text-lg font-bold text-stone-900 tracking-tight">
              Lo Shu Grid Reader
            </h1>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-stone-400 hover:text-stone-600 rounded-md hover:bg-stone-100 transition-colors"
            title="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        {!result ? (
          <div>
            <div className="text-center mb-10">
              <p className="text-3xl font-bold text-amber-700 mb-1 tracking-tight">
                Lo Shu Grid
              </p>
              <p className="text-stone-400 text-sm">
                Personal numerology report generator
              </p>
            </div>
            <InputForm
              onSubmit={(name, dob, gender) => compute(name, dob, gender)}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-center text-lg font-semibold text-stone-800 mb-6">
              {result.name} &mdash; {result.dob}
            </h2>
            <GridDisplay
              result={result}
              onGeneratePdf={handleGeneratePdf}
              generating={generating}
            />
            {error && (
              <p className="mt-4 text-center text-sm text-red-600">{error}</p>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="shrink-0 border-t border-stone-100 py-3">
        <p className="text-center text-xs text-stone-300">
          Lo Shu Grid Reader v0.1.0
        </p>
      </footer>

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          settings={settings}
          onChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
