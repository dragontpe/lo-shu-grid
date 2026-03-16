// Lo Shu Grid Calculation Engine
// Pure TypeScript — no imports except types, no side effects

export type Gender = "male" | "female" | "nonbinary";

export interface PlaneResult {
  name: string;
  numbers: number[];
  type: "horizontal" | "vertical" | "diagonal";
}

export interface GridResult {
  name: string;
  dob: string;
  gender: Gender;
  rawDigits: number[];
  driverNumber: number;
  conductorNumber: number;
  numberPool: Record<number, number>;
  presentNumbers: number[];
  absentNumbers: number[];
  repeatingNumbers: number[];
  activePlanes: PlaneResult[];
  missingPlanes: PlaneResult[];
  hasGoldenYog: boolean;
  hasSilverYog: boolean;
  kuaMale: number;
  kuaFemale: number;
  kuaDisplay: number;
  kuaGroup: "east" | "west";
  driverEqualsConductor: boolean;
}

const PLANES: { name: string; numbers: number[]; type: PlaneResult["type"] }[] = [
  { name: "Mind Plane", numbers: [4, 9, 2], type: "horizontal" },
  { name: "Emotional Plane", numbers: [3, 5, 7], type: "horizontal" },
  { name: "Practical Plane", numbers: [8, 1, 6], type: "horizontal" },
  { name: "Thought Plane", numbers: [4, 3, 8], type: "vertical" },
  { name: "Will Plane", numbers: [9, 5, 1], type: "vertical" },
  { name: "Action Plane", numbers: [2, 7, 6], type: "vertical" },
  { name: "Golden Yog", numbers: [4, 5, 6], type: "diagonal" },
  { name: "Silver Yog", numbers: [2, 5, 8], type: "diagonal" },
];

/** Reduce a number to a single digit by summing its digits repeatedly */
function reduceToSingle(n: number): number {
  while (n > 9) {
    let sum = 0;
    while (n > 0) {
      sum += n % 10;
      n = Math.floor(n / 10);
    }
    n = sum;
  }
  return n;
}

/** Parse DD/MM/YYYY string into { day, month, year } */
function parseDOB(dob: string): { day: number; month: number; year: number } {
  const parts = dob.split("/");
  return {
    day: parseInt(parts[0], 10),
    month: parseInt(parts[1], 10),
    year: parseInt(parts[2], 10),
  };
}

/** Extract all non-zero digits from the DOB string */
function extractDigits(dob: string): number[] {
  return dob
    .replace(/\D/g, "")
    .split("")
    .map(Number)
    .filter((d) => d !== 0);
}

/** Calculate Driver Number from the day of birth */
function calcDriver(day: number): number {
  return reduceToSingle(day);
}

/** Calculate Conductor Number from all DOB digits */
function calcConductor(dob: string): number {
  const allDigits = dob.replace(/\D/g, "").split("").map(Number);
  const sum = allDigits.reduce((a, b) => a + b, 0);
  return reduceToSingle(sum);
}

/** Determine if Driver should be added to pool (duplication rule) */
function shouldAddDriver(day: number): boolean {
  // Single digits 1-9, or 10, 20, 30: Driver already in raw digits, do NOT add
  if (day >= 1 && day <= 9) return false;
  if (day === 10 || day === 20 || day === 30) return false;
  // All other days (11-19, 21-29, 31): add Driver
  return true;
}

/** Calculate Kua number for a given year and formula type */
function calcKua(
  year: number,
  day: number,
  month: number,
  formula: "male" | "female"
): number {
  // Chinese solar year boundary: before Feb 4, use previous year
  let effectiveYear = year;
  if (month < 2 || (month === 2 && day < 4)) {
    effectiveYear = year - 1;
  }

  // Sum last two digits to single digit
  const lastTwo = effectiveYear % 100;
  const s = reduceToSingle(lastTwo);

  let kua: number;
  if (effectiveYear >= 1900 && effectiveYear <= 1999) {
    if (formula === "male") {
      kua = 10 - s;
    } else {
      kua = reduceToSingle(s + 5);
    }
  } else {
    // 2000+
    if (formula === "male") {
      kua = 9 - s;
    } else {
      kua = reduceToSingle(s + 6);
    }
  }

  // Handle edge: 10 - 0 = 10 or 9 - 0 = 9, reduce if needed
  kua = reduceToSingle(kua);

  // Kua 5 never displayed
  if (kua === 5) {
    kua = formula === "male" ? 2 : 8;
  }

  return kua;
}

function getKuaGroup(kua: number): "east" | "west" {
  return [1, 3, 4, 9].includes(kua) ? "east" : "west";
}

export function calculateGrid(
  name: string,
  dob: string,
  gender: Gender
): GridResult {
  const { day, month, year } = parseDOB(dob);

  // Step 1: Extract raw digits, remove zeros
  const rawDigits = extractDigits(dob);

  // Step 2: Driver Number
  const driverNumber = calcDriver(day);

  // Step 3: Conductor Number
  const conductorNumber = calcConductor(dob);

  // Step 4-5: Build the digit pool
  const pool = [...rawDigits];
  if (shouldAddDriver(day)) {
    pool.push(driverNumber);
  }
  // Always add Conductor
  pool.push(conductorNumber);

  // Step 6: Count occurrences of each digit 1-9
  const numberPool: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) {
    numberPool[i] = 0;
  }
  for (const d of pool) {
    if (d >= 1 && d <= 9) {
      numberPool[d]++;
    }
  }

  const presentNumbers = Object.entries(numberPool)
    .filter(([, count]) => count >= 1)
    .map(([num]) => Number(num))
    .sort((a, b) => a - b);

  const absentNumbers = Object.entries(numberPool)
    .filter(([, count]) => count === 0)
    .map(([num]) => Number(num))
    .sort((a, b) => a - b);

  const repeatingNumbers = Object.entries(numberPool)
    .filter(([, count]) => count >= 2)
    .map(([num]) => Number(num))
    .sort((a, b) => a - b);

  // Check planes
  const activePlanes: PlaneResult[] = [];
  const missingPlanes: PlaneResult[] = [];

  for (const plane of PLANES) {
    const allPresent = plane.numbers.every((n) => numberPool[n] >= 1);
    const allAbsent = plane.numbers.every((n) => numberPool[n] === 0);

    if (allPresent) {
      activePlanes.push({ name: plane.name, numbers: plane.numbers, type: plane.type });
    } else if (allAbsent) {
      missingPlanes.push({ name: plane.name, numbers: plane.numbers, type: plane.type });
    }
  }

  const hasGoldenYog = activePlanes.some((p) => p.name === "Golden Yog");
  const hasSilverYog = activePlanes.some((p) => p.name === "Silver Yog");

  // Kua calculation
  const kuaMale = calcKua(year, day, month, "male");
  const kuaFemale = calcKua(year, day, month, "female");

  let kuaDisplay: number;
  if (gender === "male") {
    kuaDisplay = kuaMale;
  } else if (gender === "female") {
    kuaDisplay = kuaFemale;
  } else {
    // nonbinary: display male as primary, but both shown in UI
    kuaDisplay = kuaMale;
  }

  const kuaGroup = getKuaGroup(kuaDisplay);

  return {
    name,
    dob,
    gender,
    rawDigits,
    driverNumber,
    conductorNumber,
    numberPool,
    presentNumbers,
    absentNumbers,
    repeatingNumbers,
    activePlanes,
    missingPlanes,
    hasGoldenYog,
    hasSilverYog,
    kuaMale,
    kuaFemale,
    kuaDisplay,
    kuaGroup,
    driverEqualsConductor: driverNumber === conductorNumber,
  };
}
