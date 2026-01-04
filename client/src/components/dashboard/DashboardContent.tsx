import { useState, useEffect, useCallback } from "react";
import { httpClient } from "@/util/axios";
import { useToast } from "@/hooks/use-toast";
import {
  FeedbackSummary,
  DateRangePicker,
  ExportControls,
  RawFeedbackView,
} from "@/components/dashboard";
import type { FeedbackCategory, RawFeedback } from "@/components/dashboard";

// Helper to get date string in YYYY-MM-DD format
function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Get default date range (last 7 days)
function getDefaultDateRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);
  return {
    from: formatDateForInput(from),
    to: formatDateForInput(to),
  };
}

type ViewMode = "summary" | "raw";

export function DashboardContent() {
  const { toast } = useToast();
  const defaultDates = getDefaultDateRange();

  // Summary state
  const [summaryData, setSummaryData] = useState<FeedbackCategory[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryFromDate, setSummaryFromDate] = useState(defaultDates.from);
  const [summaryToDate, setSummaryToDate] = useState(defaultDates.to);

  // Export state
  const [exportFromDate, setExportFromDate] = useState(defaultDates.from);
  const [exportToDate, setExportToDate] = useState(defaultDates.to);
  const [exportLoading, setExportLoading] = useState(false);

  // View mode and raw data
  const [viewMode, setViewMode] = useState<ViewMode>("summary");
  const [rawData, setRawData] = useState<RawFeedback[]>([]);

  // Fetch summary data
  const fetchSummary = useCallback(
    async (from?: string, to?: string) => {
      setSummaryLoading(true);
      try {
        const params = new URLSearchParams();
        if (from) params.append("from", from);
        if (to) params.append("to", to);

        const url = params.toString()
          ? `/feedback/summary?${params.toString()}`
          : "/feedback/summary";

        const response = await httpClient.get(url);

        if (response.data?.success) {
          setSummaryData(response.data.data || []);
        } else {
          toast({
            variant: "destructive",
            title: "Failed to fetch summary",
            description: response.data?.message || "Unknown error",
          });
        }
      } catch (err: any) {
        const message = err?.response?.data?.message || "Failed to fetch feedback summary";
        toast({
          variant: "destructive",
          title: "Error",
          description: message,
        });
      } finally {
        setSummaryLoading(false);
      }
    },
    [toast]
  );

  // Fetch on mount (without date params to get last week default from server)
  useEffect(() => {
    fetchSummary();
  }, []);

  // Handle summary date filter apply
  const handleSummaryApply = () => {
    fetchSummary(summaryFromDate, summaryToDate);
  };

  // Handle export
  const handleExport = async (format: "csv" | "json") => {
    setExportLoading(true);
    try {
      const params = new URLSearchParams();
      if (exportFromDate) params.append("from", exportFromDate);
      if (exportToDate) params.append("to", exportToDate);
      params.append("format", format);

      const url = `/user/export?${params.toString()}`;

      if (format === "csv") {
        // Download CSV file
        const response = await httpClient.get(url, {
          responseType: "blob",
        });

        // Create download link
        const blob = new Blob([response.data], { type: "text/csv" });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `feedback-export-${exportFromDate}-to-${exportToDate}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

        toast({
          variant: "success",
          title: "Download started",
          description: "Your CSV file is being downloaded.",
        });
      } else {
        // Fetch JSON and show in raw view
        const response = await httpClient.get(url);

        if (response.data?.success) {
          setRawData(response.data.data || []);
          setViewMode("raw");
          toast({
            variant: "success",
            title: "Data loaded",
            description: `Loaded ${response.data.data?.length || 0} feedback records.`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Export failed",
            description: response.data?.message || "Unknown error",
          });
        }
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to export feedback";
      toast({
        variant: "destructive",
        title: "Export failed",
        description: message,
      });
    } finally {
      setExportLoading(false);
    }
  };

  // Handle back from raw view
  const handleBackToSummary = () => {
    setViewMode("summary");
  };

  // Render based on view mode
  if (viewMode === "raw") {
    return <RawFeedbackView data={rawData} onBack={handleBackToSummary} />;
  }

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Feedback Summary</h2>
            <p className="text-sm text-muted-foreground">
              Overview of feedback by category
            </p>
          </div>
          <DateRangePicker
            fromDate={summaryFromDate}
            toDate={summaryToDate}
            onFromChange={setSummaryFromDate}
            onToChange={setSummaryToDate}
            onApply={handleSummaryApply}
            loading={summaryLoading}
          />
        </div>
        <FeedbackSummary data={summaryData} loading={summaryLoading} />
      </section>

      {/* Export Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Export Feedback</h2>
          <p className="text-sm text-muted-foreground">
            Download raw feedback data or view it in the browser
          </p>
        </div>
        <ExportControls
          fromDate={exportFromDate}
          toDate={exportToDate}
          onFromChange={setExportFromDate}
          onToChange={setExportToDate}
          onExport={handleExport}
          loading={exportLoading}
        />
      </section>
    </div>
  );
}
