import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DateRangePickerProps {
  fromDate: string;
  toDate: string;
  onFromChange: (date: string) => void;
  onToChange: (date: string) => void;
  onApply: () => void;
  loading?: boolean;
}

export function DateRangePicker({
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  onApply,
  loading,
}: DateRangePickerProps) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="from-date" className="text-sm font-medium">
          From
        </Label>
        <Input
          id="from-date"
          type="date"
          value={fromDate}
          onChange={(e) => onFromChange(e.target.value)}
          className="w-40"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="to-date" className="text-sm font-medium">
          To
        </Label>
        <Input
          id="to-date"
          type="date"
          value={toDate}
          onChange={(e) => onToChange(e.target.value)}
          className="w-40"
        />
      </div>
      <Button onClick={onApply} disabled={loading}>
        {loading ? "Loading..." : "Apply Filter"}
      </Button>
    </div>
  );
}

interface ExportControlsProps {
  fromDate: string;
  toDate: string;
  onFromChange: (date: string) => void;
  onToChange: (date: string) => void;
  onExport: (format: "csv" | "json") => void;
  loading?: boolean;
}

export function ExportControls({
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  onExport,
  loading,
}: ExportControlsProps) {
  const [format, setFormat] = useState<"csv" | "json">("json");

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border bg-card p-4">
      <div className="grid gap-1.5">
        <Label htmlFor="export-from" className="text-sm font-medium">
          From
        </Label>
        <Input
          id="export-from"
          type="date"
          value={fromDate}
          onChange={(e) => onFromChange(e.target.value)}
          className="w-40"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="export-to" className="text-sm font-medium">
          To
        </Label>
        <Input
          id="export-to"
          type="date"
          value={toDate}
          onChange={(e) => onToChange(e.target.value)}
          className="w-40"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="export-format" className="text-sm font-medium">
          Format
        </Label>
        <select
          id="export-format"
          value={format}
          onChange={(e) => setFormat(e.target.value as "csv" | "json")}
          className="h-9 w-28 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
        >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select>
      </div>
      <Button
        variant="outline"
        onClick={() => onExport(format)}
        disabled={loading}
      >
        {loading ? "Exporting..." : format === "csv" ? "Download CSV" : "View Raw Data"}
      </Button>
    </div>
  );
}
