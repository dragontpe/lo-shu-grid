import type { Language } from "../components/Settings";

interface ReportLabels {
  reportTitle: string;
  dateOfBirth: string;
  generated: string;
  preparedBy: string;
  driver: string;
  conductor: string;
  kua: string;
  eastGroup: string;
  westGroup: string;
  auspiciousDirections: string;
  goldenYogBadge: string;
  silverYogBadge: string;
  present: string;
  absent: string;
  activePlanes: string;
  sectionYourNumbers: string;
  sectionAbsentNumbers: string;
  sectionPlanes: string;
  sectionDriverNumber: string;
  sectionLifePath: string;
  sectionFengShui: string;
  planeActive: string;
  planeMissing: string;
  numberLabel: string;
  maleFormula: string;
  femaleFormula: string;
  nonBinaryNote: string;
  driverEqualsConductorNote: string;
}

const EN: ReportLabels = {
  reportTitle: "Lo Shu Grid Reading",
  dateOfBirth: "Date of Birth",
  generated: "Generated",
  preparedBy: "Prepared by",
  driver: "Driver",
  conductor: "Conductor",
  kua: "Kua",
  eastGroup: "East Group",
  westGroup: "West Group",
  auspiciousDirections: "Auspicious Directions",
  goldenYogBadge: "Golden Yog \u2014 Success Plane Active",
  silverYogBadge: "Silver Yog \u2014 Property Plane Active",
  present: "Present",
  absent: "Absent",
  activePlanes: "Active Planes",
  sectionYourNumbers: "Your Numbers",
  sectionAbsentNumbers: "Absent Numbers",
  sectionPlanes: "Planes & Arrows",
  sectionDriverNumber: "Your Driver Number",
  sectionLifePath: "Your Life Path",
  sectionFengShui: "Feng Shui \u2014 Your Kua Number",
  planeActive: "ACTIVE",
  planeMissing: "MISSING",
  numberLabel: "NUMBER",
  maleFormula: "Male Formula",
  femaleFormula: "Female Formula",
  nonBinaryNote:
    "The Kua Number is calculated differently for males and females. As a non-binary person, both calculations are presented above. You may choose the one that resonates most with your experience, or consider the guidance of both.",
  driverEqualsConductorNote:
    "Your Driver and Life Path numbers are the same, indicating an unusually strong alignment between how you show up in the world and the deeper direction of your life.",
};

const ZH_TW: ReportLabels = {
  reportTitle: "\u6d1b\u66f8\u4e5d\u5bae\u683c\u89e3\u8b80",
  dateOfBirth: "\u51fa\u751f\u65e5\u671f",
  generated: "\u88fd\u4f5c\u65e5\u671f",
  preparedBy: "\u89e3\u8b80\u5e2b",
  driver: "\u99c5\u52d5\u6578",
  conductor: "\u547d\u904b\u6578",
  kua: "\u5366\u6578",
  eastGroup: "\u6771\u56db\u547d",
  westGroup: "\u897f\u56db\u547d",
  auspiciousDirections: "\u5409\u5229\u65b9\u4f4d",
  goldenYogBadge: "\u9ec3\u91d1\u7d44\u5408 \u2014 \u6210\u529f\u7dda\u5df2\u555f\u52d5",
  silverYogBadge: "\u767d\u9280\u7d44\u5408 \u2014 \u7f6e\u7522\u7dda\u5df2\u555f\u52d5",
  present: "\u51fa\u73fe",
  absent: "\u7f3a\u5e2d",
  activePlanes: "\u6d3b\u8e8d\u5e73\u9762",
  sectionYourNumbers: "\u4f60\u7684\u6578\u5b57",
  sectionAbsentNumbers: "\u7f3a\u5e2d\u6578\u5b57",
  sectionPlanes: "\u5e73\u9762\u8207\u7bad\u982d",
  sectionDriverNumber: "\u4f60\u7684\u99c5\u52d5\u6578",
  sectionLifePath: "\u4f60\u7684\u751f\u547d\u8def\u5f91",
  sectionFengShui: "\u98a8\u6c34 \u2014 \u4f60\u7684\u5366\u6578",
  planeActive: "\u6d3b\u8e8d",
  planeMissing: "\u7f3a\u5e2d",
  numberLabel: "\u6578\u5b57",
  maleFormula: "\u7537\u6027\u516c\u5f0f",
  femaleFormula: "\u5973\u6027\u516c\u5f0f",
  nonBinaryNote:
    "\u5366\u6578\u7684\u8a08\u7b97\u65b9\u5f0f\u56e0\u6027\u5225\u800c\u7570\u3002\u4ee5\u4e0a\u5448\u73fe\u5169\u7a2e\u8a08\u7b97\u7d50\u679c\uff0c\u60a8\u53ef\u4ee5\u9078\u64c7\u8207\u81ea\u8eab\u7d93\u9a57\u6700\u5951\u5408\u7684\u4e00\u500b\uff0c\u6216\u540c\u6642\u53c3\u8003\u5169\u8005\u7684\u6307\u5f15\u3002",
  driverEqualsConductorNote:
    "\u60a8\u7684\u99c5\u52d5\u6578\u8207\u751f\u547d\u8def\u5f91\u6578\u76f8\u540c\uff0c\u9019\u8868\u660e\u60a8\u5728\u4e16\u754c\u4e0a\u5c55\u73fe\u7684\u65b9\u5f0f\u8207\u60a8\u751f\u547d\u7684\u66f4\u6df1\u65b9\u5411\u4e4b\u9593\u6709\u8457\u7570\u5e38\u5f37\u70c8\u7684\u4e00\u81f4\u6027\u3002",
};

export function getLabels(language: Language): ReportLabels {
  return language === "zh-TW" ? ZH_TW : EN;
}
