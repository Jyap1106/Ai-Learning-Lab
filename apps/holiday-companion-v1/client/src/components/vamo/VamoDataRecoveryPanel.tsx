import { Download, FileSpreadsheet, FileText, RotateCcw, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DaySnapshot {
  dayNumber: number;
  city: string;
  theme: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  food: string[];
  transport: string[];
  notes: string[];
  edited: boolean;
}

interface VersionHistoryEntry {
  version: number;
  summary: string;
  changeType?: string;
  affectedDay?: number | null;
  createdAt?: string;
  restoredFromVersion?: number;
  snapshot?: DaySnapshot[];
}

interface ItineraryState {
  tripName: string;
  destination: string;
  duration: string;
  currentDay: number;
  saveStatus: string;
  days: DaySnapshot[];
  versionHistory: VersionHistoryEntry[];
}

interface VamoDataRecoveryPanelProps {
  trip: ItineraryState;
  onResetTrip: () => void;
}

function downloadBlob(filename: string, content: BlobPart, type: string) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
}

function getSafeFilename(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildTripLines(trip: ItineraryState) {
  const lines: string[] = [
    trip.tripName,
    `${trip.destination} · ${trip.duration}`,
    `Current Day: ${trip.currentDay}`,
    `Save Status: ${trip.saveStatus}`,
    "",
  ];

  trip.days.forEach((day) => {
    lines.push(`Day ${day.dayNumber} — ${day.city}`);
    lines.push(day.theme);
    lines.push("");

    lines.push("Morning:");
    day.morning.forEach((item) => lines.push(`- ${item}`));

    lines.push("Afternoon:");
    day.afternoon.forEach((item) => lines.push(`- ${item}`));

    lines.push("Evening:");
    day.evening.forEach((item) => lines.push(`- ${item}`));

    lines.push("Food:");
    day.food.forEach((item) => lines.push(`- ${item}`));

    lines.push("Transport:");
    day.transport.forEach((item) => lines.push(`- ${item}`));

    lines.push("Notes:");
    day.notes.forEach((item) => lines.push(`- ${item}`));

    lines.push("");
  });

  return lines;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildExcelHtml(trip: ItineraryState) {
  const rows = trip.days
    .map((day) => {
      return `
        <tr>
          <td>${day.dayNumber}</td>
          <td>${escapeHtml(day.city)}</td>
          <td>${escapeHtml(day.theme)}</td>
          <td>${escapeHtml(day.morning.join("\n"))}</td>
          <td>${escapeHtml(day.afternoon.join("\n"))}</td>
          <td>${escapeHtml(day.evening.join("\n"))}</td>
          <td>${escapeHtml(day.food.join("\n"))}</td>
          <td>${escapeHtml(day.transport.join("\n"))}</td>
          <td>${escapeHtml(day.notes.join("\n"))}</td>
          <td>${day.edited ? "Yes" : "No"}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
          th { background: #1f2937; color: white; }
          th, td { border: 1px solid #d1d5db; padding: 8px; vertical-align: top; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(trip.tripName)}</h1>
        <p>${escapeHtml(trip.destination)} · ${escapeHtml(trip.duration)}</p>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>City</th>
              <th>Theme</th>
              <th>Morning</th>
              <th>Afternoon</th>
              <th>Evening</th>
              <th>Food</th>
              <th>Transport</th>
              <th>Notes</th>
              <th>Edited</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `;
}

function sanitizePdfText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapLine(line: string, maxLength = 88) {
  if (line.length <= maxLength) return [line];

  const words = line.split(" ");
  const wrapped: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if (`${currentLine} ${word}`.trim().length > maxLength) {
      wrapped.push(currentLine);
      currentLine = word;
      return;
    }

    currentLine = `${currentLine} ${word}`.trim();
  });

  if (currentLine) {
    wrapped.push(currentLine);
  }

  return wrapped;
}

function buildSimplePdf(trip: ItineraryState) {
  const rawLines = buildTripLines(trip);
  const wrappedLines = rawLines.flatMap((line) => wrapLine(line));
  const linesPerPage = 48;
  const pages: string[][] = [];

  for (let index = 0; index < wrappedLines.length; index += linesPerPage) {
    pages.push(wrappedLines.slice(index, index + linesPerPage));
  }

  const objects: string[] = [];
  const pageObjectIds: number[] = [];
  const fontObjectId = 3 + pages.length * 2;

  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  pages.forEach((pageLines, index) => {
    const pageObjectId = 3 + index * 2;
    const contentObjectId = pageObjectId + 1;

    pageObjectIds.push(pageObjectId);

    const textCommands = pageLines
      .map((line) => `(${sanitizePdfText(line)}) Tj\nT*`)
      .join("\n");

    const pageContent = `BT\n/F1 10 Tf\n14 TL\n40 800 Td\n${textCommands}\nET`;

    objects.push(
      `${pageObjectId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>\nendobj\n`,
    );

    objects.push(
      `${contentObjectId} 0 obj\n<< /Length ${pageContent.length} >>\nstream\n${pageContent}\nendstream\nendobj\n`,
    );
  });

  objects.splice(
    1,
    0,
    `2 0 obj\n<< /Type /Pages /Kids [${pageObjectIds
      .map((id) => `${id} 0 R`)
      .join(" ")}] /Count ${pageObjectIds.length} >>\nendobj\n`,
  );

  objects.push(
    `${fontObjectId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
  );

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += object;
  });

  const xrefStart = pdf.length;

  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return pdf;
}

export default function VamoDataRecoveryPanel({
  trip,
  onResetTrip,
}: VamoDataRecoveryPanelProps) {
  const safeTripName = getSafeFilename(trip.tripName) || "vamo-trip";
  const timestamp = new Date().toISOString().slice(0, 10);

  const handleExportJson = () => {
    downloadBlob(
      `${safeTripName}-${timestamp}.json`,
      JSON.stringify(trip, null, 2),
      "application/json;charset=utf-8",
    );
  };

  const handleExportExcel = () => {
    downloadBlob(
      `${safeTripName}-${timestamp}.xls`,
      buildExcelHtml(trip),
      "application/vnd.ms-excel;charset=utf-8",
    );
  };

  const handleExportPdf = () => {
    downloadBlob(
      `${safeTripName}-${timestamp}.pdf`,
      buildSimplePdf(trip),
      "application/pdf",
    );
  };

  return (
    <section className="rounded-[2rem] border border-[var(--vamo-border)] bg-[var(--vamo-card)] p-4">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--vamo-card-strong)] text-[var(--vamo-primary)]">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <div>
          <p className="font-black text-[var(--vamo-text)]">Local data recovery</p>
          <p className="mt-1 text-sm leading-6 text-[var(--vamo-muted)]">
            Export backups before major edits. PDF is for easy viewing. Excel-compatible XLS is for easier editing.
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
          onClick={handleExportPdf}
        >
          <FileText className="h-4 w-4" />
          Download PDF backup
        </Button>

        <Button
          type="button"
          variant="outline"
          className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
          onClick={handleExportExcel}
        >
          <FileSpreadsheet className="h-4 w-4" />
          Download Excel backup
        </Button>

        <Button
          type="button"
          variant="outline"
          className="rounded-full border-[var(--vamo-border)] bg-[var(--vamo-card-strong)] text-[var(--vamo-text)] hover:bg-[var(--vamo-card)]"
          onClick={handleExportJson}
        >
          <Download className="h-4 w-4" />
          Download JSON backup
        </Button>

        <Button
          type="button"
          variant="outline"
          className="rounded-full border-red-300/30 bg-red-500/10 text-red-100 hover:bg-red-500/20 hover:text-red-50"
          onClick={onResetTrip}
        >
          <RotateCcw className="h-4 w-4" />
          Reset sample trip
        </Button>
      </div>
    </section>
  );
}
