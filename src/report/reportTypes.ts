export interface CoverBlock {
  type: "cover";
  name: string;
  dob: string;
  dateGenerated: string;
}

export interface GridBlock {
  type: "grid";
  numberPool: Record<number, number>;
  driverNumber: number;
  driverTitle: string;
  conductorNumber: number;
  conductorTitle: string;
  kuaNumber: number;
  kuaGroup: "east" | "west";
  auspiciousDirections: string[];
  presentNumbers: number[];
  absentNumbers: number[];
  activePlaneNames: string[];
  hasGoldenYog: boolean;
  hasSilverYog: boolean;
}

export interface SectionHeadingBlock {
  type: "sectionHeading";
  title: string;
}

export interface NumberHeadingBlock {
  type: "numberHeading";
  number: number;
  element: string;
  direction: string;
  keywords: string;
}

export interface BodyTextBlock {
  type: "bodyText";
  text: string;
}

export interface RajYogaBlock {
  type: "rajYoga";
  title: string;
  subtitle: string;
  text: string;
}

export interface DirectionsBlock {
  type: "directions";
  kuaNumber: number;
  kuaGroup: "east" | "west";
  auspiciousDirections: string[];
  inauspiciousDirections: string[];
  text: string;
  isNonBinary: boolean;
  kuaMale?: number;
  kuaFemale?: number;
  altText?: string;
  altAuspiciousDirections?: string[];
  altInauspiciousDirections?: string[];
  altGroup?: "east" | "west";
}

export interface PlaneHeadingBlock {
  type: "planeHeading";
  name: string;
  numbers: number[];
  status: "active" | "missing";
}

export interface ClosingBlock {
  type: "closing";
  text: string;
}

export interface DriverConductorNoteBlock {
  type: "driverConductorNote";
  text: string;
}

export type ContentBlock =
  | CoverBlock
  | GridBlock
  | SectionHeadingBlock
  | NumberHeadingBlock
  | BodyTextBlock
  | RajYogaBlock
  | DirectionsBlock
  | PlaneHeadingBlock
  | ClosingBlock
  | DriverConductorNoteBlock;
