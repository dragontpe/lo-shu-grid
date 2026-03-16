import { useState } from "react";

export type Language = "en" | "zh-TW";

export interface AppSettings {
  pageSize: "a4" | "letter";
  language: Language;
  includeKua: boolean;
  operatorName: string;
  businessName: string;
  businessContact: string;
}

const DEFAULTS: AppSettings = {
  pageSize: "a4",
  language: "en",
  includeKua: true,
  operatorName: "",
  businessName: "",
  businessContact: "",
};

const STORAGE_KEY = "loshu-settings";

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULTS };
}

function saveSettings(s: AppSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

interface Props {
  onClose: () => void;
  onChange: (s: AppSettings) => void;
  settings: AppSettings;
}

export function Settings({ onClose, onChange, settings }: Props) {
  const [local, setLocal] = useState<AppSettings>(settings);

  function update(patch: Partial<AppSettings>) {
    const next = { ...local, ...patch };
    setLocal(next);
    saveSettings(next);
    onChange(next);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm space-y-5">
        <h2 className="text-lg font-bold text-stone-900">Settings</h2>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Page Size
          </label>
          <div className="flex rounded border border-stone-300 overflow-hidden">
            {(["a4", "letter"] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => update({ pageSize: size })}
                className={`flex-1 py-2 text-sm font-medium ${
                  local.pageSize === size
                    ? "bg-amber-700 text-white"
                    : "bg-white text-stone-600 hover:bg-stone-50"
                }`}
              >
                {size === "a4" ? "A4" : "US Letter"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Report Language
          </label>
          <div className="flex rounded border border-stone-300 overflow-hidden">
            {([
              { value: "en" as const, label: "English" },
              { value: "zh-TW" as const, label: "繁體中文" },
            ]).map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => update({ language: lang.value })}
                className={`flex-1 py-2 text-sm font-medium ${
                  local.language === lang.value
                    ? "bg-amber-700 text-white"
                    : "bg-white text-stone-600 hover:bg-stone-50"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-stone-700">
            Include Kua / Feng Shui Section
          </label>
          <button
            type="button"
            onClick={() => update({ includeKua: !local.includeKua })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              local.includeKua ? "bg-amber-600" : "bg-stone-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                local.includeKua ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="border-t border-stone-200 pt-4">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
            Branding
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Business / Practice Name
              </label>
              <input
                type="text"
                value={local.businessName}
                onChange={(e) => update({ businessName: e.target.value })}
                className="w-full rounded border border-stone-300 px-3 py-2 text-stone-900 text-sm focus:border-amber-600 focus:outline-none"
                placeholder="e.g. Golden Path Numerology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Contact Info
              </label>
              <input
                type="text"
                value={local.businessContact}
                onChange={(e) => update({ businessContact: e.target.value })}
                className="w-full rounded border border-stone-300 px-3 py-2 text-stone-900 text-sm focus:border-amber-600 focus:outline-none"
                placeholder="e.g. hello@goldenpath.com | +886 912 345 678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Reader / Operator Name
              </label>
              <input
                type="text"
                value={local.operatorName}
                onChange={(e) => update({ operatorName: e.target.value })}
                className="w-full rounded border border-stone-300 px-3 py-2 text-stone-900 text-sm focus:border-amber-600 focus:outline-none"
                placeholder="Your name"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              const d = { ...DEFAULTS };
              setLocal(d);
              saveSettings(d);
              onChange(d);
            }}
            className="flex-1 rounded border border-stone-300 py-2 text-sm text-stone-600 hover:bg-stone-50"
          >
            Reset to Defaults
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded bg-amber-700 py-2 text-sm text-white font-medium hover:bg-amber-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
