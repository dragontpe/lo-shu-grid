import type { GridResult } from "../calculation/gridEngine";
import type { ContentBlock } from "./reportTypes";
import type { Language } from "../components/Settings";
import {
  NUMBER_INTERPRETATIONS,
  PLANE_INTERPRETATIONS,
  DRIVER_INTERPRETATIONS,
  CONDUCTOR_INTERPRETATIONS,
  KUA_INTERPRETATIONS,
  RAJ_YOGA_INTERPRETATIONS,
} from "../content/interpretations";
import { getLabels } from "../content/labels";

// Lazy-load Chinese interpretations only when needed
async function getInterpretations(language: Language) {
  if (language === "zh-TW") {
    const zh = await import("../content/interpretations.zh-TW");
    return {
      numbers: zh.NUMBER_INTERPRETATIONS_ZH,
      planes: zh.PLANE_INTERPRETATIONS_ZH,
      drivers: zh.DRIVER_INTERPRETATIONS_ZH,
      conductors: zh.CONDUCTOR_INTERPRETATIONS_ZH,
      kua: zh.KUA_INTERPRETATIONS_ZH,
      rajYoga: zh.RAJ_YOGA_INTERPRETATIONS_ZH,
    };
  }
  return {
    numbers: NUMBER_INTERPRETATIONS,
    planes: PLANE_INTERPRETATIONS,
    drivers: DRIVER_INTERPRETATIONS,
    conductors: CONDUCTOR_INTERPRETATIONS,
    kua: KUA_INTERPRETATIONS,
    rajYoga: RAJ_YOGA_INTERPRETATIONS,
  };
}

export interface ReportSettings {
  includeKua: boolean;
  language?: Language;
  operatorName?: string;
  businessName?: string;
  businessContact?: string;
}

export async function assembleReport(
  result: GridResult,
  settings: ReportSettings = { includeKua: true }
): Promise<ContentBlock[]> {
  const lang = settings.language || "en";
  const L = getLabels(lang);
  const I = await getInterpretations(lang);
  const blocks: ContentBlock[] = [];

  const dateLocale = lang === "zh-TW" ? "zh-TW" : "en-GB";

  // 1. COVER
  blocks.push({
    type: "cover",
    name: result.name,
    dob: result.dob,
    dateGenerated: new Date().toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  });

  // 2. GRID PAGE
  blocks.push({
    type: "grid",
    numberPool: result.numberPool,
    driverNumber: result.driverNumber,
    driverTitle: I.drivers[result.driverNumber].title,
    conductorNumber: result.conductorNumber,
    conductorTitle: I.conductors[result.conductorNumber].title,
    kuaNumber: result.kuaDisplay,
    kuaGroup: result.kuaGroup,
    auspiciousDirections: I.kua[result.kuaDisplay].auspiciousDirections,
    presentNumbers: result.presentNumbers,
    absentNumbers: result.absentNumbers,
    activePlaneNames: result.activePlanes.map((p) => p.name),
    hasGoldenYog: result.hasGoldenYog,
    hasSilverYog: result.hasSilverYog,
  });

  // 3. RAJ YOGA (if applicable)
  if (result.hasGoldenYog) {
    blocks.push({
      type: "rajYoga",
      title: I.rajYoga.goldenYog.title,
      subtitle: I.rajYoga.goldenYog.subtitle,
      text: I.rajYoga.goldenYog.text,
    });
  }
  if (result.hasSilverYog) {
    blocks.push({
      type: "rajYoga",
      title: I.rajYoga.silverYog.title,
      subtitle: I.rajYoga.silverYog.subtitle,
      text: I.rajYoga.silverYog.text,
    });
  }

  // 4. PRESENT NUMBERS
  if (result.presentNumbers.length > 0) {
    blocks.push({ type: "sectionHeading", title: L.sectionYourNumbers });
  }
  for (const num of result.presentNumbers) {
    const interp = I.numbers[num];
    blocks.push({
      type: "numberHeading",
      number: num,
      element: interp.element,
      direction: interp.direction,
      keywords: interp.keywords,
    });
    blocks.push({ type: "bodyText", text: interp.present });
    if (result.repeatingNumbers.includes(num)) {
      blocks.push({ type: "bodyText", text: interp.repeating });
    }
  }

  // 5. ABSENT NUMBERS
  if (result.absentNumbers.length > 0) {
    blocks.push({ type: "sectionHeading", title: L.sectionAbsentNumbers });
  }
  for (const num of result.absentNumbers) {
    const interp = I.numbers[num];
    blocks.push({
      type: "numberHeading",
      number: num,
      element: interp.element,
      direction: interp.direction,
      keywords: interp.keywords,
    });
    blocks.push({ type: "bodyText", text: interp.absent });
  }

  // 6. PLANES
  const hasPlanes =
    result.activePlanes.length > 0 || result.missingPlanes.length > 0;
  if (hasPlanes) {
    blocks.push({ type: "sectionHeading", title: L.sectionPlanes });
  }

  for (const plane of result.activePlanes) {
    const interp = I.planes[plane.name];
    blocks.push({
      type: "planeHeading",
      name: plane.name,
      numbers: plane.numbers,
      status: "active",
    });
    blocks.push({ type: "bodyText", text: interp.present });
  }

  for (const plane of result.missingPlanes) {
    const interp = I.planes[plane.name];
    blocks.push({
      type: "planeHeading",
      name: plane.name,
      numbers: plane.numbers,
      status: "missing",
    });
    blocks.push({ type: "bodyText", text: interp.absent });
  }

  // 7. DRIVER NUMBER
  blocks.push({ type: "sectionHeading", title: L.sectionDriverNumber });
  const driverInterp = I.drivers[result.driverNumber];
  blocks.push({
    type: "bodyText",
    text: `${L.driver} ${result.driverNumber} \u2014 ${driverInterp.title}`,
  });
  blocks.push({ type: "bodyText", text: driverInterp.text });

  // 8. CONDUCTOR NUMBER
  blocks.push({ type: "sectionHeading", title: L.sectionLifePath });
  const condInterp = I.conductors[result.conductorNumber];
  blocks.push({
    type: "bodyText",
    text: `${L.conductor} ${result.conductorNumber} \u2014 ${condInterp.title}`,
  });
  blocks.push({ type: "bodyText", text: condInterp.text });

  // Driver equals Conductor note
  if (result.driverEqualsConductor) {
    blocks.push({
      type: "driverConductorNote",
      text: L.driverEqualsConductorNote,
    });
  }

  // 9. KUA / FENG SHUI SECTION
  if (settings.includeKua) {
    blocks.push({
      type: "sectionHeading",
      title: L.sectionFengShui,
    });

    if (result.gender === "nonbinary") {
      const kuaMaleInterp = I.kua[result.kuaMale];
      const kuaFemaleInterp = I.kua[result.kuaFemale];
      blocks.push({
        type: "directions",
        kuaNumber: result.kuaMale,
        kuaGroup: kuaMaleInterp.group,
        auspiciousDirections: kuaMaleInterp.auspiciousDirections,
        inauspiciousDirections: kuaMaleInterp.inauspiciousDirections,
        text: kuaMaleInterp.text,
        isNonBinary: true,
        kuaMale: result.kuaMale,
        kuaFemale: result.kuaFemale,
        altText: kuaFemaleInterp.text,
        altAuspiciousDirections: kuaFemaleInterp.auspiciousDirections,
        altInauspiciousDirections: kuaFemaleInterp.inauspiciousDirections,
        altGroup: kuaFemaleInterp.group,
      });
    } else {
      const kuaInterp = I.kua[result.kuaDisplay];
      blocks.push({
        type: "directions",
        kuaNumber: result.kuaDisplay,
        kuaGroup: kuaInterp.group,
        auspiciousDirections: kuaInterp.auspiciousDirections,
        inauspiciousDirections: kuaInterp.inauspiciousDirections,
        text: kuaInterp.text,
        isNonBinary: false,
      });
    }
  }

  // 10. CLOSING
  const closingText =
    lang === "zh-TW"
      ? `\u9019\u4efd\u89e3\u8b80\u70ba${result.name}\u800c\u88fd\u4f5c\uff0c\u5176\u99c5\u52d5\u6578 ${result.driverNumber} \u2014 ${driverInterp.title} \u2014 \u5851\u9020\u4e86\u4ed6\u5011\u8207\u4e16\u754c\u4e92\u52d5\u7684\u65b9\u5f0f\uff0c\u800c\u547d\u904b\u6578 ${result.conductorNumber} \u2014 ${condInterp.title} \u2014 \u63ed\u793a\u4e86\u751f\u547d\u66f4\u6df1\u5c64\u7684\u65b9\u5411\u3002\u9858\u9019\u4efd\u500b\u4eba\u80fd\u91cf\u5730\u5716\u6210\u70ba\u60a8\u524d\u884c\u8def\u4e0a\u7684\u6709\u7528\u6307\u5357\u3002`
      : `This reading has been prepared for ${result.name}, whose Driver Number ${result.driverNumber} \u2014 ${driverInterp.title} \u2014 shapes how they meet the world, while their Conductor ${result.conductorNumber} \u2014 ${condInterp.title} \u2014 reveals the deeper current of their life\u2019s direction. May this map of your personal energies serve as a useful companion on the journey ahead.`;

  blocks.push({ type: "closing", text: closingText });

  return blocks;
}
