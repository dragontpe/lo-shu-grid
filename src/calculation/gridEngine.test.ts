import { describe, it, expect } from "vitest";
import { calculateGrid } from "./gridEngine";

describe("calculateGrid", () => {
  // Worked example from reference doc: 15/03/1977
  it("standard birth date — worked example 15/03/1977", () => {
    const r = calculateGrid("Test", "15/03/1977", "male");
    // Raw digits: 1,5,3,1,9,7,7 (zeros removed)
    expect(r.rawDigits).toEqual([1, 5, 3, 1, 9, 7, 7]);
    // Driver: 1+5=6
    expect(r.driverNumber).toBe(6);
    // Conductor: 1+5+0+3+1+9+7+7=33, 3+3=6
    expect(r.conductorNumber).toBe(6);
    // Day is 15 (not single digit, not 10/20/30) → add Driver 6
    // Pool: raw[1,5,3,1,9,7,7] + driver[6] + conductor[6]
    // Counts: 1→2, 3→1, 5→1, 6→2, 7→2, 9→1
    expect(r.numberPool[1]).toBe(2);
    expect(r.numberPool[3]).toBe(1);
    expect(r.numberPool[5]).toBe(1);
    expect(r.numberPool[6]).toBe(2);
    expect(r.numberPool[7]).toBe(2);
    expect(r.numberPool[9]).toBe(1);
    // Missing: 2, 4, 8
    expect(r.absentNumbers).toEqual([2, 4, 8]);
    expect(r.presentNumbers).toEqual([1, 3, 5, 6, 7, 9]);
    expect(r.repeatingNumbers).toEqual([1, 6, 7]);
  });

  it("birth date containing zeros — 10/10/2000", () => {
    const r = calculateGrid("Test", "10/10/2000", "female");
    // Raw digits from "10102000": 1,1,2 (all zeros removed)
    expect(r.rawDigits).toEqual([1, 1, 2]);
    // Driver: day=10, 1+0=1
    expect(r.driverNumber).toBe(1);
    // Day is 10 → do NOT add driver again
    // Conductor: 1+0+1+0+2+0+0+0=4
    expect(r.conductorNumber).toBe(4);
    // Pool: [1,1,2] + conductor[4] = [1,1,2,4]
    expect(r.numberPool[1]).toBe(2);
    expect(r.numberPool[2]).toBe(1);
    expect(r.numberPool[4]).toBe(1);
  });

  it("single-digit day — duplication rule fires for day=5", () => {
    const r = calculateGrid("Test", "05/06/1990", "male");
    // Raw digits: 5,6,1,9,9 (zeros removed)
    expect(r.rawDigits).toEqual([5, 6, 1, 9, 9]);
    // Driver: day=5, already single digit → do NOT add
    expect(r.driverNumber).toBe(5);
    // Conductor: 0+5+0+6+1+9+9+0 = 30, 3+0=3
    expect(r.conductorNumber).toBe(3);
    // Pool: [5,6,1,9,9] + conductor[3]
    expect(r.numberPool[5]).toBe(1); // NOT 2
    expect(r.numberPool[3]).toBe(1);
  });

  it("day=20 — duplication rule fires", () => {
    const r = calculateGrid("Test", "20/04/1985", "male");
    // Raw digits: 2,4,1,9,8,5
    expect(r.driverNumber).toBe(2); // 2+0=2
    // Day is 20 → do NOT add driver
    // Conductor: 2+0+0+4+1+9+8+5=29, 2+9=11, 1+1=2
    expect(r.conductorNumber).toBe(2);
    // Pool: [2,4,1,9,8,5] + conductor[2]
    expect(r.numberPool[2]).toBe(2); // raw 2 + conductor 2
  });

  it("day=30 — duplication rule fires", () => {
    const r = calculateGrid("Test", "30/07/1992", "female");
    // Raw digits: 3,7,1,9,9,2
    expect(r.driverNumber).toBe(3); // 3+0=3
    // Day is 30 → do NOT add driver
    // Conductor: 3+0+0+7+1+9+9+2=31, 3+1=4
    expect(r.conductorNumber).toBe(4);
    // Pool: [3,7,1,9,9,2] + conductor[4]
    expect(r.numberPool[3]).toBe(1); // only from raw
    expect(r.numberPool[4]).toBe(1);
  });

  it("day=11 — duplication rule does NOT fire, driver IS added", () => {
    const r = calculateGrid("Test", "11/05/1988", "male");
    // Raw digits: 1,1,5,1,9,8,8
    expect(r.driverNumber).toBe(2); // 1+1=2
    // Day is 11 → add driver 2 to pool
    // Conductor: 1+1+0+5+1+9+8+8=33, 3+3=6
    expect(r.conductorNumber).toBe(6);
    // Pool: [1,1,5,1,9,8,8] + driver[2] + conductor[6]
    expect(r.numberPool[1]).toBe(3);
    expect(r.numberPool[2]).toBe(1);
    expect(r.numberPool[5]).toBe(1);
    expect(r.numberPool[6]).toBe(1);
    expect(r.numberPool[8]).toBe(2);
    expect(r.numberPool[9]).toBe(1);
  });

  it("day=21 — duplication rule does NOT fire", () => {
    const r = calculateGrid("Test", "21/03/1990", "male");
    // Raw digits: 2,1,3,1,9,9
    expect(r.driverNumber).toBe(3); // 2+1=3
    // Day is 21 → add driver 3
    // Conductor: 2+1+0+3+1+9+9+0=25, 2+5=7
    expect(r.conductorNumber).toBe(7);
    // Pool: [2,1,3,1,9,9] + driver[3] + conductor[7]
    expect(r.numberPool[3]).toBe(2); // raw 3 + driver 3
  });

  it("day=31 — duplication rule does NOT fire", () => {
    const r = calculateGrid("Test", "31/01/1987", "female");
    // Raw digits: 3,1,1,1,9,8,7
    expect(r.driverNumber).toBe(4); // 3+1=4
    // Day is 31 → add driver 4
    // Conductor: 3+1+0+1+1+9+8+7=30, 3+0=3
    expect(r.conductorNumber).toBe(3);
    // Pool: [3,1,1,1,9,8,7] + driver[4] + conductor[3]
    expect(r.numberPool[4]).toBe(1);
    expect(r.numberPool[3]).toBe(2); // raw 3 + conductor 3
  });

  it("driver equals conductor scenario", () => {
    // 15/03/1977: driver=6, conductor=6
    const r = calculateGrid("Test", "15/03/1977", "male");
    expect(r.driverEqualsConductor).toBe(true);
    expect(r.driverNumber).toBe(6);
    expect(r.conductorNumber).toBe(6);
  });

  it("driver does not equal conductor", () => {
    const r = calculateGrid("Test", "11/05/1988", "male");
    expect(r.driverEqualsConductor).toBe(false);
  });

  it("born before February 4 — Kua uses previous year", () => {
    // Born 20/01/1985 → Kua uses 1984
    const r = calculateGrid("Test", "20/01/1985", "male");
    // 1984: last two=84, 8+4=12, 1+2=3. Male: 10-3=7
    expect(r.kuaMale).toBe(7);
  });

  it("born on February 4 — uses current year", () => {
    // Born 04/02/1985 → Feb 4 uses current year
    const r = calculateGrid("Test", "04/02/1985", "male");
    // 1985: last two=85, 8+5=13, 1+3=4. Male: 10-4=6
    expect(r.kuaMale).toBe(6);
  });

  it("born February 3 — uses previous year", () => {
    const r = calculateGrid("Test", "03/02/1985", "male");
    // Uses 1984: 8+4=12→3. Male: 10-3=7
    expect(r.kuaMale).toBe(7);
  });

  it("Kua result of 5 — male defaults to 2", () => {
    // Need year where male formula gives 5
    // Male 1900-1999: 10 - S = 5 → S = 5
    // Last two sum to 5: e.g. 1950 → 5+0=5
    const r = calculateGrid("Test", "15/06/1950", "male");
    expect(r.kuaMale).toBe(2);
  });

  it("Kua result of 5 — female defaults to 8", () => {
    // Female 1900-1999: S + 5 = single digit 5
    // S + 5 needs to give 5 → S = 0? That means last two digits = 00
    // Actually S + 5 could give 14 → 1+4 = 5. S=9 → year ending 99 or 90 etc
    // 1990: 9+0=9, 9+5=14→5. Female Kua = 5 → defaults to 8
    const r = calculateGrid("Test", "15/06/1990", "female");
    expect(r.kuaFemale).toBe(8);
  });

  it("born in year 2000 — different Kua formula", () => {
    // 2005: last two=05, 0+5=5
    // Male: 9-5=4
    // Female: 5+6=11→2
    const r = calculateGrid("Test", "15/06/2005", "male");
    expect(r.kuaMale).toBe(4);
    const r2 = calculateGrid("Test", "15/06/2005", "female");
    expect(r2.kuaFemale).toBe(2);
  });

  it("Golden Yog — 4, 5, 6 all present", () => {
    // Need a date where 4, 5, 6 are all in the pool
    // 25/04/1965: raw digits 2,5,4,1,9,6,5 → has 4,5,6
    const r = calculateGrid("Test", "25/04/1965", "male");
    expect(r.numberPool[4]).toBeGreaterThanOrEqual(1);
    expect(r.numberPool[5]).toBeGreaterThanOrEqual(1);
    expect(r.numberPool[6]).toBeGreaterThanOrEqual(1);
    expect(r.hasGoldenYog).toBe(true);
  });

  it("Silver Yog — 2, 5, 8 all present", () => {
    // Need a date where 2, 5, 8 are all in the pool
    // 28/05/1982: raw digits 2,8,5,1,9,8,2 → has 2,5,8
    const r = calculateGrid("Test", "28/05/1982", "male");
    expect(r.numberPool[2]).toBeGreaterThanOrEqual(1);
    expect(r.numberPool[5]).toBeGreaterThanOrEqual(1);
    expect(r.numberPool[8]).toBeGreaterThanOrEqual(1);
    expect(r.hasSilverYog).toBe(true);
  });

  it("nonbinary gender calculates both Kua numbers", () => {
    const r = calculateGrid("Test", "15/06/1978", "nonbinary");
    // 1978: 7+8=15→6. Male: 10-6=4. Female: 6+5=11→2
    expect(r.kuaMale).toBe(4);
    expect(r.kuaFemale).toBe(2);
    expect(r.gender).toBe("nonbinary");
  });

  it("Kua groups are correct", () => {
    // East group: 1, 3, 4, 9
    const r1 = calculateGrid("Test", "15/06/1978", "male"); // kua 4
    expect(r1.kuaGroup).toBe("east");
    // West group: 2, 6, 7, 8
    const r2 = calculateGrid("Test", "15/06/1978", "female"); // kua 2
    expect(r2.kuaGroup).toBe("west");
  });

  it("plane detection — active planes", () => {
    // 15/03/1977: present=[1,3,5,6,7,9]
    // Emotional Plane (3,5,7) → all present → active
    // Will Plane (9,5,1) → all present → active
    const r = calculateGrid("Test", "15/03/1977", "male");
    const activeNames = r.activePlanes.map((p) => p.name);
    expect(activeNames).toContain("Emotional Plane");
    expect(activeNames).toContain("Will Plane");
  });

  it("plane detection — missing planes", () => {
    // Need all three of a plane absent
    // 15/03/1977: absent=[2,4,8]
    // Thought Plane (4,3,8) — 3 is present, so partial, not missing
    // Silver Yog (2,5,8) — 5 is present, so partial
    // Check: is there any plane where all 3 are absent? 2,4,8 → Silver Yog needs 2,5,8 no.
    // No complete missing plane for this date
    const r = calculateGrid("Test", "15/03/1977", "male");
    // Just verify the missing planes array is correct type
    expect(Array.isArray(r.missingPlanes)).toBe(true);
  });

  it("correctly identifies missing plane when all 3 numbers absent", () => {
    // Find a date where e.g. 4, 9, 2 are ALL absent (Mind Plane missing)
    // 08/01/1888: raw digits 8,1,1,8,8,8 → driver: 8, day=8 don't add
    // conductor: 0+8+0+1+1+8+8+8=34→7
    // pool: [8,1,1,8,8,8,7] → present: 1,7,8. absent: 2,3,4,5,6,9
    // Mind Plane (4,9,2) all absent → missing!
    const r = calculateGrid("Test", "08/01/1888", "male");
    const missingNames = r.missingPlanes.map((p) => p.name);
    expect(missingNames).toContain("Mind Plane");
  });

  it("Kua male formula for year 2000+ with Kua 5 result", () => {
    // Male 2000+: 9 - S = 5 → S = 4
    // Last two sum to 4: e.g. 2004 → 0+4=4
    const r = calculateGrid("Test", "15/06/2004", "male");
    // 9 - 4 = 5 → defaults to 2
    expect(r.kuaMale).toBe(2);
  });

  it("handles year where last two digits sum to 0", () => {
    // Year 2000: 0+0=0, reduceToSingle(0)=0
    // Male: 9-0=9
    const r = calculateGrid("Test", "15/06/2000", "male");
    expect(r.kuaMale).toBe(9);
  });
});
