import { useState, type FormEvent } from "react";
import type { Gender } from "../calculation/gridEngine";

interface Props {
  onSubmit: (name: string, dob: string, gender: Gender) => void;
}

export function InputForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "First name is required";
    if (!dob.trim()) {
      e.dob = "Date of birth is required";
    } else {
      // Validate DD/MM/YYYY format
      const match = dob.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (!match) {
        e.dob = "Enter date as DD/MM/YYYY";
      } else {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        const d = new Date(year, month - 1, day);
        if (
          d.getFullYear() !== year ||
          d.getMonth() !== month - 1 ||
          d.getDate() !== day
        ) {
          e.dob = "Invalid date";
        }
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (validate()) {
      // Normalize dob to DD/MM/YYYY with leading zeros
      const parts = dob.split("/");
      const normalized = `${parts[0].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${parts[2]}`;
      onSubmit(name.trim(), normalized, gender);
    }
  }

  const genders: { value: Gender; label: string }[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "nonbinary", label: "Non-Binary" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          First Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          placeholder="Enter first name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Date of Birth
        </label>
        <input
          type="text"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full rounded border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          placeholder="DD/MM/YYYY"
        />
        {errors.dob && (
          <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Gender
        </label>
        <div className="flex rounded border border-stone-300 overflow-hidden">
          {genders.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => setGender(g.value)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                gender === g.value
                  ? "bg-amber-700 text-white"
                  : "bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        {gender === "nonbinary" && (
          <p className="mt-1 text-xs text-stone-500">
            Both Male and Female Kua calculations will be shown.
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded bg-amber-700 py-2.5 text-white font-medium hover:bg-amber-800 transition-colors"
      >
        Calculate Grid
      </button>
    </form>
  );
}
