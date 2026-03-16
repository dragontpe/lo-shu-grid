export const THEME = {
  colors: {
    primaryGold: [0.722, 0.525, 0.043] as [number, number, number], // #B8860B
    lightGold: [0.961, 0.902, 0.753] as [number, number, number],   // #F5E6C0
    dark: [0.102, 0.102, 0.102] as [number, number, number],        // #1A1A1A
    white: [1, 1, 1] as [number, number, number],
    grey: [0.6, 0.6, 0.6] as [number, number, number],
    lightGrey: [0.85, 0.85, 0.85] as [number, number, number],
    dashedBorder: [0.75, 0.75, 0.75] as [number, number, number],
  },
  fonts: {
    headingSize: 24,
    subheadingSize: 16,
    bodySize: 11,
    smallSize: 9,
    tinySize: 8,
  },
  layout: {
    marginTop: 56,     // ~20mm
    marginBottom: 56,
    marginLeft: 56,
    marginRight: 56,
    lineHeight: 1.5,
    paragraphSpacing: 12,
    sectionSpacing: 28,
  },
} as const;
