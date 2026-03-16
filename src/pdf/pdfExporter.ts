import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { ContentBlock } from "../report/reportTypes";
import type { ReportSettings } from "../report/assembleReport";
import { THEME } from "./pdfTheme";
import { getLabels } from "../content/labels";

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const LETTER_WIDTH = 612;
const LETTER_HEIGHT = 792;

// Grid cell layout (Lo Shu fixed positions)
const GRID_LAYOUT = [
  [4, 9, 2], // top row
  [3, 5, 7], // middle row
  [8, 1, 6], // bottom row
];

interface PageCtx {
  doc: PDFDocument;
  page: PDFPage;
  y: number;
  pageNum: number;
  width: number;
  height: number;
  serif: PDFFont;
  sans: PDFFont;
  name: string;
  operatorName?: string;
  businessName?: string;
  businessContact?: string;
  labels: ReturnType<typeof getLabels>;
}

function newPage(ctx: PageCtx): PageCtx {
  const page = ctx.doc.addPage([ctx.width, ctx.height]);
  ctx.pageNum++;
  return { ...ctx, page, y: ctx.height - THEME.layout.marginTop };
}

function addHeaderFooter(ctx: PageCtx) {
  const { page, width, sans, name, pageNum, operatorName, labels } = ctx;
  const t = THEME;
  // Header
  page.drawText(name, {
    x: t.layout.marginLeft,
    y: ctx.height - 30,
    size: t.fonts.tinySize,
    font: sans,
    color: rgb(...t.colors.grey),
  });
  const headerRight = labels.reportTitle;
  page.drawText(headerRight, {
    x: width - t.layout.marginRight - sans.widthOfTextAtSize(headerRight, t.fonts.tinySize),
    y: ctx.height - 30,
    size: t.fonts.tinySize,
    font: sans,
    color: rgb(...t.colors.grey),
  });
  // Footer
  const pageStr = String(pageNum);
  page.drawText(pageStr, {
    x: (width - sans.widthOfTextAtSize(pageStr, t.fonts.tinySize)) / 2,
    y: 30,
    size: t.fonts.tinySize,
    font: sans,
    color: rgb(...t.colors.grey),
  });
  // Footer left: business name or operator name
  const { businessName, businessContact } = ctx;
  const footerLeft = businessName || (operatorName ? `${ctx.labels.preparedBy} ${operatorName}` : "");
  if (footerLeft) {
    page.drawText(footerLeft, {
      x: t.layout.marginLeft,
      y: 30,
      size: t.fonts.tinySize,
      font: sans,
      color: rgb(...t.colors.grey),
    });
  }
  // Footer right: contact info
  if (businessContact) {
    const contactWidth = sans.widthOfTextAtSize(businessContact, t.fonts.tinySize);
    page.drawText(businessContact, {
      x: width - t.layout.marginRight - contactWidth,
      y: 30,
      size: t.fonts.tinySize,
      font: sans,
      color: rgb(...t.colors.grey),
    });
  }
}

function ensureSpace(ctx: PageCtx, needed: number): PageCtx {
  if (ctx.y - needed < THEME.layout.marginBottom) {
    addHeaderFooter(ctx);
    ctx = newPage(ctx);
  }
  return ctx;
}

// CJK character range check
function isCJK(ch: string): boolean {
  const code = ch.codePointAt(0) || 0;
  return (
    (code >= 0x4e00 && code <= 0x9fff) ||   // CJK Unified Ideographs
    (code >= 0x3400 && code <= 0x4dbf) ||   // CJK Extension A
    (code >= 0x3000 && code <= 0x303f) ||   // CJK Punctuation
    (code >= 0xff00 && code <= 0xffef) ||   // Fullwidth Forms
    (code >= 0xfe30 && code <= 0xfe4f) ||   // CJK Compatibility Forms
    (code >= 0x2e80 && code <= 0x2eff) ||   // CJK Radicals
    (code >= 0x3100 && code <= 0x312f) ||   // Bopomofo
    (code >= 0x31a0 && code <= 0x31bf)      // Bopomofo Extended
  );
}

function hasCJK(text: string): boolean {
  for (const ch of text) {
    if (isCJK(ch)) return true;
  }
  return false;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  if (!hasCJK(text)) {
    // Latin text: wrap on word boundaries
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const test = current ? current + " " + word : word;
      if (font.widthOfTextAtSize(test, size) <= maxWidth) {
        current = test;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  // CJK text: wrap on character boundaries, keeping Latin words together
  const lines: string[] = [];
  let current = "";

  // Split into segments: runs of CJK chars, runs of non-CJK chars (words), and spaces
  const segments: string[] = [];
  let seg = "";
  let lastCJK: boolean | null = null;

  for (const ch of text) {
    const cjk = isCJK(ch);
    if (cjk) {
      // Each CJK character is its own segment
      if (seg) { segments.push(seg); seg = ""; }
      segments.push(ch);
      lastCJK = true;
    } else if (ch === " ") {
      if (seg) { segments.push(seg); seg = ""; }
      segments.push(" ");
      lastCJK = null;
    } else {
      // Latin character — accumulate into a word
      if (lastCJK === true && seg) { segments.push(seg); seg = ""; }
      seg += ch;
      lastCJK = false;
    }
  }
  if (seg) segments.push(seg);

  for (const segment of segments) {
    const test = current + segment;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      // If a single segment is wider than maxWidth, force it onto its own line
      current = segment.trimStart();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawWrappedText(
  ctx: PageCtx,
  text: string,
  font: PDFFont,
  size: number,
  color: [number, number, number]
): PageCtx {
  const maxWidth =
    ctx.width - THEME.layout.marginLeft - THEME.layout.marginRight;
  const lines = wrapText(text, font, size, maxWidth);
  const lineH = size * THEME.layout.lineHeight;

  for (const line of lines) {
    ctx = ensureSpace(ctx, lineH);
    ctx.page.drawText(line, {
      x: THEME.layout.marginLeft,
      y: ctx.y,
      size,
      font,
      color: rgb(...color),
    });
    ctx.y -= lineH;
  }
  return ctx;
}

async function loadFont(url: string): Promise<ArrayBuffer> {
  const resp = await fetch(url);
  return resp.arrayBuffer();
}

export async function generatePdf(
  blocks: ContentBlock[],
  settings: ReportSettings,
  pageSize: "a4" | "letter" = "a4"
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const isZh = settings.language === "zh-TW";

  let serif: PDFFont;
  let serifBold: PDFFont;
  let sans: PDFFont;
  let sansBold: PDFFont;

  if (isZh) {
    // Load Noto CJK variable TTF fonts for Traditional Chinese
    // Using same font for regular/bold (variable font covers all weights)
    // subset: false required — pdf-lib's CJK subsetting drops glyphs
    const [serifBytes, sansBytes] = await Promise.all([
      loadFont(new URL("../assets/fonts/NotoSerifTC-VF.ttf", import.meta.url).href),
      loadFont(new URL("../assets/fonts/NotoSansTC-VF.ttf", import.meta.url).href),
    ]);
    serif = await doc.embedFont(serifBytes, { subset: false });
    serifBold = serif;
    sans = await doc.embedFont(sansBytes, { subset: false });
    sansBold = sans;
  } else {
    serif = await doc.embedFont(StandardFonts.TimesRoman);
    serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
    sans = await doc.embedFont(StandardFonts.Helvetica);
    sansBold = await doc.embedFont(StandardFonts.HelveticaBold);
  }

  const width = pageSize === "a4" ? A4_WIDTH : LETTER_WIDTH;
  const height = pageSize === "a4" ? A4_HEIGHT : LETTER_HEIGHT;
  const t = THEME;
  const L = getLabels(settings.language || "en");
  const maxTextWidth = width - t.layout.marginLeft - t.layout.marginRight;

  let ctx: PageCtx = {
    doc,
    page: doc.addPage([width, height]),
    y: height - t.layout.marginTop,
    pageNum: 0, // cover is page 0
    width,
    height,
    serif,
    sans,
    name: "",
    operatorName: settings.operatorName,
    businessName: settings.businessName,
    businessContact: settings.businessContact,
    labels: L,
  };

  for (const block of blocks) {
    switch (block.type) {
      case "cover": {
        ctx.name = block.name;
        // Center the cover content vertically
        const coverY = height * 0.55;

        // Business name above everything
        if (settings.businessName) {
          const bnWidth = serifBold.widthOfTextAtSize(settings.businessName, 16);
          ctx.page.drawText(settings.businessName, {
            x: (width - bnWidth) / 2,
            y: coverY + 90,
            size: 16,
            font: serifBold,
            color: rgb(...t.colors.dark),
          });
        }

        // Decorative rule
        ctx.page.drawRectangle({
          x: width * 0.25,
          y: coverY + 60,
          width: width * 0.5,
          height: 2,
          color: rgb(...t.colors.primaryGold),
        });

        // Title
        const titleText = L.reportTitle;
        const titleWidth = serifBold.widthOfTextAtSize(titleText, 28);
        ctx.page.drawText(titleText, {
          x: (width - titleWidth) / 2,
          y: coverY + 30,
          size: 28,
          font: serifBold,
          color: rgb(...t.colors.primaryGold),
        });

        // Name
        const nameWidth = serifBold.widthOfTextAtSize(block.name, 22);
        ctx.page.drawText(block.name, {
          x: (width - nameWidth) / 2,
          y: coverY - 20,
          size: 22,
          font: serifBold,
          color: rgb(...t.colors.dark),
        });

        // DOB
        const dobLabel = `${L.dateOfBirth}: ${block.dob}`;
        const dobWidth = sans.widthOfTextAtSize(dobLabel, 12);
        ctx.page.drawText(dobLabel, {
          x: (width - dobWidth) / 2,
          y: coverY - 50,
          size: 12,
          font: sans,
          color: rgb(...t.colors.grey),
        });

        // Date generated
        const genLabel = `${L.generated}: ${block.dateGenerated}`;
        const genWidth = sans.widthOfTextAtSize(genLabel, 10);
        ctx.page.drawText(genLabel, {
          x: (width - genWidth) / 2,
          y: coverY - 70,
          size: 10,
          font: sans,
          color: rgb(...t.colors.grey),
        });

        // Bottom decorative rule
        ctx.page.drawRectangle({
          x: width * 0.25,
          y: coverY - 90,
          width: width * 0.5,
          height: 2,
          color: rgb(...t.colors.primaryGold),
        });

        // Operator / prepared by
        let coverFooterY = coverY - 120;
        if (settings.operatorName) {
          const prepLabel = `${L.preparedBy} ${settings.operatorName}`;
          const prepWidth = sans.widthOfTextAtSize(prepLabel, 10);
          ctx.page.drawText(prepLabel, {
            x: (width - prepWidth) / 2,
            y: coverFooterY,
            size: 10,
            font: sans,
            color: rgb(...t.colors.grey),
          });
          coverFooterY -= 16;
        }

        // Contact info on cover
        if (settings.businessContact) {
          const cWidth = sans.widthOfTextAtSize(settings.businessContact, 9);
          ctx.page.drawText(settings.businessContact, {
            x: (width - cWidth) / 2,
            y: coverFooterY,
            size: 9,
            font: sans,
            color: rgb(...t.colors.grey),
          });
        }

        // Start new page for grid
        ctx = newPage(ctx);
        break;
      }

      case "grid": {
        addHeaderFooter(ctx);
        // Draw the 3x3 grid
        const cellSize = 80;
        const gridWidth = cellSize * 3;
        const gridX = (width - gridWidth) / 2;
        let gridY = ctx.y - 20;

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            const num = GRID_LAYOUT[row][col];
            const count = block.numberPool[num];
            const x = gridX + col * cellSize;
            const y = gridY - row * cellSize;
            const isEmpty = count === 0;

            // Cell background
            ctx.page.drawRectangle({
              x,
              y: y - cellSize,
              width: cellSize,
              height: cellSize,
              color: isEmpty
                ? rgb(...t.colors.lightGrey)
                : rgb(...t.colors.lightGold),
              borderColor: isEmpty
                ? rgb(...t.colors.dashedBorder)
                : rgb(...t.colors.primaryGold),
              borderWidth: isEmpty ? 0.5 : 1.5,
            });

            // Number label
            const numStr = String(num);
            const numWidth = serifBold.widthOfTextAtSize(numStr, 24);
            ctx.page.drawText(numStr, {
              x: x + (cellSize - numWidth) / 2,
              y: y - cellSize / 2 - 4,
              size: 24,
              font: serifBold,
              color: isEmpty
                ? rgb(...t.colors.grey)
                : rgb(...t.colors.dark),
            });

            // Dots for count (up to 4)
            if (count > 0) {
              const dotRadius = 3;
              const dotSpacing = 10;
              const dotsWidth = (Math.min(count, 4) - 1) * dotSpacing;
              const dotStartX = x + (cellSize - dotsWidth) / 2;
              const dotY = y - cellSize + 14;
              for (let d = 0; d < Math.min(count, 4); d++) {
                ctx.page.drawCircle({
                  x: dotStartX + d * dotSpacing,
                  y: dotY,
                  size: dotRadius,
                  color: rgb(...t.colors.primaryGold),
                });
              }
            }
          }
        }

        ctx.y = gridY - 3 * cellSize - 20;

        // Info panel below grid
        const groupLabel = block.kuaGroup === "east" ? L.eastGroup : L.westGroup;
        const infoLines = [
          `${L.driver} ${block.driverNumber} \u2014 ${block.driverTitle}`,
          `${L.conductor} ${block.conductorNumber} \u2014 ${block.conductorTitle}`,
          `${L.kua} ${block.kuaNumber} \u2014 ${groupLabel}`,
        ];

        for (const line of infoLines) {
          ctx.page.drawText(line, {
            x: t.layout.marginLeft,
            y: ctx.y,
            size: t.fonts.bodySize,
            font: sansBold,
            color: rgb(...t.colors.dark),
          });
          ctx.y -= 18;
        }

        ctx.y -= 8;

        // Auspicious directions
        ctx.page.drawText(L.auspiciousDirections + ":", {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.smallSize,
          font: sansBold,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= 14;
        for (const dir of block.auspiciousDirections) {
          ctx.page.drawText(`  \u2022 ${dir}`, {
            x: t.layout.marginLeft + 10,
            y: ctx.y,
            size: t.fonts.smallSize,
            font: sans,
            color: rgb(...t.colors.dark),
          });
          ctx.y -= 14;
        }

        ctx.y -= 8;

        // Raj Yoga badges
        if (block.hasGoldenYog) {
          const badgeW = 280;
          const badgeH = 24;
          const badgeX = (width - badgeW) / 2;
          ctx.page.drawRectangle({
            x: badgeX,
            y: ctx.y - badgeH,
            width: badgeW,
            height: badgeH,
            color: rgb(...t.colors.primaryGold),
            borderColor: rgb(...t.colors.primaryGold),
            borderWidth: 1,
          });
          const gText = L.goldenYogBadge;
          const gWidth = sansBold.widthOfTextAtSize(gText, 11);
          ctx.page.drawText(gText, {
            x: badgeX + (badgeW - gWidth) / 2,
            y: ctx.y - badgeH + 7,
            size: 11,
            font: sansBold,
            color: rgb(...t.colors.white),
          });
          ctx.y -= badgeH + 10;
        }

        if (block.hasSilverYog) {
          const badgeW = 280;
          const badgeH = 24;
          const badgeX = (width - badgeW) / 2;
          ctx.page.drawRectangle({
            x: badgeX,
            y: ctx.y - badgeH,
            width: badgeW,
            height: badgeH,
            color: rgb(...t.colors.grey),
            borderColor: rgb(...t.colors.grey),
            borderWidth: 1,
          });
          const sText = L.silverYogBadge;
          const sWidth = sansBold.widthOfTextAtSize(sText, 11);
          ctx.page.drawText(sText, {
            x: badgeX + (badgeW - sWidth) / 2,
            y: ctx.y - badgeH + 7,
            size: 11,
            font: sansBold,
            color: rgb(...t.colors.white),
          });
          ctx.y -= badgeH + 10;
        }

        ctx.y -= 10;

        // Present / absent summary
        if (block.presentNumbers.length > 0) {
          const pText = `${L.present}: ${block.presentNumbers.join(", ")}`;
          ctx.page.drawText(pText, {
            x: t.layout.marginLeft,
            y: ctx.y,
            size: t.fonts.smallSize,
            font: sans,
            color: rgb(...t.colors.dark),
          });
          ctx.y -= 14;
        }
        if (block.absentNumbers.length > 0) {
          const aText = `${L.absent}: ${block.absentNumbers.join(", ")}`;
          ctx.page.drawText(aText, {
            x: t.layout.marginLeft,
            y: ctx.y,
            size: t.fonts.smallSize,
            font: sans,
            color: rgb(...t.colors.dark),
          });
          ctx.y -= 14;
        }
        if (block.activePlaneNames.length > 0) {
          const plText = `${L.activePlanes}: ${block.activePlaneNames.join(", ")}`;
          ctx.page.drawText(plText, {
            x: t.layout.marginLeft,
            y: ctx.y,
            size: t.fonts.smallSize,
            font: sans,
            color: rgb(...t.colors.dark),
          });
          ctx.y -= 14;
        }

        // New page for content sections
        ctx = newPage(ctx);
        break;
      }

      case "rajYoga": {
        ctx = ensureSpace(ctx, 120);
        // Gold bordered box
        ctx.page.drawRectangle({
          x: t.layout.marginLeft,
          y: ctx.y - 4,
          width: maxTextWidth,
          height: 3,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= 16;

        // Title
        ctx.page.drawText(block.title, {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.subheadingSize,
          font: serifBold,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= 18;

        // Subtitle
        ctx.page.drawText(block.subtitle, {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.bodySize,
          font: sans,
          color: rgb(...t.colors.grey),
        });
        ctx.y -= 18;

        // Text
        ctx = drawWrappedText(ctx, block.text, sans, t.fonts.bodySize, t.colors.dark);
        ctx.y -= 8;

        ctx.page.drawRectangle({
          x: t.layout.marginLeft,
          y: ctx.y,
          width: maxTextWidth,
          height: 3,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= t.layout.sectionSpacing;
        break;
      }

      case "sectionHeading": {
        ctx = ensureSpace(ctx, 50);
        ctx.y -= 10;
        ctx.page.drawText(block.title, {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.headingSize,
          font: serifBold,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= 8;
        // Gold rule
        ctx.page.drawRectangle({
          x: t.layout.marginLeft,
          y: ctx.y,
          width: maxTextWidth,
          height: 1.5,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= t.layout.sectionSpacing;
        break;
      }

      case "numberHeading": {
        ctx = ensureSpace(ctx, 40);
        const label = `${L.numberLabel} ${block.number} \u2014 ${block.element} \u2014 ${block.direction}`;
        ctx.page.drawText(label, {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.subheadingSize - 2,
          font: serifBold,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= 14;
        ctx.page.drawText(block.keywords, {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.smallSize,
          font: sans,
          color: rgb(...t.colors.grey),
        });
        ctx.y -= 16;
        break;
      }

      case "bodyText": {
        ctx = drawWrappedText(ctx, block.text, sans, t.fonts.bodySize, t.colors.dark);
        ctx.y -= t.layout.paragraphSpacing;
        break;
      }

      case "planeHeading": {
        ctx = ensureSpace(ctx, 40);
        const status = block.status === "active" ? L.planeActive : L.planeMissing;
        const label = `${block.name} (${block.numbers.join(" \u2013 ")}) \u2014 ${status}`;
        ctx.page.drawText(label, {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.subheadingSize - 2,
          font: serifBold,
          color:
            block.status === "active"
              ? rgb(...t.colors.primaryGold)
              : rgb(...t.colors.grey),
        });
        ctx.y -= 18;
        break;
      }

      case "directions": {
        ctx = ensureSpace(ctx, 60);
        // Primary Kua
        const kuaLabel = block.isNonBinary
          ? `${L.kua} ${block.kuaNumber} (${L.maleFormula}) \u2014 ${block.kuaGroup === "east" ? L.eastGroup : L.westGroup}`
          : `${L.kua} ${block.kuaNumber} \u2014 ${block.kuaGroup === "east" ? L.eastGroup : L.westGroup}`;
        ctx.page.drawText(kuaLabel, {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.subheadingSize,
          font: serifBold,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= 20;

        // Auspicious
        ctx.page.drawText(L.auspiciousDirections + ":", {
          x: t.layout.marginLeft,
          y: ctx.y,
          size: t.fonts.bodySize,
          font: sansBold,
          color: rgb(...t.colors.dark),
        });
        ctx.y -= 16;
        for (const dir of block.auspiciousDirections) {
          ctx.page.drawText(`  \u2022 ${dir}`, {
            x: t.layout.marginLeft + 10,
            y: ctx.y,
            size: t.fonts.bodySize,
            font: sans,
            color: rgb(...t.colors.dark),
          });
          ctx.y -= 16;
        }
        ctx.y -= 6;

        ctx = drawWrappedText(ctx, block.text, sans, t.fonts.bodySize, t.colors.dark);
        ctx.y -= t.layout.paragraphSpacing;

        // Non-binary: show second Kua
        if (block.isNonBinary && block.altText && block.kuaFemale) {
          ctx = ensureSpace(ctx, 60);
          const altLabel = `${L.kua} ${block.kuaFemale} (${L.femaleFormula}) \u2014 ${(block.altGroup || "east") === "east" ? L.eastGroup : L.westGroup}`;
          ctx.page.drawText(altLabel, {
            x: t.layout.marginLeft,
            y: ctx.y,
            size: t.fonts.subheadingSize,
            font: serifBold,
            color: rgb(...t.colors.primaryGold),
          });
          ctx.y -= 20;

          ctx.page.drawText(L.auspiciousDirections + ":", {
            x: t.layout.marginLeft,
            y: ctx.y,
            size: t.fonts.bodySize,
            font: sansBold,
            color: rgb(...t.colors.dark),
          });
          ctx.y -= 16;
          for (const dir of block.altAuspiciousDirections || []) {
            ctx.page.drawText(`  \u2022 ${dir}`, {
              x: t.layout.marginLeft + 10,
              y: ctx.y,
              size: t.fonts.bodySize,
              font: sans,
              color: rgb(...t.colors.dark),
            });
            ctx.y -= 16;
          }
          ctx.y -= 6;

          ctx = drawWrappedText(
            ctx,
            block.altText,
            sans,
            t.fonts.bodySize,
            t.colors.dark
          );
          ctx.y -= t.layout.paragraphSpacing;

          // Note for nonbinary
          ctx = drawWrappedText(
            ctx,
            L.nonBinaryNote,
            sans,
            t.fonts.smallSize,
            t.colors.grey
          );
          ctx.y -= t.layout.paragraphSpacing;
        }
        break;
      }

      case "driverConductorNote": {
        ctx = ensureSpace(ctx, 30);
        ctx = drawWrappedText(ctx, block.text, sans, t.fonts.bodySize, t.colors.primaryGold);
        ctx.y -= t.layout.paragraphSpacing;
        break;
      }

      case "closing": {
        ctx = ensureSpace(ctx, 60);
        ctx.y -= 10;
        ctx.page.drawRectangle({
          x: t.layout.marginLeft,
          y: ctx.y + 6,
          width: maxTextWidth,
          height: 1,
          color: rgb(...t.colors.primaryGold),
        });
        ctx.y -= 10;
        ctx = drawWrappedText(ctx, block.text, serif, t.fonts.bodySize, t.colors.dark);
        ctx.y -= 10;
        ctx.page.drawRectangle({
          x: t.layout.marginLeft,
          y: ctx.y + 6,
          width: maxTextWidth,
          height: 1,
          color: rgb(...t.colors.primaryGold),
        });
        break;
      }
    }
  }

  // Add header/footer to last content page
  if (ctx.pageNum > 0) {
    addHeaderFooter(ctx);
  }

  return doc.save();
}
