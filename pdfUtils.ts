import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "https://cdn.skypack.dev/pdf-lib@latest?dts";

export async function samplePdf(sampleText: string) {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();
  const fontSize = 20;
  page.drawText(sampleText, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0.53, 0.71),
  });

  return pdfDoc.save();
}
